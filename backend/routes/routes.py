from flask import Flask, render_template, session
import app

@app.route('/doctor_dashboard')
def doctor_dashboard():
    if 'role' in session and session['role'] == 'doctor':
        # Logic for doctor's dashboard
        return 
    return "Unauthorized", 403

@app.route('/patient_dashboard')
def patient_dashboard():
    if 'role' in session and session['role'] == 'patient':
        # Logic for patient's dashboard
        return 
    return "Unauthorized", 403