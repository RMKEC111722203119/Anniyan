from flask import Flask, jsonify, request
from flask_cors import CORS
import google.generativeai as genai
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from models import User,db,Input
from mail import send_welcome_email
import re
from config import ApplicationConfig



genai.configure(api_key="AIzaSyCFPP7t83ltbDRzohTioAW_z7oSB2FmzK0")
app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config.from_object(ApplicationConfig)
db.init_app(app)


jwt = JWTManager(app)

# Register Route (Only accepts Gmail)
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data['email']
    password = data['password']

   
    hashed_password = generate_password_hash(password,method='pbkdf2:sha256')

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "User already exists!"}), 409

    new_user = User(email=email, password=hashed_password)
    
    try:
        send_welcome_email(email)
    except Exception as e:
        return jsonify({"msg": "come up with correct welcome email!"}), 200
    
    db.session.add(new_user)
    db.session.commit()

    token = create_access_token(identity=email)
    return jsonify({"token": token})

# Login Route (Sends Welcome Email)
@app.route('/', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Bad email or password!"}), 401

    # Send a welcome email on successful login
   

    # Generate JWT Token valid for 24 hours
    token = create_access_token(identity=email)
    return jsonify({"token": token})




sysprompt="""
You are Anniyan, a relentless and righteous vigilante who ensures justice is served to those who break moral and societal rules. You draw your judgments from the ancient Garuda Purana and follow its teachings strictly to punish wrongdoers. Your goal is to reform society by setting harsh examples, ensuring people follow the path of righteousness. You are intolerant of corruption, negligence, and immoral behavior, and you deliver justice by meting out punishments based on ancient scriptures.

Guidelines for interaction:

Respond in the same language as the user’s input, be it English, Tamil, or any other.
When presented with a description of wrongdoing, analyze the scenario and suggest an appropriate punishment based on the moral infractions.
Reference specific verses from the Garuda Purana as proof for your judgment.
Maintain a stern, authoritative tone that reflects your unshakable belief in justice.
Example Scene:

User Input (English): "A man neglected his duty and caused the death of a pedestrian by not fixing a pothole on time, despite multiple complaints."

Anniyan’s Response (English): "This negligence is unforgivable. When a person entrusted with a responsibility fails, it endangers innocent lives. In a case similar to this, I once punished a negligent government officer who failed to repair potholes, resulting in the tragic death of a citizen. His punishment was based on the verse from the Garuda Purana, which states, 'He who neglects his duties and allows harm to befall others shall face the consequences of their actions, suffering the pain they have caused.'

For his negligence, I subjected him to the "Kumbhipaka" punishment—where he was boiled alive in oil—mirroring the suffering he caused by allowing the pothole to remain, symbolizing the fire of his guilt. You must face a similar fate, as per the scripture: 'Those who cause harm through neglect shall burn in the fires of their sins.
"""
def get_gemini_repsonse(input):
    model=genai.GenerativeModel('gemini-1.5-pro', system_instruction=sysprompt)
    response=model.generate_content(input)
    return response.text

def anniyan(input):
    return get_gemini_repsonse(input)



@app.route('/api/process', methods=['POST'])
@jwt_required()
def process_input():
    data = request.get_json()
    user_input = data.get('input', '')

    email = get_jwt_identity()

    # Save the email and user input to the UserInput table
    new_user_input = Input(email=email, input=user_input)
    db.session.add(new_user_input)
    db.session.commit()
   

    # Select a random punishment
    try:
        punishment_text = anniyan(user_input)

    except:
        punishment_text = "I am sorry, I could not understand your input. Please try again."
    # Return the punishment text as audio output
    return jsonify({'audio_output': punishment_text})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables if they don't exist
    app.run(debug=True)