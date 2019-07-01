const axios = require('axios');
const cheerio = require('cheerio');
const webpush = require('web-push');
const cron = require('node-cron');

const openTwitterPage = async (username) => {
  const html = await axios.get('https://twitter.com/' + username);
  return cheerio.load(html.data);
};

const isProfilePrivate = async (username) => {
  const $ = await openTwitterPage(username);
  const isPrivate = $('.ProfileNav-list .ProfileNav-item--userActions .user-actions').attr('data-protected');
  return isPrivate === 'true';
};

const getRecentTweet = async (username) => {
  const $ = await openTwitterPage(username);
  let recentTweet = $('#timeline ol li').first();
  if (recentTweet.hasClass('js-pinned')) {
    recentTweet = recentTweet.next();
  }
  const tweetInnerInfoDiv = recentTweet.find('div').first();
  return tweetInnerInfoDiv.attr('data-permalink-path');
};

const isThereNewTweet = async (username, subscription) => {
  const isPrivate = await isProfilePrivate(username);
  if (isPrivate) {
    console.log('Cannot stalk ' + username + ' since the account is private!');
  } else {
    const recentTweetPath = await getRecentTweet(username);
    cron.schedule('* * * * *', async () => { // check if there is a new tweet posted in every minute
      const newTweetPath = await getRecentTweet(username);
      if (newTweetPath !== recentTweetPath) {
        sendNotification(subscription, username, newTweetPath);
      }
    });
  }
};

const sendNotification = (subscription, username, tweetPath) => {
  const payload = JSON.stringify({
    'site': 'twitter',
    'title': 'New tweet posted!',
    'username': username,
    'tweet': tweetPath
  });
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
};

module.exports = {
  isProfilePrivate: isProfilePrivate,
  isThereNewTweet: isThereNewTweet
};