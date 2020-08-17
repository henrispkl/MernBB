require('dotenv/config');
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const topicController = express.Router();
const Subcategory = require('../models/Subcategory');
const Topic = require('../models/Topic');
const Post = require('../models/Post');
const User = require('../models/User');

// [/api/topics] /:id
// GET (PUBLIC)
// get info from a single topic
topicController.get('/:id', (req, res) => {
  Topic.findById(req.params.id)
    .then(topic => res.status(200).json({ topic }))
    .catch(err =>
      res.status(400).json({ msg: 'Failed to get info of topic', err })
    );
});

// [/api/topics] /add
// POST (PRIVATE)
// post a new topic
topicController.post('/add', (req, res) => {
  // Create a new topic, a new post then push the id to the subcategory topics array
  // and to the user topics and posts array
  const { title, subtitle, subcategory, author, message } = req.body;
  const newTopicId = new mongoose.Types.ObjectId();
  const newPostId = new mongoose.Types.ObjectId();

  const newTopic = new Topic({
    _id: newTopicId,
    title,
    subtitle,
    subcategory,
    author,
    posts: [newPostId],
    lastpost: newPostId,
  });

  const newPost = new Post({
    _id: newPostId,
    message,
    author,
    topic: newTopicId,
  });

  newTopic
    .save()
    .then(() => {
      return newPost.save();
    })
    .then(() => {
      return Subcategory.findByIdAndUpdate(
        subcategory,
        {
          $push: { topics: newTopicId },
        },
        { useFindAndModify: false }
      );
    })
    .then(() => {
      return User.findByIdAndUpdate(
        author,
        {
          $push: { posts: newPostId, topics: newTopicId },
        },
        { useFindAndModify: false }
      );
    })
    .then(() => res.status(200).send({ topic: newTopic }))
    .catch(err => res.json({ msg: 'Failed to add a new topic', err }));
});

// [/api/topics] /update
// POST (PRIVATE)
// update a topic
topicController.post('/update', (req, res) => {
  Topic.findByIdAndUpdate(req.body.id, req.body, {
    useFindAndModify: false,
  })
    .then(topic => res.status(200).json({ msg: 'Topic updated', topic }))
    .catch(err => res.status(400).json({ msg: 'Failed to update topic', err }));
});

// [/api/topics] /delete
// DELETE (PRIVATE)
// delete a topic
topicController.post('/delete', (req, res) => {
  const { id } = req.body;

  Topic.findByIdAndDelete(id)
    .then(topic => {
      Post.deleteMany({ topic: id })
        .then(() => {
          return User.updateMany(
            { posts: { $in: topic.posts }, topics: id },
            { $pullAll: { posts: topic.posts }, $pull: { topics: id } }
          );
        })
        .then(() => {
          res.status(200).send({ topic });
        });
    })
    .catch(err => res.status(400).json({ msg: 'Failed to delete topic', err }));
});

module.exports = topicController;
