// Module imports
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var db = require('../models/db.js');
LocalStrategy = require('passport-local').Strategy;

// Model imports
var User = require('../models/user')

/*
API.js
------
Should be only place database is accessed
*/

var router = express.Router();

/*
User Management
*/

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*
User Routes
*/
router.post('/users/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, next) {
    if(err) {
      console.log(err);
      res.status(500).send({
        message: "Error logging in!"
      });
    }
    if(!user) {
      res.status(401).send({
        message: "Error logging in!"
      });
    }
    if(user) {
      res.status(200).send({
        message: "Logged in!"
      });
    }
  })(req, res, next);
});

router.post('/users/create', function(req, res) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err) {
    if (err) {
      res.status(401).send({
        message: "User already exists with this username!",
        error: true
      });
      return;
    }

    console.log('user registered!');

    res.status(200).send({
      message: "Success!",
      error: false
    });
  });
});

router.post('/users/logout', function(req, res) {
  req.logout();
  res.status(200).send({
    message: "Logged out!"
  });
});

router.get('/users/loggedin', function(req, res) {
  console.log("loggedin?")
  if(req.user) {
    res.status(200).send({
      message: "Logged in!"
    });
    console.log("yes")
  } else {
    res.status(200).send({
      message: "Not logged in!"
    });
    console.log("no")
  }
})

console.log("loaded router")

module.exports = router;
