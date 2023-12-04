const express = require('express');
const router = express.Router();

// Importing the upload model from the correct path
const { upload } = require("../models/models");

// Middleware for authorization
const authMiddleware = require("../auth/authMiddleware");

router.get('/', authMiddleware, async (req, res, next) => {
    try {
        // Use findOne instead of find when searching for a single document by ID
        const data = await upload.findOne({ _id: '656d271e94fb5530a0f6331d' });

        if (!data) {
            res.status(404).send('Photo not found');
        } else {
            // Assuming 'name' is a field in the 'upload' document
            res.json({ name: data.name });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;

