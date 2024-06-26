const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');

// route only for Development Phase
if (process.env.NODE_ENV === 'development') {
    router.get('/create', (req, res) => {
        res.send('...');
    });
}

router.get('/', (req, res) => {
    res.send('Hey Admin');
});

module.exports = router;