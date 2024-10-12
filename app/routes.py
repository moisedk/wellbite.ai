from app import app
from flask import render_template
from flask import render_template, Blueprint, request, jsonify

from models import Patient, Doctor, Food

@app.route('/')
def home():
    return render_template('index.html')

# Define a Flask blueprint for the API routes
routes_bp = Blueprint('routes', __name__)
app.register_blueprint(routes_bp)

# --- Patient Routes ---
@routes_bp.route('/patients', methods=['POST'])
def add_patient():
    data = request.json
    Patient.create_patient(data)
    return jsonify({"message": "Patient added successfully"}), 201

@routes_bp.route('/patients', methods=['GET'])
def get_all_patients():
    patients = Patient.get_all_patients()
    return jsonify(patients), 200

@routes_bp.route('/patients/<patient_id>', methods=['GET'])
def get_patient(patient_id):
    patient = Patient.get_patient_by_id(patient_id)
    if patient:
        return jsonify(patient), 200
    else:
        return jsonify({"error": "Patient not found"}), 404

@routes_bp.route('/patients/<patient_id>', methods=['PUT'])
def update_patient(patient_id):
    data = request.json
    result = Patient.update_patient(patient_id, data)
    if result.matched_count > 0:
        return jsonify({"message": "Patient updated successfully"}), 200
    else:
        return jsonify({"error": "Patient not found"}), 404

@routes_bp.route('/patients/<patient_id>', methods=['DELETE'])
def delete_patient(patient_id):
    result = Patient.delete_patient(patient_id)
    if result.deleted_count > 0:
        return jsonify({"message": "Patient deleted successfully"}), 200
    else:
        return jsonify({"error": "Patient not found"}), 404

# --- Doctor Routes ---
@routes_bp.route('/doctors', methods=['POST'])
def add_doctor():
    data = request.json
    Doctor.create_doctor(data)
    return jsonify({"message": "Doctor added successfully"}), 201

# --- Food Routes ---
@routes_bp.route('/patients/<patient_id>/food', methods=['POST'])
def add_food_for_patient(patient_id):
    food_data = request.json
    Food.add_food_for_patient(patient_id, food_data)
    return jsonify({"message": "Food data added successfully"}), 201

@routes_bp.route('/patients/<patient_id>/food', methods=['GET'])
def get_food_for_patient(patient_id):
    food_items = Food.get_food_for_patient(patient_id)
    return jsonify(food_items), 200