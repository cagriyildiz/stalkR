const axios = require('axios');
const webpush = require('web-push');
const cron = require('node-cron');

getInstagramGlobalObj = async (username) => {
    const html = await axios.get('https://www.instagram.com/' + username);
    const start = html.data.indexOf('window._sharedData');
    let sharedData = html.data.substr(start);
    const end = sharedData.search(';');
    sharedData = sharedData
        .substr(0, end)
        .substr(sharedData.indexOf('{'))
        .trim();
    return JSON.parse(sharedData);
}

isProfilePrivate = async (username, subscription) => {
    const currentObj = await getInstagramGlobalObj(username);
    const currentUserObj = currentObj.entry_data.ProfilePage[0].graphql.user;
    let currentPrivacy = currentUserObj.is_private;
    cron.schedule('* * * * *', async () => { // check account privacy every minute
        const obj = await getInstagramGlobalObj(username);
        const userObj = obj.entry_data.ProfilePage[0].graphql.user;
        const isPrivate = userObj.is_private;
        if (currentPrivacy != isPrivate) {
            currentPrivacy = isPrivate;
            const accountPrivacy = currentPrivacy ? 'private' : 'public';
            if (!currentPrivacy) {
                // TODO: save informations to DB
            }
            console.log('account ' + username + ' is ' + accountPrivacy + ' now!');
            sendNotification(subscription, username, accountPrivacy);
        }
    });
}

sendNotification = (subscription, username, privacy) => {
    const payload = JSON.stringify({
        'title': 'Account Privacy Changed!',
        'username': username,
        'privacy': privacy
    });
    webpush
        .sendNotification(subscription, payload)
        .catch(err => console.error(err));
}

module.exports = {
    getInstagramGlobalObj: getInstagramGlobalObj,
    isProfilePrivate: isProfilePrivate
}