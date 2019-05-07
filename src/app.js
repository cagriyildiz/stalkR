const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const webpush = require('web-push');
require('dotenv').config();

const instagramRoutes = require('./api/routes/instagram');
const webpushRoutes = require('./api/routes/webpush');

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());

app.use('/instagram', instagramRoutes);
app.use('/webpush', webpushRoutes);

webpush.setVapidDetails(
    'mailto:cagriyild@gmail.com',
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
);

module.exports = app;