import os

class Config:
    # MongoDB URI (replace with your MongoDB Atlas connection string if needed)
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb+srv://iamirrf:FQo5SKNumEm29QSQ@wellbite.upb7t.mongodb.net/')
