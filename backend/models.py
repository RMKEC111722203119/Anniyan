from mongoengine import Document, StringField, connect
import certifi
from mongoengine.connection import disconnect
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def connect_to_mongodb():
    try:
        # Disconnect from any existing connections
        disconnect()
        # Connect to MongoDB Atlas
        connect(
            db='anniyan',
            host="mongodb+srv://root:1234@auction-backend.kejvt.mongodb.net/anniyan",
            tlsCAFile=certifi.where()
        )
        logger.info("MongoDB connected successfully!")
    except Exception as e:
        logger.error(f"MongoDB connection failed: {str(e)}")
        raise e

# Initialize connection
connect_to_mongodb()

class User(Document):
    email = StringField(required=True, unique=True)
    password = StringField(required=True)
    meta = {'collection': 'users'}

class Input(Document):
    email = StringField(required=True)
    input = StringField(required=True)
    meta = {'collection': 'inputs'}
