from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from models import User,db  # Import User model here
from mail import send_welcome_email
import re
from config import ApplicationConfig

# Initialize app, database, JWT, and CORS
app = Flask(__name__)
app.config.from_object(ApplicationConfig)
db.init_app(app)



CORS(app)

jwt = JWTManager(app)

# Validate email domain (Gmail only)
def is_valid_gmail(email):
    return re.match(r"[^@]+@gmail\.com", email) is not None

# Register Route (Only accepts Gmail)
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data['email']
    password = data['password']

    if not is_valid_gmail(email):
        return jsonify({"msg": "Only Gmail accounts are allowed!"}), 400

    hashed_password = generate_password_hash(password, method='sha256')

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "User already exists!"}), 409

    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully!"}), 201

# Login Route (Sends Welcome Email)
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Bad email or password!"}), 401

    # Send a welcome email on successful login
    send_welcome_email(email)

    # Generate JWT Token valid for 24 hours
    token = create_access_token(identity=email)
    return jsonify({"token": token})

# # Protected Route (Dashboard)
# @app.route('/dashboard', methods=['GET'])
# @jwt_required()
# def dashboard():
#     current_user = get_jwt_identity()
#     return jsonify({"msg": f"Welcome {current_user}!"}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables if they don't exist
    app.run(debug=True)
