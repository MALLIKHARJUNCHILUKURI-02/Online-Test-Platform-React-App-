// import React, { useState } from "react";
// import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function Register() {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: ""
//     });

//     const [message, setMessage] = useState("");

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post("http://localhost:5000/api/auth/register", formData);
//             setMessage(res.data.message || "Registration successful!");
//         } catch (error) {
//             setMessage(error.response?.data?.message || "Registration failed");
//         }
//     };

//     return (
//         <div className="d-flex justify-content-center align-items-center vh-100">
//             <div className="w-25">
//                 <h2>Register</h2>
//                 <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
//                     <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
//                     <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//                     <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//                     <button type="submit" className="btn btn-primary">Register</button>
//                 </form>
//                 {message && <p>{message}</p>}
//             </div>
//         </div>

//     );
// }
