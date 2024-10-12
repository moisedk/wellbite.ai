from flask import Flask, jsonify
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
# from routes.login import login_bp
# from routes.dashboard import dashboard_bp

app = Flask(__name__)
app.config['SECRET_KEY'] = 'ce9ce2cdc1d715ea0d91480660f59411'

bcrypt = Bcrypt(app)

@app.route('/')
def route():
    return jsonify({"message": "This is the mock registration route"}), 200
    

# client = MongoClient('mongodb://localhost:27017/')
# db = client['your_database_name']
# users = db.users 

# app.register_blueprint(login_bp)
# app.register_blueprint(dashboard_bp)

if __name__ == '__main__':
    app.run(debug=True)