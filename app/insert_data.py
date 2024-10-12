from pymongo import MongoClient
from bson.objectid import ObjectId

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['your_database_name']

# Insert mock doctor data
doctors = [
    {"_id": ObjectId(), "name": "Dr. Alice Johnson", "specialization": "General Practitioner"},
    {"_id": ObjectId(), "name": "Dr. Bob Brown", "specialization": "Endocrinologist"}
]

# Insert mock patient data, assigning each patient to a doctor
patients = [
    {"name": "John Doe", "age": 30, "doctor_id": doctors[0]['_id'], "diagnosis": "Flu"},
    {"name": "Jane Smith", "age": 45, "doctor_id": doctors[1]['_id'], "diagnosis": "Diabetes"}
]

# Insert data into the collections
db.doctors.insert_many(doctors)
db.patients.insert_many(patients)

print("Test data inserted successfully.")
