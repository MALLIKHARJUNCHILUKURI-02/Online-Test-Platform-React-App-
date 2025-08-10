// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [msg, setMsg] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/api/auth/login", form);
//       localStorage.setItem("token", res.data.token);
//       setMsg("✅ Login successful! Redirecting to exam...");
//       setTimeout(() => navigate("/exam"), 1000);
//     } catch (err) {
//       setMsg("❌ " + (err.response?.data?.message || "Error"));
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-center">Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//         <button type="submit">Login</button>
//       </form>
//       <p>{msg}</p>
//     </div>
//   );
// }
