const express = require('express');
const router = express.Router();
const scraper = require('../../services/scraper');

router.get('/all', async (req, res, next) => {
    const username = req.query.username;
    const obj = await scraper.getInstagramGlobalObj(username);
    res.json(obj);
});

router.get('/user', async (req, res, next) => {
    const username = req.query.username;
    const obj = await scraper.getInstagramGlobalObj(username);
    const userObj = obj.entry_data.ProfilePage[0].graphql.user;
    res.json(userObj);
});

router.post('/stalk-privacy', async (req, res) => {
    const requestBody = req.body;
    console.log('stalking ' + requestBody.username + '\'s account privacy...');
    scraper.isProfilePrivate(requestBody.username, requestBody.subscription);
    res.status(201).json({});
});

module.exports = router;