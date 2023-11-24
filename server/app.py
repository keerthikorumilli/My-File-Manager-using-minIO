from flask import Flask, request, jsonify
from minio import Minio
from minio.error import S3Error
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
    r"/files/*": {"origins": "http://localhost:3000"}
})

# Configure Minio
minio_client = Minio(
    "127.0.0.1:9000",
    access_key="minioadmin",
    secret_key="minioadmin",
    secure=False
)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/files/upload/<bucket>', methods=['POST'])
def upload_file(bucket):
    if 'file' not in request.files:
        return jsonify({"error": "No selected file"})

    uploaded_file = request.files['file']
    if uploaded_file.filename == '':
        return jsonify({"error": "No selected file"})

    try:
        filename = secure_filename(uploaded_file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        uploaded_file.save(file_path)

        minio_client.fput_object(bucket, filename, file_path)

        os.remove(file_path)

        return jsonify({"message": "File uploaded to Minio successfully"})
    except S3Error as e:
        return jsonify({"error": str(e)})
    except Exception as e:
        return jsonify({"error": "Internal server error: " + str(e)})

@app.route('/files/<bucket>', methods=['GET'])
def list_files(bucket):
    file_names = []
    objects = minio_client.list_objects(bucket, recursive=True)
    for obj in objects:
        file_names.append(obj.object_name)
    return jsonify(file_names)

@app.route('/files/delete/<bucket>', methods=['POST'])
def delete_file(bucket):
    file_name = request.json.get('file_name')

    try:
        minio_client.remove_object(bucket, file_name)
        return jsonify({"message": f"{file_name} deleted successfully from {bucket}"})
    except S3Error as e:
        return jsonify({"error": str(e)})
    except Exception as e:
        return jsonify({"error": "Internal server error: " + str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
