const gender = require('gender-detection');

const detectGenderMiddleware = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    const detectedGender = gender.detect(name); // 'male', 'female', or 'unknown'

    req.detectedGender = detectedGender;
    next();
};

module.exports = detectGenderMiddleware;
