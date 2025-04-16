import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    gender: "",
    height: "",
    weight: "",
    chest: "",
    waist: "",
    hips: "",
  });

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const getSize = () => {
    const { gender, chest, waist, hips } = answers;
    const c = parseInt(chest);
    const w = parseInt(waist);
    const h = parseInt(hips);

    if (gender === "female") {
      if (c <= 33 && w <= 26 && h <= 36) return "Small (S)";
      if (c <= 36 && w <= 29 && h <= 39) return "Medium (M)";
      if (c <= 39 && w <= 32 && h <= 42) return "Large (L)";
      return "Extra Large (XL)";
    } else {
      if (c <= 36 && w <= 30) return "Small (S)";
      if (c <= 40 && w <= 34) return "Medium (M)";
      if (c <= 44 && w <= 38) return "Large (L)";
      return "Extra Large (XL)";
    }
  };

  const questions = [
    {
      label: "What's your gender?",
      name: "gender",
      type: "select",
      options: ["male", "female"],
    },
    {
      label: "What's your height (inches)?",
      name: "height",
      type: "number",
    },
    {
      label: "What's your weight (lbs)?",
      name: "weight",
      type: "number",
    },
    {
      label: "What's your chest measurement (inches)?",
      name: "chest",
      type: "number",
    },
    {
      label: "What's your waist measurement (inches)?",
      name: "waist",
      type: "number",
    },
    {
      label: "What's your hips measurement (inches)?",
      name: "hips",
      type: "number",
    },
  ];

  const currentQuestion = questions[step];

  return (
    <>
      <div className="quiz-container">
        <h2 className="quiz-title">Find Your Perfect Fit</h2>
        {step < questions.length ? (
          <>
            <p>{currentQuestion.label}</p>
            {currentQuestion.type === "select" ? (
              <select
                name={currentQuestion.name}
                value={answers[currentQuestion.name]}
                onChange={handleChange}
                className="quiz-input"
              >
                <option value="">Select</option>
                {currentQuestion.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={currentQuestion.type}
                name={currentQuestion.name}
                value={answers[currentQuestion.name]}
                onChange={handleChange}
                className="quiz-input"
              />
            )}
            <div style={{ marginTop: "20px" }}>
              {step > 0 && (
                <button
                  onClick={back}
                  className="quiz-button"
                  style={{ marginRight: "10px" }}
                >
                  Back
                </button>
              )}
              <button onClick={next} className="quiz-button">
                Next
              </button>
            </div>
          </>
        ) : (
          <>
            <h3>Your Recommended Size:</h3>
            <p className="quiz-result">{getSize()}</p>
          </>
        )}
      </div>

      <style>{`
                .quiz-container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 40px 20px;
                    text-align: center;
                    animation: fadeIn 1s ease-in-out;
                }

                .quiz-title {
                    font-size: 2rem;
                    margin-bottom: 20px;
                    color: #333;
                }

                .quiz-input {
                    padding: 10px;
                    font-size: 16px;
                    width: 100%;
                    margin-top: 10px;
                    margin-bottom: 20px;
                    border-radius: 4px;
                    border: 1px solid #ccc;
                    transition: border 0.3s ease;
                }

                .quiz-input:focus {
                    border-color: #007bff;
                    outline: none;
                }

                .quiz-button {
                    padding: 10px 20px;
                    margin: 5px;
                    background-color: #007bff;
                    color: white;
                    font-weight: bold;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .quiz-button:hover {
                    background-color: #0056b3;
                }

                .quiz-result {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #28a745;
                    margin-top: 20px;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
    </>
  );
}
