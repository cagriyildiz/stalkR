const express = require('express');
const scraper = require('./services/scraper.js');

const app = express();

app.get('/instagram/all', async (req, res, next) => {
    const username = req.query.username;
    const obj = await scraper.getInstagramGlobalObj(username);
    res.json(obj);
});

app.get('/instagram/user', async (req, res, next) => {
    const username = req.query.username;
    const obj = await scraper.getInstagramGlobalObj(username);
    const userObj = obj.entry_data.ProfilePage[0].graphql.user;
    console.log(userObj);
    res.json(userObj);
});

app.listen(3002);