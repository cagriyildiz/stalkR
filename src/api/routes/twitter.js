const express = require('express');
const router = express.Router();
const scraper = require('../../services/twitter/scraper');

router.post('/stalk-tweets', async (req, res) => {
    const requestBody = req.body;
    console.log('stalking ' + requestBody.username + '\'s twitter account privacy...');
    scraper.isThereNewTweet(requestBody.username, requestBody.subscription);
    res.status(201).json({});
});

module.exports = router;