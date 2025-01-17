class ApplicationConfig:
    # Remove MONGODB_SETTINGS since we're connecting directly in models.py
    SECRET_KEY = 'yoursecretkey'
    JWT_SECRET_KEY = 'jwtsecretkey'

    # Email configuration
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USERNAME = 'vign22112.it@rmkec.ac.in'
    MAIL_PASSWORD = 'azcm lcuy exnq ffmo'
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True