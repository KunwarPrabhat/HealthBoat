import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "../components/home";
import CustomCursor from "../components/CustomCursor/customcursor";
import MentalHealth from "../components/MentalHealth/mentalHealth";
import DiagnosisForm from "../components/Diagnosis/diagnosis";
import PixelThought from "../components/AreYouStressed/pixelThought";

function App() {
  return (
    <Router>
      <CustomCursor />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mental-health" element={<MentalHealth />} />
          <Route path="/diagnosis" element={<DiagnosisForm />} />
          <Route path="/external-site" element={<PixelThought />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
