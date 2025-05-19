import React from "react";
import {
  MdMedicalServices,
  MdPsychology,
} from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { BsBrightnessLow } from "react-icons/bs";

const iconStyle = { verticalAlign: "top", marginRight: 10, fontSize: "30px" };

const HealthSidebar = ({ isOpen, onClose, onServiceClick }) => {
  const services = [
    { id: "diagnosis", icon: <MdMedicalServices style={iconStyle} />, label: "Diagnosis" },
    { id: "mental-health", icon: <MdPsychology style={iconStyle} />, label: "Mental Health" },
    { id: "external-site", icon: <BsBrightnessLow style={iconStyle} />, label: "Are You Stressed ?" },

  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 100,
        left: isOpen ? 0 : "-300px",
        height: "70%",
        width: "300px",
        background: "rgba(90, 90, 90, 0.19)",
        boxShadow: "2px 0 10px rgba(0,0,0,0.15)",
        border: "2px solid rgb(0, 0, 0)",
        transition: "left 0.3s ease",
        borderRadius: "30px",
        padding: "20px",
        fontFamily: "Segoe UI, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h2 style={{ marginBottom: "60px", color: "#003049" }}>Health Services</h2>
        <ul
          style={{
            listStyle: "none",
            padding: 10,
            marginBottom: "10px",
            fontSize: "25px",
          }}
        >
          {services.map((service) => (
            <li
              key={service.id}
              style={{
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                color: "#003049",
                cursor: "none",
              }}
              onClick={() => onServiceClick(service.id)}
            >
              {service.icon} {service.label}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <button
          onClick={onClose}
          style={{
            padding: "10px",
            background: "#003049",
            color: "white",
            border: "none",
            borderRadius: "10%",
            fontSize: "18px",
            cursor: "none",
          }}
        >
          <IoCloseSharp />
        </button>
      </div>
    </div>
  );
};

export default HealthSidebar;
