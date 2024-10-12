import certifi
from pymongo import MongoClient
from bson.objectid import ObjectId

# Connect to MongoDB
client = MongoClient('mongodb+srv://iamirrf:FQo5SKNumEm29QSQ@wellbite.upb7t.mongodb.net/?retryWrites=true&w=majority',
                     tlsCAFile=certifi.where())
db = client['WellBite']  # Database name

# Define mock data for doctors
doctors = [
    {"_id": ObjectId(), "name": "Dr. Alice Johnson", "specialization": "General Practitioner"},
    {"_id": ObjectId(), "name": "Dr. Bob Brown", "specialization": "Endocrinologist"},
    {"_id": ObjectId(), "name": "Dr. Carol Davis", "specialization": "Nutritionist"},
    {"_id": ObjectId(), "name": "Dr. David Wilson", "specialization": "Pediatrician"},
    {"_id": ObjectId(), "name": "Dr. Eva Green", "specialization": "Gastroenterologist"}
]

# Define mock data for patients, associating each patient with a doctor
patients = [
    {"name": "John Doe", "age": 30, "doctor_id": doctors[0]['_id'], "diagnosis": "Flu", "restrictions": []},
    {"name": "Jane Smith", "age": 45, "doctor_id": doctors[1]['_id'], "diagnosis": "Diabetes", "restrictions": ["sugar", "high carbs"]},
    {"name": "Robert Brown", "age": 50, "doctor_id": doctors[1]['_id'], "diagnosis": "Hypertension", "restrictions": ["sodium"]},
    {"name": "Emily White", "age": 25, "doctor_id": doctors[2]['_id'], "diagnosis": "Weight Loss", "restrictions": ["high fat"]},
    {"name": "Michael Scott", "age": 38, "doctor_id": doctors[2]['_id'], "diagnosis": "Obesity", "restrictions": ["sugar", "high fat"]},
    {"name": "Jessica Adams", "age": 60, "doctor_id": doctors[3]['_id'], "diagnosis": "Childhood Asthma", "restrictions": []},
    {"name": "Oliver Stone", "age": 7, "doctor_id": doctors[3]['_id'], "diagnosis": "Childhood Obesity", "restrictions": ["sugar", "high carbs"]},
    {"name": "Sophia Green", "age": 4, "doctor_id": doctors[3]['_id'], "diagnosis": "Allergies", "restrictions": ["nuts", "dairy"]},
    {"name": "Lucas Hall", "age": 12, "doctor_id": doctors[3]['_id'], "diagnosis": "ADHD", "restrictions": []},
    {"name": "Mason Young", "age": 34, "doctor_id": doctors[4]['_id'], "diagnosis": "Crohn's Disease", "restrictions": ["gluten", "spicy foods"]},
    {"name": "Liam Clark", "age": 23, "doctor_id": doctors[4]['_id'], "diagnosis": "Irritable Bowel Syndrome", "restrictions": ["spicy foods", "dairy"]},
    {"name": "Emma Lewis", "age": 40, "doctor_id": doctors[4]['_id'], "diagnosis": "Celiac Disease", "restrictions": ["gluten"]},
    {"name": "Olivia Walker", "age": 55, "doctor_id": doctors[2]['_id'], "diagnosis": "Weight Management", "restrictions": ["sugar", "high fat"]},
    {"name": "Noah Allen", "age": 32, "doctor_id": doctors[0]['_id'], "diagnosis": "Flu", "restrictions": []},
    {"name": "Ava King", "age": 28, "doctor_id": doctors[0]['_id'], "diagnosis": "Cold", "restrictions": []},
    {"name": "Isabella Wright", "age": 65, "doctor_id": doctors[1]['_id'], "diagnosis": "Type 2 Diabetes", "restrictions": ["sugar"]},
    {"name": "Mia Turner", "age": 18, "doctor_id": doctors[3]['_id'], "diagnosis": "Teenage Obesity", "restrictions": ["sugar"]},
    {"name": "James Harris", "age": 29, "doctor_id": doctors[4]['_id'], "diagnosis": "Colitis", "restrictions": ["dairy"]},
    {"name": "Ethan Scott", "age": 50, "doctor_id": doctors[2]['_id'], "diagnosis": "Cholesterol", "restrictions": ["high fat"]},
    {"name": "Amelia Brown", "age": 35, "doctor_id": doctors[1]['_id'], "diagnosis": "Pre-Diabetes", "restrictions": ["sugar", "processed carbs"]}
]

# Insert the mock data into the database collections
db.doctors.insert_many(doctors)
db.patients.insert_many(patients)

print("Data inserted successfully into doctors and patients collections.")
