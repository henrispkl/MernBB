require('dotenv/config');
const express = require('express');
const passport = require('passport');

const postController = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const Topic = require('../models/Topic');

// [/api/posts] /:id
// GET (PUBLIC)
// get info from a single post
postController.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.status(200).json({ post }))
    .catch(err =>
      res.status(400).json({ msg: 'Failed to get info of post', err })
    );
});

// [/api/posts] /add
// POST (PRIVATE)
// create a new post
postController.post('/add', (req, res) => {
  const { message, author, topic } = req.body;
  const newPost = new Post({
    message,
    author,
    topic,
  });

  newPost
    .save()
    .then(post => {
      User.findByIdAndUpdate(
        author,
        { $push: { posts: post._id } },
        { useFindAndModify: false }
      )
        .then(() => {
          return Topic.findByIdAndUpdate(
            topic,
            { $set: { lastpost: post._id }, $push: { posts: post._id } },
            { useFindAndModify: false }
          );
        })
        .then(() => {
          return res.status(200).json({ post });
        });
    })
    .catch(err => res.json({ msg: 'Failed to add a new post', err }));
});

// [/api/posts] /update
// POST (PRIVATE)
// update a post
postController.post('/update', (req, res) => {
  Post.findByIdAndUpdate(req.body.id, req.body, {
    useFindAndModify: false,
  })
    .then(post => res.status(200).json({ msg: 'Post updated', post }))
    .catch(err => res.status(400).json({ msg: 'Failed to update post', err }));
});

// [/api/posts] /delete
// DELETE (PRIVATE)
// delete a post
postController.post('/delete', (req, res) => {
  Post.findByIdAndDelete(req.body.id)
    .then(post => {
      User.findByIdAndUpdate(
        post.author,
        { $pull: { posts: post._id } },
        { useFindAndModify: false }
      )
        .then(() => {
          return Topic.findByIdAndUpdate(
            post.topic,
            { $pull: { posts: post._id } },
            { useFindAndModify: false }
          );
        })
        .then(() => {
          return res.status(200).json({ msg: 'Post deleted' });
        });
    })
    .catch(err => res.status(400).json({ msg: 'Failed to delete post', err }));
});

module.exports = postController;
