const express = require('express');
const server = express();
const dbRouter = require('./data/router/post-router.js');

server.use(express.json());
server.use('/api/posts', dbRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Veto Ramirez</h>
    <p>Blog Post Project. API 2</p>
  `);
});

module.exports = server;