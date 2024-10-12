from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests


@app.route('/checkfood', methods=['GET', 'POST'])
def checkFood():
    print("image received!")
    return jsonify({'foo': 'bar'})


if __name__ == "__main__":
    app.run(debug=True)
