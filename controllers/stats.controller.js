const express = require('express');

const statsController = express.Router();
const Topic = require('../models/Topic');
const Post = require('../models/Post');
const User = require('../models/User');

// [/api/stats] /
// GET (PUBLIC)
// get main stats
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
      return Topic.find({}, '-posts').lean().populate('author').sort({ updatedAt: -1 }).limit(10);
    })
    .then(topics => {
      result.activeTopics = topics;
      res.status(200).json(result);
    })
    .catch(err => res.status(400).json({ err }));
});

// [/api/stats] /activity
// GET (PUBLIC)
// get activty from website
statsController.get('/activity', (req, res) => {
  let result = [];
  Post.find()
    .populate({
      path: 'author topic',
      select: '-posts -topics',
      populate: {
        path: 'usergroup',
      },
    })
    .lean()
    .sort({ createdAt: -1 })
    .limit(5)
    .then(posts => {
      posts.forEach(post => {
        post.type = 'post';
      });

      result = [...result, ...posts];
      return Topic.find({}, '-posts')
        .lean()
        .populate({
          path: 'subcategory author',
          select: '-topics -description -posts',
        })
        .sort({ createdAt: -1 })
        .limit(5);
    })
    .then(topics => {
      topics.forEach(topic => {
        topic.type = 'topic';
      });

      result = [...result, ...topics];
      return User.find({}, '-posts -topics')
        .lean()
        .sort({ registerDate: -1 })
        .limit(5);
    })
    .then(users => {
      users.forEach(user => {
        user.type = 'user';
        user.createdAt = user.registerDate;
      });

      result = [...result, ...users];

      result.sort((a, b) => {
        const aDate = new Date(a.createdAt);
        const bDate = new Date(b.createdAt);

        if (aDate.getTime() > bDate.getTime()) {
          return -1;
        } else if (aDate.getTime() < bDate.getTime()) {
          return 1;
        }

        return 0;
      });
      res.status(200).json({ activities: result });
    });
});

module.exports = statsController;
