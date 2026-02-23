import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    hypertension: "",
    heart_disease: "",
    ever_married: "",
    work_type: "",
    Residence_type: "",
    avg_glucose_level: "",
    bmi: "",
    smoking_status: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [probability, setProbability] = useState(null); // ✅ Added probability state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    // ✅ ADD THIS LINE HERE
    console.log("Backend result:", result);

    setPrediction(result.stroke_prediction);
    setProbability(result.stroke_probability);
    setShowModal(true);

  } catch (error) {
    console.error("Fetch Error:", error);
    alert("Backend connection failed.");
  }

  setLoading(false);
};

  return (
    <div className="app-container">
      <h1 className="title">Stroke Prediction</h1>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Gender:
              <select name="gender" onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>

          <div className="form-group">
            <label>
              Age:
              <input type="number" name="age" onChange={handleChange} required />
            </label>
          </div>

          <div className="form-group">
            <label>
              Hypertension:
              <select name="hypertension" onChange={handleChange} required>
                <option value="">Select</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </label>
          </div>

          <div className="form-group">
            <label>
              Heart Disease:
              <select name="heart_disease" onChange={handleChange} required>
                <option value="">Select</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </label>
          </div>

          <div className="form-group">
            <label>
              Ever Married:
              <select name="ever_married" onChange={handleChange} required>
                <option value="">Select</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </label>
          </div>

          <div className="form-group">
            <label>
              Work Type:
              <select name="work_type" onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Private">Private</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Govt_job">Govt_job</option>
                <option value="Children">Children</option>
                <option value="Never_worked">Never worked</option>
              </select>
            </label>
          </div>

          <div className="form-group">
            <label>
              Residence Type:
              <select name="Residence_type" onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Urban">Urban</option>
                <option value="Rural">Rural</option>
              </select>
            </label>
          </div>

          <div className="form-group">
            <label>
              Avg Glucose Level:
              <input
                type="number"
                name="avg_glucose_level"
                onChange={handleChange}
                step="0.01"
                required
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              BMI:
              <input
                type="number"
                name="bmi"
                onChange={handleChange}
                step="0.1"
                required
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              Smoking Status:
              <select name="smoking_status" onChange={handleChange} required>
                <option value="">Select</option>
                <option value="formerly smoked">Formerly Smoked</option>
                <option value="never smoked">Never Smoked</option>
                <option value="smokes">Smokes</option>
              </select>
            </label>
          </div>

          <button type="submit">
            {loading ? "Predicting..." : "Predict Stroke"}
          </button>
        </form>
      </div>

      {/* MODAL POPUP */}
      {showModal && (
        <div className="modal-overlay">
          <div
            className={`modal-box ${
              prediction === 1 ? "high-risk" : "low-risk"
            }`}
          >
            <h2>
              {prediction === 1
                ? "⚠ High Stroke Risk"
                : "✅ Low Stroke Risk"}
            </h2>

            <p>
              {prediction === 1
                ? "The model predicts a higher probability of stroke. Please consult a medical professional."
                : "The model predicts a lower probability of stroke."}
            </p>

            {/* ✅ Added Risk Percentage */}
            

            {probability !== null && (
  <p style={{ marginTop: "15px", fontWeight: "bold" }}>
    Stroke Probability: {(probability * 100).toFixed(2)}%
  </p>
)}

            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;