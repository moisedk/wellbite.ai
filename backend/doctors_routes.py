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
@jwt_required()
def get_patients():
    
    # doctor = doctors_collection.find_one({"_id": ObjectId(doctor_id)})
    # if doctor:
    #     return jsonify(doctor.get('patients', [])), 200
    current_user = get_jwt_identity()
    user_data = database['Users'].find_one({'email': current_user})
    if user_data:
        print("User found:", user_data)
        
        # Retrieve the 'patients' field from user_data, if it exists
        patients = user_data.get('patients', [])  # Default to an empty list if no patients
        patients = {"first_name" : "Moise",
                    "last_name" : "Dete",
                    "id": "gudgdugd281ubdb",
                    "email" : "michels@berea.edu",
                    "password" : "$2b$12$wpMntN40ASGFqUYO5mUbv.bVcQ5hjs0yQirHKfx5pDzVivDHTpQQu",
                    "restrictions" : ""}, {"first_name" : "Amirlo",
                    "last_name" : "Job",
                    "id": "gudgdugisb",
                    "email" : "mils@berea.edu",
                    "password" : "$2b$12$wpMntN40ASGFqUYO5mUbv.bVcQ5hjs0yQirHKfx5pDzVivDHTpQQu",
                    "restrictions" : ""}
        
        print("My patients are", patients)
        return jsonify({"patients": patients}), 200  # Return patients in a JSON response
    else:
        # If the user is not found, return a 404 error
        return jsonify({"message": "Doctor not found"}), 404
    
    
    

@doctor_bp.route('/patients', methods=['POST'])
@jwt_required()
def add_patient():
    print(100*"&")
    data = request.json
    current_doctor = get_jwt_identity()
    
    print("dhidhidhdddddddddddddddd", current_doctor)
    doctor = database['Users'].find_one({'email': current_doctor})
    
    
    first_name = data.get("firstName")
    last_name = data.get("lastName")
    email = data.get("email")
    
    patient = database["Users"].find_one({"email": email, "firstName": first_name, "lastName": last_name}) 
    
    print("The patient is", patient)
    
    

    patient_id = patient.get('_id')  

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
@doctor_bp.route('/patients/<patient_Id>', methods=['PUT'])
@jwt_required()
def update_patient(patient_Id):
    print("the patient id to modify is", patient_Id)
    current_doctor = get_jwt_identity()
    
    print("dhidhidhdddddddddddddddd", current_doctor)
    doctor = database['Users'].find_one({'email': current_doctor})
    
    data = request.get_json()
    
    # Update the patient information in the doctor's patients array
    result = doctors_collection.update_one(
        {"_id": ObjectId(doctor["_id"]), "patients.id": ObjectId(patient_Id)},
        {"$set": {
            "patients.$.firstName": data.get("firstName"),
            "patients.$.lastName": data.get("lastName"),
            "patients.$.email": data.get("email"),
        }}
    )
    
    if result.modified_count > 0:
        return jsonify({"message": "Patient updated successfully"}), 200
    return jsonify({"message": "Patient or doctor not found"}), 404

# Route to delete a patient from a doctor's patients list
@doctor_bp.route('/patients/<patient_Id>', methods=['DELETE'])
@jwt_required()
def delete_patient(patient_Id):
    print("the patient id to delete is", patient_Id)
    current_doctor = get_jwt_identity()
    
    print("dhidhidhdddddddddddddddd", current_doctor)
    doctor = database['Users'].find_one({'email': current_doctor})
    
    result = doctors_collection.update_one(
        {"_id": ObjectId(doctor['_id'])},
        {"$pull": {"patients": {"id": ObjectId(patient_Id)}}}
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
