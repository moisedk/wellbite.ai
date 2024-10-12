from pymongo import MongoClient
from bson.objectid import ObjectId

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['your_database_name']

# Insert mock doctor data
doctors = [
    {"_id": ObjectId(), "name": "Dr. Alice Johnson", "specialization": "General Practitioner"},
    {"_id": ObjectId(), "name": "Dr. Bob Brown", "specialization": "Endocrinologist"},
    {"_id": ObjectId(), "name": "Dr. Carol White", "specialization": "Cardiologist"},
    {"_id": ObjectId(), "name": "Dr. Daniel Green", "specialization": "Dermatologist"}
]

# Insert mock patient data, assigning each patient to a doctor
patients = [
    {"name": "John Doe", "age": 30, "doctor_id": doctors[0]['_id'], "diagnosis": "Flu"},
    {"name": "Jane Smith", "age": 45, "doctor_id": doctors[1]['_id'], "diagnosis": "Diabetes"},
    {"name": "Michael Johnson", "age": 28, "doctor_id": doctors[2]['_id'], "diagnosis": "Hypertension"},  # Dr. Carol White
    {"name": "Sarah Lee", "age": 33, "doctor_id": doctors[0]['_id'], "diagnosis": "Allergies"},  # Dr. Alice Johnson (Same doctor as John Doe)
    {"name": "David Brown", "age": 52, "doctor_id": doctors[3]['_id'], "diagnosis": "Eczema"},  # Dr. Daniel Green
    {"name": "Emily Clark", "age": 40, "doctor_id": doctors[3]['_id'], "diagnosis": "Psoriasis"}  # Dr. Daniel Green (Same doctor as David Brown)
]

# Insert data into the collections
db.doctors.insert_many(doctors)
db.patients.insert_many(patients)

print("Test data inserted successfully.")
