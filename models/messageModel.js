'use strict';

const mongoose    = require('mongoose')
    , User        = require('../models/userModel')
    , moment      = require('moment')
    , async       = require('async');

let Schema = mongoose.Schema;

let Message;

let messageSchema = mongoose.Schema({
  to: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  from: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  content:{type: String, required: true},
  createdAt: {type: String}
});

messageSchema.statics.addMessage = function(message, foundUsers, cb) {
  let newMessage = new Message ({
    to: message.to,
    from: message.from,
    content: message.content,
    createdAt: moment().format('llll')
  });

  newMessage.save((err, savedNewMessage) => {
    if (err || !savedNewMessage) return cb(err || "savedNewMessage is empty");
    let createdMessage = {
      toUserId: message.to,
      fromUserId: message.from,
      content: message.content,
      createdAt: message.createdAt,
      toUserName: foundUsers.toUserName,
      toUserEmail: foundUsers.toUserEmail,
      fromUserName: foundUsers.fromUserName,
      fromUserEmail: foundUsers.fromUserEmail
    }

  //add mailgun to receiver here

    cb(err, createdMessage);
  });
}

messageSchema.statics.getAllMessages = function(cb) {
  Message.find({}).populate('to from').exec((err, messages) => {
    if (err || !messages) return cb(err || 'messages not found')
    return cb(null, messages);
  });
}

Message = mongoose.model('Message', messageSchema);
module.exports = Message;
