from flask import Blueprint, request, jsonify
from bson import ObjectId
from database import db_init
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
import datetime
from flask_cors import CORS
# Initialize the Blueprint
doctor_bp = Blueprint('doctor_bp', __name__)

CORS(doctor_bp, origins=["https://localhost:3000/"], supports_credentials=True)

database = db_init()
doctors_collection = database['doctors']



@doctor_bp.route('/patients', methods=['GET'])

def get_patients():
    
    # doctor = doctors_collection.find_one({"_id": ObjectId(doctor_id)})
    # if doctor:
    #     return jsonify(doctor.get('patients', [])), 200
    user_email = request.headers
    print("THe doctooooo email is", user_email)
    return jsonify({"message": "Doctor not found"}), 404

# Route to add a new patient to a doctor's patients list

@doctor_bp.route('/patients', methods=['POST'])
def add_patient():
    print(100*"&")
    data = request.json
    print("The dad is", data)
    first_name = data.get("firstName")
    last_name = data.get("lastName")
    email = data.get("email")
    
    patient = database["Users"].find_one({"email": email, "firstName": first_name, "lastName": last_name}) 
    
    print("The patient is", patient)
    
    
    if patient:
        return jsonify({"message": "Patient is found", "patient": patient}), 200
    
    

    patient_id = patient.get('_id')

    doctor_email = data.get("doctor_email")  
    doctor = database["Users"].find_one({"email": doctor_email, "is_doctor": True})

    if not doctor:
        return jsonify({"error": "Doctor not found"}), 404

    result = database["Users"].update_one(
        {"_id": doctor['_id']}, 
        {"$addToSet": {"patients": patient_id}}  
    )
        
    
    return jsonify({"message": "Patient not found", }), 404
    
    # data = request.get_json()
    # new_patient = {
    #     "id": ObjectId(),  # Generate unique ID for the patient
    #     "firstName": data.get("firstName"),
    #     "lastName": data.get("lastName"),
    #     "email": data.get("email"),
    #     "is_doctor": False,
    #     "food_restrictions": []
    # }
    
    # doctor = doctors_collection.find_one({"email": email})
    # Add the new patient to the doctor's patients list
    # result = doctors_collection.update_one(
    #     {"_id": ObjectId(doctor_id)},
    #     {"$push": {"patients": new_patient}}
    # )
    
    # if result.modified_count > 0:
    #     return jsonify({"message": "Patient added successfully"}), 201
    # return jsonify({"message": "Doctor not found", }), 404

# Route to update a patient's information
@doctor_bp.route('/patients/<patient_id>', methods=['PUT'])
def update_patient(doctor_id, patient_id):
    data = request.get_json()
    
    # Update the patient information in the doctor's patients array
    result = doctors_collection.update_one(
        {"_id": ObjectId(doctor_id), "patients.id": ObjectId(patient_id)},
        {"$set": {
            "patients.$.firstName": data.get("firstName"),
            "patients.$.lastName": data.get("lastName"),
            "patients.$.email": data.get("email"),
            "patients.$.age": data.get("age"),
            "patients.$.diagnosis": data.get("diagnosis"),
            "patients.$.restrictions": data.get("restrictions")
        }}
    )
    
    if result.modified_count > 0:
        return jsonify({"message": "Patient updated successfully"}), 200
    return jsonify({"message": "Patient or doctor not found"}), 404

# Route to delete a patient from a doctor's patients list
@doctor_bp.route('/patients/<patient_id>', methods=['DELETE'])
def delete_patient(doctor_id, patient_id):
    result = doctors_collection.update_one(
        {"_id": ObjectId(doctor_id)},
        {"$pull": {"patients": {"id": ObjectId(patient_id)}}}
    )
    
    if result.modified_count > 0:
        return jsonify({"message": "Patient deleted successfully"}), 200
    return jsonify({"message": "Patient or doctor not found"}), 404

# Route to get doctor details
@doctor_bp.route('/doctor/<doctor_id>', methods=['GET'])
def get_doctor():
    doctor_id = get_jwt_identity()
    doctor = doctors_collection.find_one({"_id": ObjectId(doctor_id)})
    if doctor:
        return jsonify(doctor), 200
    return jsonify({"message": "Doctor not found"}), 404
