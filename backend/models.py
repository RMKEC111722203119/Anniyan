from mongoengine import Document, StringField, connect

# Connect to MongoDB
connect(db='anniyan', host='localhost', port=27017)

class User(Document):
    email = StringField(required=True, unique=True)
    password = StringField(required=True)
    meta = {'collection': 'users'}

class Input(Document):
    email = StringField(required=True)
    input = StringField(required=True)
    meta = {'collection': 'inputs'}
