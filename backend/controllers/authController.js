const jwt = require('jsonwebtoken');
const User = require('../models/User');
const argon2 = require('argon2');

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

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        // Check if user already exists
        const normalizedEmail = email.toLowerCase().trim();
        const userExists = await User.findOne({ email: normalizedEmail });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);
        const hashedPassword = await argon2.hash(password);

        // Set default profile image URL if not provided
        // Default profile image assignment
        let resolvedProfileImageUrl = profileImageUrl;
        if (!resolvedProfileImageUrl) {
            switch (detectedGender) {
                case 'male':
                    resolvedProfileImageUrl = 'https://res.cloudinary.com/da4z6oxuc/image/upload/v1746080316/resume-builder/default/avatar_male.png';
                    break;
                case 'female':
                    resolvedProfileImageUrl = 'https://res.cloudinary.com/da4z6oxuc/image/upload/v1746080316/resume-builder/default/avatar_female.png';
                    break;
                default:
                    resolvedProfileImageUrl = 'https://res.cloudinary.com/da4z6oxuc/image/upload/t_avatar_neutral/v1751110873/resume-builder/default/avatar_neutral.png';
                    break;
            }
        }

        // Create user
        const user = await User.create({
            name,
            email: normalizedEmail,
            password: hashedPassword,
            profileImageUrl: resolvedProfileImageUrl,
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
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        // Check for user email
        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check for password
        const isMatch = await argon2.verify(user.password, password);
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