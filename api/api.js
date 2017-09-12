const express = require('express');
const router = express.Router();
const ShortUrl = require('./ShortUrl');
const User = require('./User');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

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
      console.log(req.body);
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
    } else if (user && !bcrypt.compareSync(req.body.password, user.password)) {
      res.json({sucess: false, message: 'Authentication failed. Wrong password.'});
    } else {
      console.log(user);
      var token = jwt.sign({user}, 'secret');
      res.json({
        sucess: true,
        message: 'Sucessfully Authentfied? Lol im too tired to check',
        token: token
      })
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
