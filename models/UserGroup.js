const mongoose = require('mongoose');

const userGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  auth_level: {
    type: Number,
    required: true,
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const UserGroup = mongoose.model('UserGroup', userGroupSchema);

module.exports = UserGroup;
