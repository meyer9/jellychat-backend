// Module imports
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var db = require('../models/db.js');
var util = require('util');
LocalStrategy = require('passport-local').Strategy;

// Model imports
var User = require('../models/user')
var Chat = require('../models/chat')

/*
API.js
------
Should be only place database is accessed
*/

var router = express.Router();

router.post("/chats/post", function(req, res) {
  console.log(req.body)
  if(!req.body.nick) {
    res.status(500).send({
      message: "Missing nick!"
    })
    return;
  } else {
    nick = req.body.nick
  }

  if(!req.body.message) {
    res.status(500).send({
      message: "Missing message!"
    })
    return;
  } else {
    message = req.body.message
  }

  if(!req.body.room) {
    res.status(500).send({
      message: "Missing room!"
    })
    return;
  } else {
    room = req.body.room
  }

  chat = new Chat({
    room: room,
    message: message,
    nick: nick,
    created: new Date()
  });
  chat.save(function(err) {
    if(err) {
      res.status(500).send({
        message: "Internal server error!"
      })
    } else {
      res.status(200).send({
        message: "Success!"
      })
    }
  })
});

router.post("/chats/remove", function(req, res) {
  if(!req.body.id) {
    res.status(500).send({
      message: "Missing id!"
    })
    return;
  } else {
    id = req.body.id
  }
  Chat.findOneAndRemove({_id: id}, function(err) {
    if(!err) {
      res.status(200).send({
        message: "Success!"
      })
    } else {
      res.status(500).send({
        message: "Internal Server Error!"
      });
    }
  });
})
router.post("/chats/mod", function(req, res) {

})
router.post("/chats/ban", function(req, res) {

})
router.post("/chats/kick", function(req, res) {

})
router.post("/chats/timeout", function(req, res) {

})
router.get("/chats/list", function(req, res) {
  limit = req.query.limit || 50;
  if(!req.query.room) {
    res.status(500).send({
      message: "Missing room!"
    })
    return;
  } else {
    room = req.query.room
  }
  var query = Chat
    .find({ room: room })
    .sort({ 'date': -1 })
    .limit(limit)
    .exec(function(err, chat) {
      if(!err) {
        res.status(200).send(chat)
      } else {
        res.status(500).send({
          message: "Internal Server Error!"
        });
      }
    });
})


console.log("loaded router")

module.exports = router;
