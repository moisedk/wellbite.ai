from flask import Blueprint, request, jsonify
from models import Patient
from models import Doctor

patient_bp = Blueprint('patient_bp', __name__)

# --- Patient Views ---
@patient_bp.route('/my_doctor', methods=['GET'])
def get_my_doctor():
    # Assuming the session or token stores patient ID
    patient_id = request.headers.get('patient_id')
    doctor = Patient.get_assigned_doctor(patient_id)
    if doctor:
        return jsonify(doctor), 200
    else:
        return jsonify({"error": "No doctor assigned"}), 404

@patient_bp.route('/doctors', methods=['GET'])
def get_all_doctors():
    doctors = Doctor.get_all_doctors()
    return jsonify(doctors), 200

@patient_bp.route('/upload_food', method=['POST'])
def upload_food():
    # User is authenticated
    image = request.image
    
    # Add image to Food database
    
    return jsonify({"message": "Food Picture uploaded"}), 202
