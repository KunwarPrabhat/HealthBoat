import React, { useState } from "react";
import "./mentalHealth.css";
import ChatBot from "./chatbot";

const MentalHealth = () => {
  const [ageGroup, setAgeGroup] = useState(null);
  const [gender, setGender] = useState(null);

  const handleAgeSelection = (age) => setAgeGroup(age);
  const handleGenderSelection = (gen) => setGender(gen);

  return (
    <div className="mental-health-container">
      {!ageGroup ? (
        <>
          <h1>Mental Health Services</h1>
          <h3>Select your age group</h3>
          <div className="button-group">
            <button onClick={() => handleAgeSelection("15+")}>15+</button>
            <button onClick={() => handleAgeSelection("18+")}>18+</button>
            <button onClick={() => handleAgeSelection("30+")}>30+</button>
          </div>
        </>
      ) : !gender ? (
        <>
          <h1>Mental Health Services</h1>
          <h3>Select your gender</h3>
          <div className="button-group">
            <button onClick={() => handleGenderSelection("Guy")}>Male</button>
            <button onClick={() => handleGenderSelection("Girl")}>Female</button>
            <button onClick={() => handleGenderSelection("Prefer not to say")}>
              Prefer not to say
            </button>
          </div>
        </>
      ) : (
        <ChatBot ageGroup={ageGroup} gender={gender} />
      )}
    </div>
  );
};

export default MentalHealth;
