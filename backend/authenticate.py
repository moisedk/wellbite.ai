import jwt
from flask import Blueprint, jsonify, request, make_response
from database import db_init
import datetime
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (create_access_token, jwt_required, get_jwt_identity,
                                set_access_cookies, set_refresh_cookies, create_refresh_token, unset_jwt_cookies)

from flask_cors import CORS

user = Blueprint('user', __name__)
bcrypt = Bcrypt()

database = db_init()

CORS(user, origins=["https://localhost:3000/"], supports_credentials=True)


@user.route('/register', methods=['GET', 'POST'])
def register():
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    email = request.json['email']
    password = request.json['password']
    is_doctor = request.json['is_doctor']

    registered = database['Users'].find_one({'email': email})
    if not registered:
        # hash password and decode it with utf-8 so that it can be stored as str
        hashed_password = bcrypt.generate_password_hash(
            password).decode('utf-8')
        if is_doctor:
            new_user = {
                # mongodb will create the user id (_id) automatically
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'password': hashed_password,
                'patients': [],
                'is_doctor': is_doctor
            }
        else:
            new_user = {
                # mongodb will create the user id (_id) automatically
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'password': hashed_password,
                'food_restrictions': [],
                'is_doctor': is_doctor,
            }

        database['Users'].insert_one(new_user)
        return jsonify({'msg': 'Account created successfully'}), 200

    return jsonify({'msg': 'Action failed'}), 500


@user.route('/login', methods=['POST', 'GET'])
def login():
    email = request.json['email']
    password = request.json['password']
    registered = database['Users'].find_one({'email': email})
    print(email, password)
    if not registered or not bcrypt.check_password_hash(registered['password'], password):
        return jsonify({'response': 'wrong email address or password'}), 401

    is_doctor = registered['is_doctor']
    print(is_doctor)
    access_token = create_access_token(identity=email)
    # refresh token is no longer being used
    refresh_token = create_refresh_token(identity=email)

    resp = jsonify(
        {'msg': 'logged in', 'is_doctor': is_doctor})
    resp.headers.add('Access-Control-Allow-rigin',
                     'https://localhost:3000/')

    # adds the token to response header (the token will be set as cookie in the browser)
    set_access_cookies(resp, access_token, max_age=7776000)
    set_refresh_cookies(resp, refresh_token, max_age=7776000)
    return resp, 200


@user.route('/verify', methods=['POST'])
@jwt_required()
def verify():
    current_user = get_jwt_identity()
    if not current_user:
        return jsonify({'msg': 'forbiden access'}), 401
    return jsonify(logged_in_as=current_user), 200


@user.route('/verifydoctor', methods=['POST'])
@jwt_required()
def verifyDoctor():
    current_user = get_jwt_identity()
    if not current_user:
        return jsonify({'msg': 'forbiden access'}), 401
    is_doctor = database['Users'].find_one(
        {'email': current_user})['is_doctor']
    if not is_doctor:
        return jsonify({'msg': 'forbiden access'}), 401
    return jsonify(logged_in_as=current_user), 200


@user.route('/verifypatient', methods=['POST'])
@jwt_required()
def verifyPatient():
    current_user = get_jwt_identity()
    if not current_user:
        return jsonify({'msg': 'forbiden access'}), 401
    is_doctor = database['Users'].find_one(
        {'email': current_user})['is_doctor']
    if is_doctor:
        return jsonify({'msg': 'forbiden access'}), 401
    return jsonify(logged_in_as=current_user), 200
