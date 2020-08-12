require('dotenv/config');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');

const secret = process.env.JWT_SECRET || 'mernBB-default-secret';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

// this sets how to handle tokens coming from the requests that come
// and defines the key to be used when verifying the token.

module.exports = passport => {
  passport.use(
    new Strategy(options, (payload, done) => {
      User.findById(payload.id)
        .populate('usergroup')
        .then(user => {
          if (user) {
            return done(null, {
              id: user.id,
              username: user.username,
              email: user.email,
              auth_level: user.usergroup.auth_level,
            });
          } else {
            done(null, false);
          }
        })
        .catch(err => console.log(err));
    })
  );
};
