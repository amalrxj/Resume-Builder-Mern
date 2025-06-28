import gender from 'gender-detection';

const detectGenderMiddleware = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    try {
        req.detectedGender = gender.detect(name); // 'male', 'female', or 'unknown'
    } catch (error) {
        return res.status(500).json({ message: 'Error detecting gender' });
    }
    next();
};
export { detectGenderMiddleware };
