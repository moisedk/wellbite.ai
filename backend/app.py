from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
from flask_bcrypt import bcrypt
from pymongo import MongoClient
from bson.objectid import ObjectId
import certifi
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import JWTManager
from database import db_init
from doctors_routes import doctor_bp
from authenticate import user
from userDetails import profile

app = Flask(__name__, static_url_path='/static')
# Enable CORS for cross-origin requests
cors = CORS(app, origins=['http://localhost:3000'],
            supports_credentials=True)

app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB

uploads = './static'


app.register_blueprint(user, url_prefix='/user')
app.register_blueprint(profile, url_prefix='/profile')

app.register_blueprint(doctor_bp, url_prefix='/api')


app.config['SECRET_KEY'] = 'secret-key'

# setting up flask-jwt for authentification
app.config['JWT_ACCESS_COOKIE_PATH'] = '/'
app.config['JWT_COOKIE_SECURE'] = True
app.config['JWT_COOKIE_SAMESITE'] = 'None'
app.config['JWT_SECRET_KEY'] = os.environ.get(
    'JWT_SECRET_KEY')  # to be changed
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_CSRF_PROTECT'] = True
app.config['JWT_TOKEN_EXPIRES'] = timedelta(minutes=30)
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=90)
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=90)

jwt = JWTManager(app)

db_init()


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
