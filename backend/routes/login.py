# from flask import app, session, request, flash, redirect, url_for
# from flask_bcrypt import bcrypt
# from app import users

# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']

#         user = users.find_one({'username': username})

#         if user and bcrypt.check_password_hash(user['password'], password):
#             session['username'] = user['username']
#             session['role'] = user['role']
#             flash('Login successful!', 'success')

#             if user['role'] == 'doctor':
#                 return redirect(url_for('doctor_dashboard'))
#             else:
#                 return redirect(url_for('patient_dashboard'))
#         else:
#             flash('Login failed. Check your username and password.', 'danger')

#     return 