from flask_mail import Mail, Message
from flask import Flask
from config import ApplicationConfig
MAIL_SERVER = ApplicationConfig.MAIL_SERVER
MAIL_PORT = ApplicationConfig.MAIL_PORT
MAIL_USERNAME = ApplicationConfig.MAIL_USERNAME
MAIL_PASSWORD = ApplicationConfig.MAIL_PASSWORD
MAIL_USE_SSL = ApplicationConfig.MAIL_USE_SSL
app = Flask(__name__)
app.config.update(
    MAIL_SERVER=MAIL_SERVER,
    MAIL_PORT=MAIL_PORT,
    MAIL_USERNAME=MAIL_USERNAME,
    MAIL_PASSWORD=MAIL_PASSWORD,
    MAIL_USE_SSL=MAIL_USE_SSL
)
app.config['MAIL_DEBUG'] = True

mail = Mail(app)

def send_welcome_email(email):
    with app.app_context():
        msg = Message(subject="Anniyan Support Team",
                      sender=app.config['MAIL_USERNAME'],
                      recipients=[email],
                      body="""Welcome! You've successfully logged in.
                      Be aware that justice will be served to those who break moral and societal rules.
                        -Regards, Anniyan
                      """)
        mail.send(msg)
