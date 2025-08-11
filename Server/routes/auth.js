// Import required modules
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body; // Extracting user input from request body
    try {
        // Validating input fields
        if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });

        // Check if user already exists with the given email
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({
                message: 'Email already registered',
                redirectTo: '/login'  // if exists to redirect /login
            });
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create and save the new user in the database
        await User.create({ name, email, passwordHash });
        res.json({ message: 'User registered successfully' });  // Response with success message
    } catch (err) {
        res.status(500).json({ message: 'Server error' });   // handling server errors
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Extracting login credentials
    try {
        // Finding user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Compare provided password with stored hash
        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token with user ID and email
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
});

// Export the router to be used in the main app
module.exports = router;
