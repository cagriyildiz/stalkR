self.addEventListener('push', e => {
  const data = e.data.json();
  const site = data.site;
  if (site === 'instagram') {
    self.registration.showNotification(data.title, {
      body: 'Account ' + data.username + ' is ' + data.privacy + ' now!',
      icon: 'https://www.a-p-a.net/content/uploads/2017/04/Members-Stalkr.png'
    });
  } else if (site === 'twitter') {
    self.registration.showNotification(data.title, {
      body: 'Account ' + data.username + ' has posted new tweet!',
      icon: 'https://www.a-p-a.net/content/uploads/2017/04/Members-Stalkr.png',
      data: {
        url: 'https://twitter.com' + data.tweet
      }
    });
  }
});