import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Header, Footer } from "./headTail/elemets";
import { OrbitControls } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import AmbulanceModel from "./ambulanceModel";
import HealthSidebar from "./healthSidebar";

const Home = () => {
  const mouse = useRef({ x: 0, y: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseMove = (event) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
  };

  const handleWindowClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleServiceClick = (service) => {
    setSidebarOpen(false);
    switch (service) {
      case "diagnosis":
        navigate("/diagnosis");
        break;
      case "mental-health":
        navigate("/mental-health");
        break;
      case "external-site":
        navigate("/external-site");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Header />
      <div style={{ display: "flex", height: "calc(100vh - 120px)" }}>
        {/* Main 3D Canvas and sidebar */}
        <div style={{ flex: 1, position: "relative" }}>
          <div onMouseMove={handleMouseMove} style={{ height: "100%" }}>
            <Canvas
              style={{ width: "100%", height: "100%", display: "block" }}
              camera={{ position: [40, 10, 30], fov: 50 }}
            >
              <ambientLight intensity={1.5} />
              <directionalLight position={[10, 10, 0]} intensity={4} />
              <AmbulanceModel
                mouse={mouse.current}
                onWindowClick={handleWindowClick}
              />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2.5}
              />
            </Canvas>
          </div>

          <HealthSidebar
            isOpen={sidebarOpen}
            onClose={handleSidebarClose}
            onServiceClick={handleServiceClick}
          />
        </div>

        <section
          style={{
            width: "320px",
            padding: "30px 25px",
            backgroundColor: "#e8f0fe",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: "#003049",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0, 48, 73, 0.15)",
            overflowY: "auto",
            lineHeight: 1.6,
            userSelect: "text",
          }}
        >
          <h2
            style={{
              fontSize: "1.8rem",
              marginBottom: "15px",
              borderBottom: "3px solid #003049",
              paddingBottom: "5px",
              fontWeight: "700",
              letterSpacing: "1.2px",
            }}
          >
            About This Application
          </h2>
          <p
            style={{
              fontSize: "1rem",
              marginBottom: "20px",
              fontWeight: "500",
              color: "#004080",
            }}
          >
            This platform helps you access healthcare services including{" "}
            <strong>Mental Health</strong> support and{" "}
            <strong>Early Diagnosis</strong>.
          </p>
          <div
            style={{ fontSize: "1rem", fontWeight: "400", color: "#003049" }}
          >
            <p
              style={{
                marginBottom: "10px",
                fontWeight: "600",
                fontSize: "1.1rem",
              }}
            >
              How to use:
            </p>
            <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
              <li style={{ marginBottom: "10px" }}>
                Click on the ambulance{" "}
                <strong style={{ color: "#007BFF" }}>+</strong> icon to open the
                support menu.
              </li>
              <li style={{ marginBottom: "10px" }}>
                Select sections like <em>Mental Health</em> or{" "}
                <em>Early Diagnosis</em> to navigate.
              </li>
              <li>Use the sidebar to explore different health services.</li>
              <li>Feel free to share your problems to the mental health bot.</li>
              <li>You can also Book an appointment with our experienced psychiatrists.</li>
            </ul>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
