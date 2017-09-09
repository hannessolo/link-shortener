const express = require('express');
const router = express.Router();
const ShortUrl = require('./ShortUrl');


router.post('/create', (req, res, next) => {

  res.set({
    'Content-Type': 'application/json'
  });

  let newShortUrl = ShortUrl({
    url: req.body.url,
    key: req.body.key
  });

  newShortUrl.save((err) => {
    if(err) {
      res.json({
        success: false
      });
      throw err;
    }
    console.log('url created');
    console.log(req.body);
    res.json({
      success: true
    });
  });



});

module.exports = router;
