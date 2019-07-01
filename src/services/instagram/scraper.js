const axios = require('axios');
const webpush = require('web-push');
const cron = require('node-cron');

const Picture = require('../../api/models/picture');

const getInstagramGlobalObj = async (username) => {
  const html = await axios.get('https://www.instagram.com/' + username);
  const start = html.data.indexOf('window._sharedData');
  let sharedData = html.data.substr(start);
  const end = sharedData.search(';');
  sharedData = sharedData
    .substr(0, end)
    .substr(sharedData.indexOf('{'))
    .trim();
  return JSON.parse(sharedData);
};

const isProfilePrivate = async (username, subscription) => {
  const currentObj = await getInstagramGlobalObj(username);
  const currentUserObj = currentObj.entry_data.ProfilePage[0].graphql.user;
  let currentPrivacy = currentUserObj.is_private;
  cron.schedule('* * * * *', async () => { // check account privacy every minute
    const obj = await getInstagramGlobalObj(username);
    const userObj = obj.entry_data.ProfilePage[0].graphql.user;
    const isPrivate = userObj.is_private;
    if (currentPrivacy !== isPrivate) {
      currentPrivacy = isPrivate;
      const accountPrivacy = currentPrivacy ? 'private' : 'public';
      console.log('account ' + username + ' is ' + accountPrivacy + ' now!');
      if (!currentPrivacy) { // if profile is public
        console.log('saving images to database...');
        saveInformationToDB(userObj, username);
      }
      sendNotification(subscription, username, accountPrivacy);
    }
  });
};

const saveInformationToDB = (userObj, username) => {
  const timelineMedia = userObj.edge_owner_to_timeline_media;
  const mediaCount = timelineMedia.count;
  const lazyMedia = timelineMedia.edges;
  const lazyMediaCount = lazyMedia.length;
  for (let media of lazyMedia) {
    let imgId = media.node.id;
    let imgUrl = media.node.display_url;
    let picture = new Picture({
      _id: imgId,
      user: username,
      url: imgUrl
    });
    picture
      .save()
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }
};

const sendNotification = (subscription, username, privacy) => {
  const payload = JSON.stringify({
    'site': 'instagram',
    'title': 'Account Privacy Changed!',
    'username': username,
    'privacy': privacy
  });
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
};

module.exports = {
  getInstagramGlobalObj: getInstagramGlobalObj,
  isProfilePrivate: isProfilePrivate
};