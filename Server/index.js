require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/exam', require('./routes/exam'));

// Serve React build
// app.use(express.static(path.join(__dirname, '../client/build')));

// // Catch-all route (fix for path-to-regexp issue)
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });
app.get('/', (req, res) => {
  res.redirect('http://localhost:3000');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
