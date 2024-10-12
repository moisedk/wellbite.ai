from flask import session, jsonify
import app

@app.route('/doctor_dashboard')
def doctor_dashboard():
    if 'role' in session and session['role'] == 'doctor':
        # Logic for doctor's dashboard
        return jsonify({"message": "This is the mock registration route"}), 200
    return "Unauthorized", 403

@app.route('/patient_dashboard')
def patient_dashboard():
    if 'role' in session and session['role'] == 'patient':
        # Logic for patient's dashboard
        return jsonify({"message": "This is the mock registration route"}), 200
    return "Unauthorized", 403