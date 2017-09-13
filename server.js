const express = require('express');
const app = express();
const path = require('path');
const api = require('./api/api');
const ShortUrl = require('./api/ShortUrl');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/shortUrls');
let db = mongoose.connection;
db.once('open', function() {
  console.log('Connected to db');
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.send(200);
    }
    else {
    //move on
      next();
    }
});

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api', api);

app.get('/:key', (req, res) => {
  ShortUrl.find({ key: req.params.key }, (err, sUrl) => {

    if(! (sUrl.length == 0)) {
      res.redirect(sUrl[0].url);
    } else {
      res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
    }

    if (err) {
      res.redirect('/');
      throw err;
    }

  });

});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
