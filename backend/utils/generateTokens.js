const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateTokenAndSetCookie = (userId, res) => {
    try {
        // Generate the JWT token
        const token = jwt.sign({ userId }, process.env.JWT_TOKEN, { expiresIn: '15d' });
        let options = {
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
            httpOnly: true, // The cookie only accessible by the web server
            sameSite: 'none',
            secure: true, // Ensures the cookie is sent over HTTPS
        };

        // Set the cookie and send the response
        res.cookie('jwt', token, options);
    } catch (error) {
        console.error("Error generating token and setting cookie:", error);
        // Send an error response
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};
