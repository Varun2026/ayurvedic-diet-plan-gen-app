const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ... (The existing createUser and getAllUsers functions are here) ...
const createUser = async (req, res) => {
    // ... (no changes to this function)
};
const getAllUsers = async (req, res) => {
    // ... (no changes to this function)
};


// --- NEW LOGIN FUNCTION ---
// @desc   Authenticate a user & get token
// @route  POST /api/users/login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // If user exists and password matches, send back a token
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                token: generateToken(user._id) // Generate the JWT
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Helper function to generate a JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token will be valid for 30 days
    });
};


module.exports = { createUser, getAllUsers, loginUser }; // Add loginUser to exports