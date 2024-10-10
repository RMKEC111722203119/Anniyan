import smtplib
from email.mime.text import MIMEText

SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 465  # or 587 if using TLS
EMAIL_ADDRESS = 'anniyan2punish@gmail.com'
EMAIL_PASSWORD = 'anniyan1234'

def send_test_email(to_email):
    msg = MIMEText("This is a test email from Python.")
    msg['Subject'] = 'Test Email'
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = to_email

    try:
        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as server:
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.sendmail(EMAIL_ADDRESS, to_email, msg.as_string())
            print("Test email sent successfully!")
    except Exception as e:
        print(f"Failed to send email: {e}")

# Replace with the recipient's email address
send_test_email('karthicktharun11@gmail.com')
