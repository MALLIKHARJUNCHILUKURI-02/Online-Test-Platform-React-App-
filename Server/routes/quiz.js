// // In your routes/quiz.js or controller

// const express = require('express');
// const router = express.Router();
// const Question = require('../models/Question'); // Your Mongoose model

// router.get('/assessment', async (req, res) => {
//   // Load 30 questions only on first visit in session
//   if (!req.session.examQuestions) {
//     // Get 30 random questions
//     const questions = await Question.aggregate([{ $sample: { size: 30 } }]);
//     req.session.examQuestions = questions.map(q => q._id.toString());
//     req.session.currentIndex = 0;
//   }

//   // Load the current question using session index
//   const idx = req.session.currentIndex || 0;
//   const questionId = req.session.examQuestions[idx];
//   const question = await Question.findById(questionId);

//   res.render('assessment', {
//     questions: req.session.examQuestions,
//     currentIndex: idx,
//     question,
//     // You may also send user/email and timing info as needed
//   });
// });

// // Navigation: go to question by index
// router.get('/assessment/:num', async (req, res) => {
//   const num = Number(req.params.num); // 0-based index
//   if (!req.session.examQuestions || num < 0 || num >= req.session.examQuestions.length) {
//     return res.redirect('/assessment');
//   }
//   req.session.currentIndex = num;
//   const questionId = req.session.examQuestions[num];
//   const question = await Question.findById(questionId);

//   res.render('assessment', {
//     questions: req.session.examQuestions,
//     currentIndex: num,
//     question,
//   });
// });
