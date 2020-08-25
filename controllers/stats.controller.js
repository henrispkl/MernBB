const express = require('express');

const statsController = express.Router();
const Topic = require('../models/Topic');
const Post = require('../models/Post');
const User = require('../models/User');

statsController.get('/', (req, res) => {
  const result = {};
  Topic.countDocuments()
    .then(topicCount => {
      result.topics = topicCount;
      return Post.countDocuments();
    })
    .then(postCount => {
      result.posts = postCount;
      return User.countDocuments();
    })
    .then(userCount => {
      result.users = userCount;
      return User.findOne().sort({ registerDate: -1 }).lean();
    })
    .then(newestuser => {
      result.newestuser = newestuser.username;
      res.status(200).json(result);
    })
    .catch(err => res.status(400).json({ err }));
});

module.exports = statsController;
