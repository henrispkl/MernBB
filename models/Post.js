const mongoose = require('mongoose');
const shortid = require('shortid');

const postSchema = new mongoose.Schema(
  {
    shortid: {
      type: String,
      unique: true,
      default: shortid.generate,
    },
    message: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
