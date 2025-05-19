import React, { useState } from "react";
import "./diagnosis.css";

const symptomsList = [
  "Fever", "Cough", "Fatigue", "Shortness of breath", "Chest pain",
  "Headache", "Sore throat", "Loss of taste or smell", "Nausea or vomiting",
  "Diarrhea", "Muscle pain", "Dizziness", "Runny nose", "Sneezing",
  "Chills", "Sweating", "Confusion", "Rapid heartbeat", "Swelling",
  "Abdominal pain", "Rash", "Weight loss", "Night sweats", "Blurred vision",
  "Joint pain", "Constipation", "Back pain", "Palpitations", "Anxiety",
  "Depression", "Insomnia", "Memory loss", "Chest tightness",
  "Vomiting", "Ear pain", "Eye redness", "Loss of appetite", "Difficulty swallowing",
];

const DiagnosisForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    symptoms: {},
    description: "",
  });
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSymptom = (symptom) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: {
        ...prev.symptoms,
        [symptom]: !prev.symptoms[symptom],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Get selected symptoms
    const selectedSymptoms = Object.keys(formData.symptoms).filter(
      (symptom) => formData.symptoms[symptom]
    );

    // this field Validate the inputs
    if (
      !formData.age ||
      !formData.gender ||
      selectedSymptoms.length === 0 ||
      !formData.description.trim()
    ) {
      setError("Please fill all required fields");
      setIsLoading(false);
      return;
    }

    try {
      const diagnosisPrompt = [
        {
          role: "system",
          content:
            "As a medical diagnosis assistant, Provide professional analysis based on patient information.Please respond in plain text, without any markdown formatting.",
        },
        {
          role: "user",
          content: `Patient Information:
- Age: ${formData.age}
- Gender: ${formData.gender}
- Symptoms: ${selectedSymptoms.join(", ")}
- Additional Details: ${formData.description}

Please provide:
1. Potential diagnoses (most likely first)
2. Recommended next steps
3. Red flags to watch for
4. General health advice

Respond in clear, patient-friendly language.`,
        },
      ];

      const response = await fetch("http://localhost:5001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: diagnosisPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const aiResponse =
        data.message ||
        "No diagnosis could be generated. Please consult a healthcare professional.";

      setResult(aiResponse);
    } catch (err) {
      console.error("Diagnosis error:", err);
      setError(
        err.message || "Failed to get diagnosis. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="diagnosis-container">
      <h2>Health Diagnosis</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            min="1"
            max="120"
            required
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Symptoms:</label>
          <div className="symptoms-grid">
            {symptomsList.map((symptom) => (
              <label key={symptom} className="symptom-option">
                <input
                  type="checkbox"
                  checked={!!formData.symptoms[symptom]}
                  onChange={() => toggleSymptom(symptom)}
                />
                {symptom}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Additional Details:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Analyzing..." : "Get Diagnosis"}
        </button>
      </form>

      {result && (
        <div className="diagnosis-result">
          <h3>Diagnosis Results:</h3>
          <div className="result-content">
            {typeof result === "string" ? (
              result
                .split("\n")
                .map((paragraph, i) => <p key={i}>{paragraph}</p>)
            ) : (
              <pre>{JSON.stringify(result, null, 2)}</pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosisForm;
