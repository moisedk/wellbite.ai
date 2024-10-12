from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os

app = Flask(__name__)
# Enable CORS for cross-origin requests
cors = CORS(app, resources=['http://localhost:3000'])

uploads = './uploads'


@app.route('/checkfood', methods=['GET', 'POST'])
@cross_origin()
def checkFood():
    if request.method == 'POST':
        print(request.args)
        image = request.args.get('image')
        if not image:
            return jsonify({'error': 'No image file found in request'}), 400
        filepath = os.path.join(uploads, image.filename)
        image.save(filepath)
        public_url = f"http://127.0.0.1:5000/upload/{image.filename}"
        print(public_url)
        return jsonify({'foo': 'bar'}), 200


if __name__ == "__main__":
    app.run(debug=True)
