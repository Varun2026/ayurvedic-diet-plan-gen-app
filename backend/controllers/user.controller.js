const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function to generate a JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc   Register a new user (patient or doctor)
// @route  POST /api/users/register
const registerUser = async (req, res) => {
  const { fullName, email, password, role, city, address, phone, licenseNumber, specialties, hospitalLocation } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
      city: role === 'patient' ? city : undefined,
      address: role === 'patient' ? address : undefined,
      phone: role === 'patient' ? phone : undefined,
      licenseNumber: role === 'doctor' ? licenseNumber : undefined,
      specialties: role === 'doctor' ? specialties : undefined,
      hospitalLocation: role === 'doctor' ? hospitalLocation : undefined,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      _id: savedUser._id,
      fullName: savedUser.fullName,
      email: savedUser.email,
      role: savedUser.role,
      token: generateToken(savedUser._id)
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc   Authenticate a user & get token
// @route  POST /api/users/login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser };