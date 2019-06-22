const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3002;

const server = http.createServer(app);

console.log('Server is running on port: ' + port);
server.listen(port);