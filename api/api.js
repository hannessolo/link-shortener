const express = require('express');
const router = express.Router();
const ShortUrl = require('./ShortUrl');
const User = require('./User');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

router.get('/alllinks', (req, res, next) => {
  res.set({
    'Content-Type': 'application/json'
  });

  ShortUrl.find({}, (err, urls) => {

    res.json({
      urls: urls
    });

  });
});

router.post('/signup', (req, res, next) => {
  res.set({
    'Content-Type': 'application/json'
  });

  bcrypt.hash(req.body.password, null, null, (err, hash) => {

    if (err) throw err;

    let newUser = User({
      username: req.body.username,
      password: hash,
      admin: req.body.admin
    });

    newUser.save((err) => {
      if(err) {
        res.json({
          success: false
        });
        throw err;
      }
      console.log('User created');
      res.json({
        success: true
      });
    });
  });
});

router.post('/login', (req, res, next) => {
  res.set({
    'Content-Type': 'application/json'
  });

  User.findOne({ username: req.body.username }, (err, user) => {

    if(err) throw err;

    if (!user) {
      res.json({sucess: false, message: 'Authentication failed. User not found.'});
    } else if (user && !(bcrypt.compareSync(req.body.password, user.password))) {
      res.json({sucess: false, message: 'Authentication failed. Wrong password.'});
    } else {
      var token = jwt.sign({user}, 'secret');
      res.json({
        success: true,
        message: 'Authentification Sucessful',
        token: token
      })
    }

  });

});

router.post('/verify', (req, res, next) => {

  res.set({
    'Content-Type': 'application/json'
  });

  jwt.verify(req.body.token, 'secret', (err, decoded) => {
    if (err) {
      res.json({
        loggedIn: false
      });
    } else {
      res.json({
        loggedIn: true,
        user: decoded
      });
    }
  });

});

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
