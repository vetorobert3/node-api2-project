const express = require('express');
const server = express();
const hubsRouter = require('./data/router/post-router.js');

server.use(express.json());
server.use('/api/posts', hubsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Veto Ramirez</h>
    <p>Blog Post Project. API 2</p>
  `);
});

module.exports = server;