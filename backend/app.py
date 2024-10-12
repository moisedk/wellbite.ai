from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
from flask_bcrypt import bcrypt
from pymongo import MongoClient
from bson.objectid import ObjectId
import certifi

app = Flask(__name__, static_url_path='/static')
# Enable CORS for cross-origin requests
cors = CORS(app, origins=['http://localhost:3000'],
            supports_credentials=True)

app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB

uploads = './static'


client = MongoClient('mongodb+srv://iamirrf:FQo5SKNumEm29QSQ@wellbite.upb7t.mongodb.net/?retryWrites=true&w=majority',
                                  tlsCAFile=certifi.where())
db = client['wellbite_ai']  # database name


@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    print(100*"#")
    print(data)

    # Check if all required fields are provided
    if not all([data.get('first_name'), data.get('last_name'), data.get('username'), data.get('email'), data.get('password'), data.get('specialization')]):
        return jsonify({"message": "Missing fields"}), 400

    # Check if email already exists
    # if db.doctors.find_one({"email": data['email']}):
    #     return jsonify({"message": "Email already in use"}), 400

    # Hash the password
    # hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    # print("hashhhhh is", hashed_password)
    # Create a new doctor document
    doctor = {
        "first_name": data['first_name'],
        "last_name": data['last_name'],
        "username": data['username'],
        "email": data['email'],
        "password": data['password'],
        "specialization": data['specialization']
    }
    
    print("I see you")
    # Insert the new doctor into MongoDB
    # result = db.doctors.insert_one(doctor)

    return jsonify({"message": f"Welcome, Dr. {doctor["last_name"]}!"}), 200




@app.route('/checkfood', methods=['GET', 'POST'])
def checkFood():
    print(request.headers)  # Log request headers
    print(request.content_type)  # Ensure content type is multipart/form-data
    print(request.files)  # Log files received
    if request.method == 'POST':
        image = request.files['image']
        if not image:
            return jsonify({'error': 'No image file found in request'}), 400
        filepath = os.path.join(uploads, image.filename)
        image.save(filepath)
        public_url = f"http://127.0.0.1:5000/static/{image.filename}"
        print(public_url)
        return jsonify({'foo': 'bar'}), 200


@app.route('/uploads/<filename>')
def serve_image(filename):
    print(f"Serving file: {filename}")
    return os.send_from_directory(uploads, filename)


if __name__ == "__main__":
    app.run(debug=True)
