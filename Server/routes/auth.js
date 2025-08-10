const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });

        const existing = await User.findOne({ email });
        if(existing) {
            return res.status(400).json({
                message: 'Email already registered',
                redirectTo: '/login'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        await User.create({ name, email, passwordHash });
        res.json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
