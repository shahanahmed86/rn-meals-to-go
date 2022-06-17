require('dotenv/config');

const http = require('http');
const app = require('./app');

const port = process.env.APP_PORT || 5001;

const server = http.createServer(app);

server.listen({ port }, () => {
  console.log(`🚀 REST-APIs: http://localhost:${port}/api`);
});
