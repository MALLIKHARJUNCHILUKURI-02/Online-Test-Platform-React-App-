// Import Mongoose for MongoDB object modeling
const mongoose = require('mongoose');

// Define the schema for a question
const QuestionSchema = new mongoose.Schema({
    // The text of the question
    question: String,

     // Array of possible answer options
    options: [String],
    
    // The correct answer
    answer: String
});

// Export the model so it can be used in other parts of the app
module.exports = mongoose.model('Question', QuestionSchema);
