require('dotenv/config');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = process.env.JWT_SECRET || 'mernBB-default-secret';
const passport = require('passport');

const userController = express.Router();
const User = require('../models/User');
const UserGroup = require('../models/UserGroup');

// [/api/users] /
// GET (PUBLIC)
// retrieve all users
userController.get('/', (req, res) => {
  User.find()
    .select('-password')
    .populate('usergroup')
    .then(users => {
      res.status(200).json({
        users,
      });
    });
});

// [/api/users] /:id
// GET (PUBLIC)
// get info from a single user
userController.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .select('-password')
    .then(user => res.status(200).json({ user }))
    .catch(err =>
      res.status(400).json({ msg: 'Failed to get info of user', err })
    );
});

// [/api/users] /update
// POST (PRIVATE)
// update an user
userController.post('/update', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findByIdAndUpdate(req.body.id, req.body, {
    useFindAndModify: false,
  })
    .then(user => res.status(200).json({ msg: 'User updated', user }))
    .catch(err => res.status(400).json({ msg: 'Failed to update user', err }));
});

// [/api/users] /delete
// DELETE (PRIVATE)
// delete an user
userController.post('/delete',passport.authenticate('jwt', {session: false}),  (req, res) => {
  User.findByIdAndDelete(req.body.id)
    .then(() => res.status(200).json({ msg: 'User deleted' }))
    .catch(err => res.status(400).json({ msg: 'Failed to delete user', err }));
});

// Authentication routes

// [/api/users] /register
// POST (PUBLIC)
// register a new user
userController.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  User.findOne({ email }).then(user => {
    UserGroup.findOne({ auth_level: 2 }).then(usergroup => {
      if (user) {
        return res.status(400).json({ msg: 'Email already in use.' });
      } else {
        const newUser = new User({
          username,
          email,
          password,
          usergroup: usergroup._id,
        });

        bcrypt.genSalt(10, (genErr, salt) => {
          if (genErr) throw genErr;
          bcrypt.hash(newUser.password, salt, (hashErr, hash) => {
            if (hashErr) throw hashErr;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.status(200).json({ user }))
              .catch(err =>
                res.status(400).json({ msg: 'Failed to register user.', err })
              );
          });
        });
      }
    });
  });
});

// [/api/users] /login
// POST (PUBLIC)
// login a user
userController.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ msg: 'This user does not exists.' });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user._id,
          username: user.username,
        };

        jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
          if (err) {
            res.status(500).json({ msg: 'Error signing token.', err });
          }

          res.status(200).json({
            success: true,
            token,
            user: {
              id: user._id,
              username: user.username,
              email: user.email,
            },
          });
        });
      } else {
        res.status(400).json({ msg: 'Password is incorrect.' });
      }
    });
  });
});

// [/api/users] /setgroup
// POST (PRIVATE)
// set a usergroup

module.exports = userController;
