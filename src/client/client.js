fetch('/webpush/vapid-key')
.then(response => response.json())
.then(data => {
    if ('serviceWorker' in navigator) {
        send(data, 'instagram-account-privacy', 'cagriyild').catch(err => console.error(err));
    }
});

async function send(publicVapidKey, stalkType, username) {
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    switch (stalkType) {
        case 'instagram-account-privacy':
            stalkInstagramAccountPrivacy(username, subscription);
            break;
        case 'twitter-new-tweets':
            stalkTweets(username, subscription);
            break;
    }
}

function getSubscriptionObject(username, subscription) {
    return {
        method: 'POST',
        body: JSON.stringify({
            'subscription': subscription,
            'username': username
        }),
        headers: {
            'content-type': 'application/json'
        }
    }
}

async function stalkInstagramAccountPrivacy(username, subscription) {
    await fetch('/instagram/stalk-privacy', getSubscriptionObject(username, subscription));
}

async function stalkTweets(username, subscription) {
    await fetch('/twitter/stalk-privacy', getSubscriptionObject(username, subscription));
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }