import certifi
from pymongo import MongoClient
from bson.objectid import ObjectId

class DatabaseManager:
    def __init__(self):
        # MongoDB connection string
        self.client = MongoClient('mongodb+srv://iamirrf:FQo5SKNumEm29QSQ@wellbite.upb7t.mongodb.net/?retryWrites=true&w=majority',
                                  tlsCAFile=certifi.where())
        self.db = self.client['wellbite_ai']  # database name

    def insert_doctors(self, doctors):
        # Insert multiple doctors into the 'doctors' collection
        self.db.doctors.insert_many(doctors)
        print(f"Inserted {len(doctors)} doctors into the 'doctors' collection.")

    def insert_patients(self, patients):
        # Insert multiple patients into the 'patients' collection
        self.db.patients.insert_many(patients)
        print(f"Inserted {len(patients)} patients into the 'patients' collection.")

    def get_doctors(self):
        # Fetch all doctors from the 'doctors' collection
        return list(self.db.doctors.find())

    def get_patients(self):
        # Fetch all patients from the 'patients' collection
        return list(self.db.patients.find())

    def check_database_exists(self):
        # Check if the database exists by listing database names
        if 'wellbite_ai' in self.client.list_database_names():
            print("Database 'wellbite_ai' exists.")
        else:
            print("Database 'wellbite_ai' does not exist.")

    def clear_data(self):
        # Optional: Clear all data (use carefully)
        self.db.doctors.delete_many({})
        self.db.patients.delete_many({})
        print("Cleared all data from 'doctors' and 'patients' collections.")

# Example usage
if __name__ == "__main__":
    db_manager = DatabaseManager()

    # Mock data
    doctors = [
        {"_id": ObjectId(), "name": "Dr. Alice Johnson", "specialization": "General Practitioner"},
        {"_id": ObjectId(), "name": "Dr. Bob Brown", "specialization": "Endocrinologist"},
        {"_id": ObjectId(), "name": "Dr. Carol Davis", "specialization": "Nutritionist"},
        {"_id": ObjectId(), "name": "Dr. David Wilson", "specialization": "Pediatrician"},
        {"_id": ObjectId(), "name": "Dr. Eva Green", "specialization": "Gastroenterologist"}
    ]

    patients = [
        {"name": "John Doe", "age": 30, "doctor_id": doctors[0]['_id'], "diagnosis": "Flu", "restrictions": []},
        {"name": "Jane Smith", "age": 45, "doctor_id": doctors[1]['_id'], "diagnosis": "Diabetes", "restrictions": ["sugar", "high carbs"]},
        # (add more patients here)
    ]

    # Insert data into the database
    db_manager.insert_doctors(doctors)
    db_manager.insert_patients(patients)

    # Check if the database exists
    db_manager.check_database_exists()

    # Retrieve data from the database
    print("Doctors in the database:")
    for doctor in db_manager.get_doctors():
        print(doctor)

    print("\nPatients in the database:")
    for patient in db_manager.get_patients():
        print(patient)

    # Uncomment to clear data
    # db_manager.clear_data()
