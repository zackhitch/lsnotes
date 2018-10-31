const express = require('express');
const helmet = require('helmet');

const knex = require('../db/config.js');

const server = express();
const port = process.env.PORT || 9000;

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`Api running on port: ${port}`);
});

server.get('/items', async (req, res) => {
  try {
    const items = await knex('items');

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'error getting items from db' });
  }
});

server.post('/items', async (req, res) => {
  console.log(req.body);
  try {
    const result = await knex('items').insert(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'error saving the item', error });
  }
});

module.exports = server;
