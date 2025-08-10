const router = require('express').Router();
const Question = require('../models/Question');
const auth = require('../middleware/auth');
const totalQuestions = 30;

// Fetch 30 random questions
router.get('/questions', auth, async (req, res) => {
    try {
        const questions = await Question.aggregate([{ $sample: { size: 30 } }]);
        const sanitized = questions.map(q => ({
            _id: q._id,
            question: q.question,
            options: q.options
        }));
        res.json(sanitized);
    } catch {
        res.status(500).json({ message: 'Error getting questions' });
    }
});

// Submit answers
router.post('/submit', auth, async (req, res) => {
    const { answers } = req.body; // { questionId: answer }
    try {
        const questionIds = Object.keys(answers);
        const questions = await Question.find({ _id: { $in: questionIds } });

        let score = 0;
        const details = questions.map(q => {
            const correct = q.answer;
            const given = answers[q._id] || null;
            if (given === correct) score++;
            return {
                question: q.question,
                correctAnswer: correct,
                givenAnswer: given,
                isCorrect: given === correct
            };
        });

        res.json({ score, total: totalQuestions, details });
    } catch {
        res.status(500).json({ message: 'Error submitting exam' });
    }
});

module.exports = router;
