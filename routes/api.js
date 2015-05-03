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
router.post('/users/login',
  passport.authenticate('local', function(err, user, next) {
    if(err) {
      req.send(500);
    }
    if(!user) {
      req.send(401);
    }
    if(user) {
      req.send(200);
    }
  })
);

router.post('/users/create', function(req, res) {
  console.log("create: " + req.body.username);
  User.register(new User({ username: req.body.username }), req.body.password, function(err) {
    if (err) { console.log('error while user register!', err); return next(err); }

    console.log('user registered!');

    res.redirect('/');
  });
});

console.log("loaded router")

module.exports = router;
