// this file contains API endpoints for interacting with the 'photo' collection
// in the database.
const express = require('express');
const router = express.Router();

const upload = process.env.ORG_ID;

// Middleware for authorization. For API calls that require authorization, this middleware checks if the header of API calls have a valid security token. If no security token or invalid security token, then the API call is not made.
const authMiddleWare = require("../auth/authMiddleWare");

const { upload, clients} = require(".../models/models")


router.get('/', (req, res) => {
    upload
    .find({_id: '656d271e94fb5530a0f6331d'}), (error, data) => {
        if (error) {
            return next(error);
        } else if (!data) {
            res.status(400).send('Photo not found');
        } else {
            res.json(data.name);
        }
    }
    });
    
module.exports = router
