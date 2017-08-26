const express = require('express');
const router = express.Router();
const cors = require('cors');
const ShortUrl = require('./ShortUrl');

router.get('/test', cors(), (req, res, next) => {

  res.set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  res.json({
    works: 'true'
  });
});

router.post('/create', cors(), (req, res, next) => {

  res.set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
  });

  let newShortUrl = ShortUrl({
    url: req.body.url
  });

  newShortUrl.save((err) => {
    if(err) {
      throw err;
      res.json({
        success: false
      })
    }
    console.log('url created');
    console.log(req.body);
    res.json({
      success: true
    });
  });



});

module.exports = router;
