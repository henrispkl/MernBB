require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');

const topicController = express.Router();
const Subcategory = require('../models/Subcategory');
const Topic = require('../models/Topic');
const Post = require('../models/Post');
const User = require('../models/User');

// [/api/topics] /:id
// GET (PUBLIC)
// get info from a single topic
topicController.get('/', (req, res) => {
  const { id = null, sid = null, page = 1, limit = 10 } = req.query;
  const queryParams = {};
  let topicResult = {};

  if (id) {
    queryParams._id = id;
  } else if (sid) {
    queryParams.shortid = sid;
  }

  Topic.findOne({ ...queryParams })
    .populate({
      path: 'posts',
      options: {
        limit,
        skip: (page - 1) * limit,
        sort: { createdAt: 1 },
      },
      populate: {
        path: 'author',
        select: '-password',
        populate: {
          path: 'usergroup',
          select: '-users',
        },
      },
    })
    .lean()
    .then(topic => {
      topicResult = { ...topic, currentPage: page };
      topicResult.posts.forEach(post => {
        const topicCount = post.author.topics.length;
        const postCount = post.author.posts.length;

        post.author.topicCount = topicCount;
        post.author.postCount = postCount;
      });
      return Post.countDocuments({ topic: topic._id });
    })
    .then(count => {
      topicResult.totalPages = Math.ceil(count / limit);
      return res.status(200).json(topicResult);
    })
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
