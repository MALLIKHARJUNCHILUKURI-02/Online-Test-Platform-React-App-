import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // for navigation

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      // ✅ Success case
      setMessage(res.data.message || "Registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
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

        {/* Alert message */}
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
