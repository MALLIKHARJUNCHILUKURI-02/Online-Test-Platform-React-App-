//  React core functionality
import React, { useEffect, useState } from "react";

// Axios for HTTP requests
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';

// Custom Navbar component
import Navbar from "../components/Nav";

export default function Exam() {
    //  State to store fetched questions
    const [questions, setQuestions] = useState([]);

    // tracks which question is currently being displayed
    const [currentIndex, setCurrentIndex] = useState(0);

    // Stores user's selected answers keyed by question ID
    const [answers, setAnswers] = useState({});

    // Countdown timer in seconds (5 minutes = 300 seconds) For testing we can set 1800 sec (30m) if we want
    const [timeLeft, setTimeLeft] = useState(1800);

    // Stores result after exam submission
    const [result, setResult] = useState(null);

    // Retrieve token from localStorage for authentication
    const token = localStorage.getItem("token");

    // Fetch questions on load
    useEffect(() => {
        axios
            .get("/api/exam/questions", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log(res.data); //log questions
                setQuestions(res.data); //Store questions in state
            })
            .catch((err) => console.error(err));
    }, [token]);

    // Countdown timer logic
    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit(); // auto-submit when time runs out
            return;
        }
        //  Decrease timeLeft every second
        const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // Update selected answer for a question
    const handleAnswerSelect = (questionId, option) => {
        setAnswers((prev) => ({ ...prev, [questionId]: option }));
    };

    // Submit answers to backend
    const handleSubmit = () => {
        axios
            .post(
                "/api/exam/submit",
                { answers },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => setResult(res.data))
            .catch((err) => console.error(err));
    };

    // Convert timeLeft to minutes and seconds
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // If result is available, show result screen
    if (result) {
        return (
            <div className="p-5">
                <h2 className="text-center">Exam Results - Full-Stack Developer | Performance Assessment</h2>
                {/* Score display with color based on pass/fail */}
                <p
                    className="text-center"
                    style={{
                        background: (result.score / result.total) * 100 >= 60 ? "green" : "red",
                        color: "white",
                        display: "inline-block",
                        padding: "5px 10px",
                        borderRadius: "5px"
                    }}
                >
                    Score: {((result.score / result.total) * 100).toFixed(2)}%
                </p>

                {/* Detailed breakdown of each question */}
                {result.details.map((d, i) => (
                    <div key={i}>
                        <p>{i + 1}. {d.question}</p>
                        {/* User's answer with color-coded correctness */}
                        <p
                            style={{
                                background: d.givenAnswer === d.correctAnswer ? "green" : "red",
                                color: "white",
                                display: "inline-block",
                                padding: "5px 10px",
                                borderRadius: "5px"
                            }}
                        >
                            Your Answer: {d.givenAnswer || "Not Answered"}
                        </p>
                        {/* Correct answer display */}
                        <p className="bg-success bg-gradient d-inline-flex p-2 text-light rounded m-2">Correct Answer: {d.correctAnswer}</p>
                        <hr />
                    </div>
                ))}

                <p>Thank You</p>
            </div>

        );
    }

    // Show loading message while questions are being fetched
    if (questions.length === 0) return <p>Loading questions...</p>;

    const currentQuestion = questions[currentIndex];


    //   style={{ display: "flex", padding: "20px" }}
    return (

        <><Navbar timeLeft={timeLeft} />
            <div className="d-flex p-5 ">
                {/* Left side: Question Card */}
                <div style={{ flex: "3", paddingRight: "20px", borderRight: "1px solid #ccc" }} className="bg-info-subtle p-3 rounded-start">

                    {/* ⏱ Timer display */}
                    <p
                        className={`btn btn-sm fs-5 ${timeLeft > 60 ? "btn-outline-success" : "btn-outline-danger"}`}
                    >
                        ⏱ Time Left: {minutes}:{seconds < 10 ? "0" : ""}{seconds}
                    </p>

                    {/* Current question */}
                    <h3>{currentIndex + 1}. {currentQuestion.question}</h3>
                    {/* Multiple choice options */}
                    {currentQuestion.options.map((opt, idx) => (
                        <div className="mt-5" key={idx}>
                            <input
                                className="me-2"
                                type="radio"
                                name={currentQuestion._id}
                                value={opt}
                                checked={answers[currentQuestion._id] === opt}
                                onChange={() => handleAnswerSelect(currentQuestion._id, opt)} />
                            {opt}
                        </div>
                    ))}

                    {/* Navigation buttons */}
                    <div className="mt-4 d-flex justify-content-evenly">
                        <button className="me-2 btn btn-outline-primary" onClick={() => setCurrentIndex((i) => i - 1)} disabled={currentIndex === 0}>
                            <span>⬅️ </span> Previous
                        </button>
                        <button className="btn btn-outline-primary"
                            onClick={() => setCurrentIndex((i) => i + 1)}
                            disabled={currentIndex === questions.length - 1}
                        >
                            Next<span> ➡️</span>
                        </button>
                        <button className="btn btn-outline-danger" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>

                {/* Right side: Question navigation panel */}
                <div style={{ flex: "1", paddingLeft: "20px" }} className="bg-dark-subtle rounded-5">
                    <h3 className="text-center">Questions</h3>
                    {/* Grid of question buttons */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }} className="p-3">
                        {questions.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                style={{
                                    background: answers[questions[idx]._id] ? "green" : "black",
                                    color: "white",
                                    padding: "10px",
                                    border: currentIndex === idx ? "4px solid green" : "none",
                                    borderRadius: "12px",
                                    marginTop: "10px"
                                }}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div></>
    );
}
