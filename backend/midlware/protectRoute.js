const jwt =require('jsonwebtoken');
const User =require('../models/user.models')

exports.protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - No token provided' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        // Find user by ID from token
        const user = await User.findById(decoded.userId).select('-password');

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        console.error('Error in protected route:', error.message);
        return res.status(500).json({
            error: error.message,
            message: 'Error in protected route'
        });
    }
};


