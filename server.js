'use strict';
const express = require('express');
const cors = require('cors');
const UAParser = require('ua-parser-js');
const app = express();

app.use(cors());
app.use(express.json({ limit: '64kb' }));

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.post('/v1/parse', (req, res) => {
  const { input } = req.body;
  if (typeof input !== 'string') {
    return res.status(400).json({ error: 'Input must be a User-Agent string.' });
  }

  const parser = new UAParser(input);
  res.status(200).json({ output: parser.getResult() });
});

app.listen(process.env.PORT || 10000);
