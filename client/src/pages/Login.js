// React core functionality
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
   // State to hold form input values
  const [form, setForm] = useState({ email: "", password: "" });

  // State to hold feedback message
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      // Send login credentials to backend
      const res = await axios.post("/api/auth/login", form);

      // Store token in localStorage
      localStorage.setItem("token", res.data.token);

      // Redirect to exam page
      navigate("/exam");
    } catch (err) {
      setMsg("❌ " + (err.response?.data?.message || "Error"));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex flex-column align-items-center">
        <h2 className="text-center">Login</h2>

          {/* Login Form */}
        <form onSubmit={handleSubmit} className="d-flex flex-column w-100" style={{ maxWidth: "350px" }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="m-2 w-100"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="m-2 w-100"
          />
          <button type="submit" className="btn btn-primary m-2 w-100">
            Login
          </button>
        </form>
        
         {/* Feedback Message */}
        <p>{msg}</p>
      </div>
    </div>

  );
}
