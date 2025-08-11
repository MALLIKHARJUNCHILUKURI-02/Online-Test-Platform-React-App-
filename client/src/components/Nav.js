import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar({ timeLeft }) {
  
  // Convert timeLeft (in seconds) to minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        {/* App Title */}
        <span className="navbar-brand fw-bold">
          Full-Stack Developer – Performance Assessment
        </span>

        <div className="ms-auto d-flex align-items-center gap-3">
          {/* Countdown Timer  */}
          <span
            className={`btn btn-sm ${
              timeLeft > 60 ? "btn-outline-warning fs-4" : "btn-outline-danger"
            }`}
          >
            ⏱ {minutes}:{seconds < 10 ? "0" : ""}{seconds}
          </span>

        </div>
      </nav>

      
    </>
  );
}
