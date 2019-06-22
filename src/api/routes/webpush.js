const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/vapid-key', (req, res) => {
    const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
    console.log('Public vapid key: ' + publicVapidKey);
    res.json(publicVapidKey);
});

module.exports = router;