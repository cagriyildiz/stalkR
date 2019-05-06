const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const scraper = require('./services/scraper.js');
const path = require('path');
const applicationConstants = require('./constants/constants.js');

const app = express();

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

app.get('/instagram/all', async (req, res, next) => {
    const username = req.query.username;
    const obj = await scraper.getInstagramGlobalObj(username);
    res.json(obj);
});

app.get('/instagram/user', async (req, res, next) => {
    const username = req.query.username;
    const obj = await scraper.getInstagramGlobalObj(username);
    const userObj = obj.entry_data.ProfilePage[0].graphql.user;
    res.json(userObj);
});

app.post('/instagram/stalk-privacy', async (req, res) => {
    const requestBody = req.body;
    console.log('stalking ' + requestBody.username + '\'s account privacy...');
    scraper.isProfilePrivate(requestBody.username, requestBody.subscription);
    res.status(201).json({});
});

webpush.setVapidDetails(
    'mailto:cagriyild@gmail.com',
    applicationConstants.publicVapidKey,
    applicationConstants.privateVapidKey
);

app.listen(3002);