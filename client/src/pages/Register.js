// React core functionality
import React, { useState } from "react";
// Axios for HTTP requests
import axios from "axios";
// React Router hook for navigation
import { useNavigate } from "react-router-dom";

export default function Register() {
  // Form state for user input
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Message state for feedback (success or error)
  const [message, setMessage] = useState("");

    // Navigation hook from React Router
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send registration data to backend
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      // Show success message and redirect to login
      setMessage(res.data.message || "Registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      // Handle error and show message
      const msg = error.response?.data?.message || "Registration failed";
      setMessage(msg);

      // ✅ If email exists -> also go to login after showing
      if (msg.toLowerCase().includes("already")) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div style={{ maxWidth: "350px" }} className="w-100">
        <h2>Register</h2>
        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="form-control"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="form-control"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="form-control"
          />
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>

        
        {/* Feedback Message */}
        {message && (
          <div
            className={`alert mt-2 ${
              message.toLowerCase().includes("success")
                ? "alert-success"
                : "alert-danger"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
