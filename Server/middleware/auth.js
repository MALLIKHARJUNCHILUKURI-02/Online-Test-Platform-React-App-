// Import the jsonwebtoken library
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
module.exports = (req, res, next) => {

     // Get the Authorization header (expected format: "Bearer <token>")
    const authHeader = req.headers.authorization;

     // If no token is provided, deny access
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    // Extract the token from the "Bearer <token>" format
    const token = authHeader.split(" ")[1];

    // Verify the token using the secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        // If token is invalid or expired, deny access
        if (err) return res.status(403).json({ message: 'Invalid token' });

        // Attach decoded user info to the request object
        req.user = decoded;
        
         // Proceed to the next middleware or route handler
        next();
    });
};
