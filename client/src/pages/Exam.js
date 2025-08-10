import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/Nav";

export default function Exam() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(300); // 5 min = 300 sec
    const [result, setResult] = useState(null);

    const token = localStorage.getItem("token");

    // Fetch questions on load
    useEffect(() => {
        axios
            .get("/api/exam/questions", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log(res.data); // <-- ADD THIS
                setQuestions(res.data);
            })
            .catch((err) => console.error(err));
    }, [token]);

    // Countdown timer
    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit(); // auto-submit when time runs out
            return;
        }
        const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleAnswerSelect = (questionId, option) => {
        setAnswers((prev) => ({ ...prev, [questionId]: option }));
    };

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

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    if (result) {
        return (
            <div className="p-5">
                <h2 className="text-center">Exam Results - Full-Stack Developer | Performance Assessment</h2>
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

                {result.details.map((d, i) => (
                    <div key={i}>
                        <p>{i + 1}. {d.question}</p>

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
                        <p className="bg-success bg-gradient d-inline-flex p-2 text-light rounded m-2">Correct Answer: {d.correctAnswer}</p>
                        <hr />
                    </div>
                ))}

                <p>Thank You</p>
            </div>
            
        );
    }

    if (questions.length === 0) return <p>Loading questions...</p>;

    const currentQuestion = questions[currentIndex];


    //   style={{ display: "flex", padding: "20px" }}
    return (
        <><Navbar timeLeft={timeLeft} />
            <div className="d-flex p-5 ">
                {/* Left side: Question Card */}
                <div style={{ flex: "3", paddingRight: "20px", borderRight: "1px solid #ccc" }} className="bg-info-subtle p-3 rounded-start">

                    <p
                        className={`btn btn-sm fs-5 ${timeLeft > 60 ? "btn-outline-success" : "btn-outline-danger"}`}
                    >
                        ⏳ Time Left: {minutes}:{seconds < 10 ? "0" : ""}{seconds}
                    </p>

                    <h3>{currentIndex + 1}. {currentQuestion.question}</h3>
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

                    {/* style={{ marginTop: "20px" }} */}
                    {/* style={{ marginLeft: "10px", background: "red", color: "white" }} */}
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

                {/* Right side: Navigation Panel */}
                <div style={{ flex: "1", paddingLeft: "20px" }} className="bg-dark-subtle rounded-5">
                    <h3 className="text-center">Questions</h3>
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
