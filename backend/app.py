import os
import logging
from flask import Flask, request, jsonify
import pandas as pd
from joblib import load
from flask_cors import CORS

logging.basicConfig(level=logging.INFO)

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'stroke_prediction_model.joblib')

try:
    model = load(MODEL_PATH)
    logging.info("Model loaded successfully")
except Exception as e:
    logging.exception("Failed to load model")
    model = None

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Stroke Prediction API Running"

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    try:
        data = request.get_json()

        # Convert incoming data into DataFrame
        input_df = pd.DataFrame([data])

        # Predict using pipeline
        prediction = model.predict(input_df)[0]
        probability = model.predict_proba(input_df)[0][1]

        return jsonify({
            "stroke_prediction": int(prediction),
            "stroke_probability": float(probability)
        })

    except Exception as e:
        logging.exception("Prediction failed")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)