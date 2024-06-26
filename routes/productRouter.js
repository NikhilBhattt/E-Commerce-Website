const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hey Product');
});

module.exports = router;