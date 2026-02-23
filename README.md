**🧠 Stroke Prediction Web Application**

An end-to-end Machine Learning web application that predicts the probability of stroke risk based on patient health parameters.
The project integrates a trained ML pipeline with a Flask backend and a React frontend for real-time predictions.

**🚀 Project Overview**

- This application allows users to:

- Input patient health details

- Predict stroke risk using a trained ML model

- View risk level in a prediction output

- See stroke probability percentage

- It demonstrates full-stack ML deployment from training to UI integration.

**🏗️ Tech Stack**
🔹 Frontend

React.js

CSS

Fetch API

🔹 Backend

Flask

Flask-CORS

Pandas

Joblib

🔹 Machine Learning

Linear Discriminant Analysis (LDA)

SMOTE (for class imbalance)

ColumnTransformer

OneHotEncoder

PowerTransformer

Scikit-learn Pipeline

**📊 Machine Learning Pipeline**

The model was built using a full preprocessing pipeline:

Median Imputation for missing numerical values

One-Hot Encoding for categorical features

Power Transformation (Yeo-Johnson)

SMOTE to handle class imbalance

Linear Discriminant Analysis classifier

The entire pipeline is saved using joblib and loaded directly in the backend for prediction.


**▶️ How to Run Locally**
1️⃣ Clone the Repository
- git clone https://github.com/your-MadamPujitha/stroke-prediction.git
- cd stroke-prediction
2️⃣ Install Backend Dependencies
- pip install -r requirements.txt

Run backend:

python app.py

Backend runs at: http://127.0.0.1:5000
3️⃣ Run Frontend
cd frontend
npm install
npm start

Frontend runs at: http://localhost:3000

**📌 Why This Project Matters**

Stroke prediction is a critical healthcare application.
This project demonstrates how Machine Learning can be practically deployed to assist in early risk assessment.

