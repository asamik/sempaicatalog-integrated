'use strict';

const express        = require('express')
    , User           = require('../models/userModel')
    , Message        = require('../models/messageModel')
    , authenticate   = require('../util/authMiddleware')
    , path           = require('path');

let router = express.Router();

//pull username and email (to/from) with id so you can send it back to FE

router.post('/addmessage', (req, res) => {
  User.checkUserForMessage(req.body.to, req.body.from, (err, foundUsers) => {
    if (err || !foundUsers) return res.status(400).send(err || 'Cannot get two users data');
    Message.addMessage(req.body, foundUsers, (err, savedNewMessage) => {
      if (err || !savedNewMessage) return res.status(400).send(err || 'Cannot save new message');
      res.json(savedNewMessage);
    });
  });
});

//get all message @model

router.get('/', (req, res) => {
  Message.getAllMessages((err, messages) => {
    if(err || !messages) return res.status(400).send(err || "Cannot get all messages")
    res.send(messages);  
  });
});

//edit 

module.exports = router;
