const fs = require('node:fs');
const path = require('node:path');
const Resume = require('../models/Resume');

// @desc    Create a new resume
// @route   POST /api/resume
// @access  Private
const createResume = async (req, res) => {
    try {
        const { title } = req.body;

        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: "",
                fullName: "",
                designation: "",
                summary: "",
            },
            contactInfo: {
                email: "",
                phone: "",
                location: "",
                website: "",
                github: "",
                linkedin: "",
            },
            workExperience: [
                {
                    company: "",
                    role: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                },
            ],
            education: [
                {
                    degree: "",
                    institution: "",
                    startDate: "",
                    endDate: "",
                },
            ],
            skills: [
                {
                    name: "",
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: "",
                    description: "",
                    github: "",
                    liveDemo: "",
                },
            ],
            certifications: [
                {
                    title: "",
                    issuer: "",
                    year: "",
                },
            ],
            languages: [
                {
                    name: "",
                    progress: 0,
                },
            ],
            interests: [""],
        };

        const newResume = await Resume.create({
            userId: req.user._id,
            title,
            ...defaultResumeData,
        });
        res.status(201).json(newResume);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create resume', error: error.message });
    }
}
// @desc    Get all resumes for the logged-in user
// @route   GET /api/resume
// @access  Private
const getUserResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
        res.status(200).json(resumes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get resumes', error: error.message });
    }
}

// @desc    Get a resume by ID
// @route   GET /api/resume/:id
// @access  Private
const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.status(200).json(resume);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get resume', error: error.message });
    }
}

// @desc    Update a resume by ID
// @route   PUT /api/resume/:id
// @access  Private
const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found or you are not authorized' });
        }
        Object.assign(resume, req.body);
        const updatedResume = await resume.save();
        res.status(200).json(updatedResume);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update resume', error: error.message });
    }
}

// @desc    Delete a resume by ID
// @route   DELETE /api/resume/:id
// @access  Private
const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found.' });
        }
        const uploadsFolder = path.join(__dirname, '..', 'uploads');
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        if (resume.thumbnailLink) {
            const oldthumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
            if (fs.existsSync(oldthumbnail)) fs.unlinkSync(oldthumbnail);
        }

        if (resume.profileInfo?.profilePreviewUrl) {
            const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
            if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
        }

        const deleted = await Resume.findOneAndDelete(
            {
                _id: req.params.id,
                userId: req.user._id
            }
        )

        if (!deleted) {
            return res.status(404).json({ message: "Resume not found." })
        }
        res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume
};