import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import base64
from io import BytesIO

app = Flask(__name__)
# Allow all origins for simplicity in a local development environment.
# For production, you should restrict this to your frontend's domain.
CORS(app)

# --- Model Loading ---
MODEL_PATH = "/home/cherry/Desktop/AeroHawk/classifcation_model.h5"
CLASSES = ["Bird", "Drone", "Others"]
model = None

# We wrap the model loading in a try-except block to handle potential errors,
# such as the model file being missing or corrupted.
try:
    # Check if the model file exists before attempting to load it.
    if os.path.exists(MODEL_PATH):
        model = tf.keras.models.load_model(MODEL_PATH)
        print("\n=== TensorFlow Model Loaded Successfully ===")
    else:
        # If the model file is not found, we log an error message.
        # The '/predict' endpoint will return an error until the model is available.
        print(f"⚠️ Model file not found at '{MODEL_PATH}'. Please ensure the model file is in the root directory.")
except Exception as e:
    print(f"⚠️ Model load failed: {e}")

# --- Routes ---
@app.route('/predict', methods=['POST'])
def predict():
    # If the model failed to load, return a server error.
    if model is None:
        return jsonify({"error": "Model is not loaded on the server."}), 500

    # Ensure the request contains JSON data.
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400
        
    data = request.get_json()
    # Check for the presence of the image data in the request.
    if 'base64ImageData' not in data:
        return jsonify({"error": "No 'base64ImageData' found in request"}), 400

    try:
        # Decode the base64 string to bytes.
        img_data = base64.b64decode(data['base64ImageData'])
        # Open the image from bytes, convert to RGB, and resize to the model's expected input size.
        img = Image.open(BytesIO(img_data)).convert("RGB").resize((224, 224))
        # Convert the image to a numpy array and normalize pixel values to [0, 1].
        img_array = np.array(img) / 255.0
        # Add a batch dimension to match the model's input shape (1, 224, 224, 3).
        img_array = np.expand_dims(img_array, axis=0)

        # Make a prediction using the loaded model.
        prediction = model.predict(img_array)
        
        # Determine the predicted class and confidence score.
        predicted_class_index = np.argmax(prediction[0])
        confidence = float(np.max(prediction[0]) * 100)
        label = CLASSES[predicted_class_index]

        # Return the result in the format expected by the frontend.
        return jsonify({
            "classification": label,
            "confidence": confidence,
            "analysis": f"Classified as {label} with {confidence:.2f}% confidence using a TensorFlow model."
        })

    except Exception as e:
        # Catch any exceptions during the process and return an error.
        print(f"Error during prediction: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/")
def read_root():
    # A simple root endpoint to confirm the API is running.
    return {"message": "AeroHawk TensorFlow Classification API is running."}

# Standard entry point for running the Flask application.
if __name__ == '__main__':
    # Runs the app on port 5000, accessible from any IP address.
    app.run(host='0.0.0.0', port=5000, debug=True)
