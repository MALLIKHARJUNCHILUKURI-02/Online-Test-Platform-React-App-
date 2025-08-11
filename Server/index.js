// .env file into process.env
require('dotenv').config();

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Create an Express application
const app = express();

// Enable CORS for all routes (allows requests from different origins)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Add the code that handles authentication and exam API requests.
app.use('/api/auth', require('./routes/auth'));
app.use('/api/exam', require('./routes/exam'));

// Redirect root URL to the frontend application (assumed to be running on port 3000)
app.get('/', (req, res) => {
  res.redirect('http://localhost:3000');
});

// Start the server and log the URL it's running on
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
