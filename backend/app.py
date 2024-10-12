from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os

app = Flask(__name__, static_url_path='/static')
# Enable CORS for cross-origin requests
cors = CORS(app, origins=['http://localhost:3000'],
            supports_credentials=True)

app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB

uploads = './static'


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
