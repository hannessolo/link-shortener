const express = require('express');
const app = express();
const path = require('path');
const api = require('./api/api');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/shortUrls');
let db = mongoose.connection;
db.once('open', function() {
  console.log('Connected to db');
});

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
