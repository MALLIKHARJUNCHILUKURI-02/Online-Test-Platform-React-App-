import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Page components
import Register from "./pages/Register";
import Login from "./pages/Login";
import Exam from "./pages/Exam";

// React
function App() {
  return (
    // Wrap the app in BrowserRouter to enable routing
    <BrowserRouter>
      {/* Define all route paths */}
      <Routes>
        {/* Default route Redirect from "/" to "/register" */}
        <Route path="/" element={<Navigate to="/register" />} />

        {/* Registration page */}
        <Route path="/register" element={<Register />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Exam page*/}
        <Route path="/exam" element={<Exam />} />

        {/* Fallback */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
