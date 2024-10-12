# Import the global `db` object (from app.py)
from app import db

from bson.objectid import ObjectId

class Patient:
    """Model for interacting with the 'patients' collection in MongoDB."""

    @staticmethod
    def create_patient(data):
        """Inserts a new patient record into the MongoDB collection."""
        return db.patients.insert_one(data)

    @staticmethod
    def get_patient_by_id(patient_id):
        """Fetches a patient by their ID."""
        return db.patients.find_one({"_id": patient_id})

    @staticmethod
    def get_all_patients():
        """Fetches all patients from the MongoDB collection."""
        return list(db.patients.find())

    @staticmethod
    def update_patient(patient_id, update_data):
        """Updates an existing patient record."""
        return db.patients.update_one({"_id": patient_id}, {"$set": update_data})

    @staticmethod
    def delete_patient(patient_id):
        """Deletes a patient record by their ID."""
        return db.patients.delete_one({"_id": patient_id})
    
    
    @staticmethod
    def get_assigned_doctor(patient_id):
        """Fetches the assigned doctor for a given patient based on the doctor_id."""
        # Step 1: Retrieve the patient record
        patient = db.patients.find_one({"_id": patient_id})

        if not patient:
            return None  # Return None or an error if patient not found

        # Step 2: Extract doctor_id from the patient record
        doctor_id = patient.get('doctor_id')

        if not doctor_id:
            return None  # Return None or an error if no doctor assigned

        # Step 3: Retrieve the doctor record using the doctor_id
        doctor = db.doctors.find_one({"_id": doctor_id})

        return doctor


class Doctor:
    @staticmethod
    def create_doctor(data):
        return db.doctors.insert_one(data)

    @staticmethod
    def get_doctor_by_id(doctor_id):
        """Fetches a doctor by their ID."""
        return db.doctors.find_one({"_id": doctor_id})
    
    def get_patients(doctor_id):
        patients = list(db.patients.find({"doctor_id": ObjectId(doctor_id)}))
        
        if not patients:
            return {"message": "No patients found for this doctor"}

        # Return the list of patients (convert ObjectId to string for JSON response)
        for patient in patients:
            patient["_id"] = str(patient["_id"])  # Convert ObjectId to string for JSON serialization
            patient["doctor_id"] = str(patient["doctor_id"])  # Convert ObjectId to string for JSON

        return patients  # Return the list of patients as a Python dictionary (JSON)


class Food:
    """Model for storing food images and dietary restrictions for a patient."""

    @staticmethod
    def add_food_for_patient(patient_id, food_data):
        """Stores a food item and dietary analysis for a patient."""
        food_data['patient_id'] = patient_id
        return db.food.insert_one(food_data)

    @staticmethod
    def get_food_for_patient(patient_id):
        """Fetches all food items for a given patient."""
        return list(db.food.find({"patient_id": patient_id}))
