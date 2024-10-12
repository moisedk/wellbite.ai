# Import the global `db` object (from app.py)
from app import db

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


class Doctor:
    """Model for interacting with the 'doctors' collection in MongoDB."""

    @staticmethod
    def create_doctor(data):
        """Inserts a new doctor record."""
        return db.doctors.insert_one(data)

    @staticmethod
    def get_doctor_by_id(doctor_id):
        """Fetches a doctor by their ID."""
        return db.doctors.find_one({"_id": doctor_id})


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
