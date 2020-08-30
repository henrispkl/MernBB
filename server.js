require('dotenv/config');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 80;
const controllers = require('./controllers');
const passport = require('passport');
const path = require('path');

// Middleware for JSON body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors middleware
app.use(cors());

// Initialize passport configuration
app.use(passport.initialize());
require('./auth/config')(passport);

// API routes
app.use('/api/users', controllers.userController);
app.use('/api/usergroups', controllers.userGroupController);
app.use('/api/categories', controllers.categoryController);
app.use('/api/subcategories', controllers.subcategoryController);
app.use('/api/topics', controllers.topicController);
app.use('/api/posts', controllers.postController);
app.use('/api/stats', controllers.statsController);


// If no API routes are hit, send the build version of the React client
app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// MongoDB connection
const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
};

connectDb().then(async () => {
  app.listen(port, () => {
    console.log(`mernBB server running on port ${port}`);
  });
});
