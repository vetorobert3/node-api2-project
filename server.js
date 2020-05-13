const express = require('express');
const server = express();
const db = require('./data/db.js');

server.use(express.json());
server.use('/api/data', db);

server.get('/', (req, res) => {
  res.send(`
    <h2>Blog Posts</h2>
  `);
});

module.export = server;