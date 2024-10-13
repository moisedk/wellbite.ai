import jwt
from flask import Blueprint, jsonify, request, make_response
from database import db_init
import datetime
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (create_access_token, jwt_required, get_jwt_identity,
                                set_access_cookies, set_refresh_cookies, create_refresh_token, unset_jwt_cookies)

from flask_cors import CORS
profile = Blueprint('profile', __name__)
bcrypt = Bcrypt()

database = db_init()

CORS(profile, origins=["https://localhost:3000/"], supports_credentials=True)


@profile.route('/user-details', methods=['GET'])
@jwt_required()
def getUserDetails():
    current_user = get_jwt_identity()
    user_data = database['Users'].find_one({'email': current_user})
    first_name = user_data['first_name']
    last_name = user_data['last_name']
    email = user_data['email']
    restrictions = user_data['food_restrictions']
    return jsonify({'first_name': first_name, 'last_name': last_name, 'email': email, 'restrictions': restrictions}), 200


@profile.route('/food-restrictions', methods=['GET'])
@jwt_required()
def getFoodRestrictions():
    current_user = get_jwt_identity()
    user_data = database['Users'].find_one({'email': current_user})
    restrictions = user_data['food_restrictions']
    return jsonify({'restrictions': restrictions}), 200
