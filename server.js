const express = require('express');
const server = express();
const hubsRouter = require('./data/post-router.js');

server.use(express.json());
server.use('/api/posts', hubsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

module.exports = server;