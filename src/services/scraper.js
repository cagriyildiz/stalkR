const axios = require('axios');
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

isProfilePrivate = async (username) => {
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
            console.log(username + ' has just changed the account privacy: [' + accountPrivacy + ' account]');
            // TODO: inform the stalker that the account privacy has changed by sending notification...
        }
    });
    return currentPrivacy;
}

module.exports = {
    getInstagramGlobalObj: getInstagramGlobalObj,
    isProfilePrivate: isProfilePrivate
}