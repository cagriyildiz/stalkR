const axios = require('axios');

module.exports = {
    getInstagramGlobalObj: async (username) => {
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
}