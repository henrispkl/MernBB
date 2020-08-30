const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  avatar: {
    type: String,
  },
  usergroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserGroup',
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
  bio: String,
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
