import React, { useState } from "react";
import "./Form.css";

const Form = ({ doctor, onClose }) => {
  const [appointmentData, setAppointmentData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, date, time } = appointmentData;
    if (!name || !email || !date || !time) {
      alert("Please fill all fields");
      return;
    }
    setMessage(
      "Appointment booked successfully! Please check your email for details."
    );
    setTimeout(() => {
      setMessage("");
      onClose();
    }, 3500);
  };

  return (
    <div className="formMain">
      <form onSubmit={handleSubmit} className="formContainer">
        <h3>Book appointment with {doctor.name}</h3>
        <input
          name="name"
          placeholder="Your Name"
          value={appointmentData.name}
          onChange={handleChange}
          className="form-input"
        />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={appointmentData.email}
          onChange={handleChange}
          className="form-input"
        />
        <input
          name="date"
          type="date"
          value={appointmentData.date}
          onChange={handleChange}
          className="form-input"
        />
        <input
          name="time"
          type="time"
          value={appointmentData.time}
          onChange={handleChange}
          className="form-input"
        />
        <div className="form-buttons">
          <button type="submit" className="form-submit-btn">
            Book Appointment
          </button>
          <button type="button" onClick={onClose} className="form-cancel-btn">
            Cancel
          </button>
        </div>
        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
};

export default Form;
