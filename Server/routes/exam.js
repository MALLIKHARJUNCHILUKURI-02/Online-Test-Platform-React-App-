// Import required modules
const router = require('express').Router();
const Question = require('../models/Question');
const auth = require('../middleware/auth');
const totalQuestions = 30;

// Fetch 30 random questions from the database
router.get('/questions', auth, async (req, res) => {
    try {

        // Used MongoDB aggregation to randomly sample 30 questions
        const questions = await Question.aggregate([{ $sample: { size: 30 } }]);

        // Remove correct answers before sending to client
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
    const { answers } = req.body; // format { questionId: answer }
    try {

        // Extract question IDs from submitted answers
        const questionIds = Object.keys(answers);

        // Fetch corresponding questions from the database
        const questions = await Question.find({ _id: { $in: questionIds } });

        // Compare submitted answers with correct answers
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

        // Respond with score and detailed breakdown
        res.json({ score, total: totalQuestions, details });
    } catch {
        res.status(500).json({ message: 'Error submitting exam' });
    }
});


// Export the router to be used in the main app
module.exports = router;
