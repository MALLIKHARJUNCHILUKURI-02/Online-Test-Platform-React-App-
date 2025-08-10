import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/exam");
    } catch (err) {
      setMsg("❌ " + (err.response?.data?.message || "Error"));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex flex-column align-items-center">
        <h2 className="text-center">Login</h2>
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
        <p>{msg}</p>
      </div>
    </div>

  );
}
