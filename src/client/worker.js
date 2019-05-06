self.addEventListener('push', e => {
    const data = e.data.json();
    self.registration.showNotification(data.title, {
        body: 'Account ' + data.username + ' is ' + data.privacy + ' now!',
        icon: 'https://www.a-p-a.net/content/uploads/2017/04/Members-Stalkr.png'
    });
});