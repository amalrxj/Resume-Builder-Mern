const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
}

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl } = req.body;
        const detectedGender = req.detectedGender;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Set default profile image URL if not provided
        let finalProfileImageUrl = profileImageUrl;
        if (!finalProfileImageUrl) {
            if (detectedGender === 'male') {
                finalProfileImageUrl = 'https://res.cloudinary.com/da4z6oxuc/image/upload/v1746080316/task-manager/default/avatar_male.png';
            } else if (detectedGender === 'female') {
                finalProfileImageUrl = 'https://res.cloudinary.com/da4z6oxuc/image/upload/v1746080316/task-manager/default/avatar_female.png';
            } else {
                finalProfileImageUrl = 'https://res.cloudinary.com/da4z6oxuc/image/upload/f_auto,q_auto/v1/task-manager/default/avatar_male'; // For unknown or non-binary names
            }
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl: finalProfileImageUrl,
        });

        res.status(201).json({ _id: user._id, name: user.name, email: user.email, profileImageUrl: user.profileImageUrl, token: generateToken(user._id) });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc Login user
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user email
        const user
            = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check for password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

}

// @desc Get user profile
// @route GET /api/auth/profile
// @access Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
};