class ApplicationConfig:
    SQLALCHEMY_DATABASE_URI = "mysql://root:FTIBXdZvpPSkYCbuRMaCZSOXcptXmoBV@mysql.railway.internal:3306/railway"
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'yoursecretkey'
    JWT_SECRET_KEY = 'jwtsecretkey'

    # Email configuration
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USERNAME = 'karthicktharun11@gmail.com'
    MAIL_PASSWORD = 'jmew bscr bkwt bnpz'
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
