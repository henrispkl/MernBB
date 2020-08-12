require('dotenv/config');
const async = require('async');
const express = require('express');

const categoryController = express.Router();
const Category = require('../models/Category');
const Topic = require('../models/Topic');
const Post = require('../models/Post');

// [/api/categories] /
// GET (PUBLIC)
// retrieve all categories with all info
categoryController.get('/', (req, res) => {
  Category.find()
    .lean()
    .populate('subcategories', 'name description')
    .then(categories => {
      // Loop through each category
      categories.forEach(category => {
        // Loop through each subcategory
        async.each(
          category.subcategories,
          (subcategory, callback) => {
            // Find the most recent topic and get only the last (most recent) element from the posts array
            Topic.findOne({ subcategory: subcategory._id })
              .sort({ createdAt: -1 })
              .populate({
                path: 'lastpost',
                select: '-message',
                populate: {
                  path: 'author',
                  select: 'username',
                },
              })
              .lean()
              .then(topic => {
                subcategory.lastpost = topic.lastpost;
                Topic.countDocuments({
                  subcategory: subcategory._id,
                })
                  .then(topicCount => {
                    subcategory.topics = topicCount;
                    return Post.find({ topic: topic._id }, 'topic')
                      .populate({
                        path: 'topic',
                        select: '_id',
                      })
                      .lean();
                  })
                  .then(posts => {
                    subcategory.posts = posts.length;
                    callback();
                  })
                  .catch(err => {
                    callback(err);
                  });
              })
              .catch(err => {
                callback(err);
              });
          },
          err => {
            if (err) {
              res
                .status(400)
                .json({ msg: 'Failed to retrieve categories', err });
            } else {
              res.status(200).json({ categories });
            }
          }
        );
      });
    });
});

// [/api/categories] /:id
// GET (PUBLIC)
// get info from a single category
categoryController.get('/:id', (req, res) => {
  Category.findById(req.params.id)
    .then(category => res.status(200).json({ category }))
    .catch(err =>
      res.status(400).json({ msg: 'Failed to get info of category', err })
    );
});

// [/api/categories] /add
// POST (PRIVATE)
// add a new category
categoryController.post('/add', (req, res) => {
  const { name } = req.body;
  const newCategory = new Category({
    name,
  });

  newCategory
    .save()
    .then(category => res.status(200).json({ category }))
    .catch(err => res.json({ msg: 'Failed to add a new category', err }));
});

// [/api/categories] /update
// POST (PRIVATE)
// update a category
categoryController.post('/update', (req, res) => {
  Category.findByIdAndUpdate(req.body.id, req.body, {
    useFindAndModify: false,
  })
    .then(category =>
      res.status(200).json({ msg: 'Category updated', category })
    )
    .catch(err =>
      res.status(400).json({ msg: 'Failed to update category', err })
    );
});

// [/api/categories] /delete
// DELETE (PRIVATE)
// delete a category
categoryController.post('/delete', (req, res) => {
  Category.findByIdAndDelete(req.body.id)
    .then(() => res.status(200).json({ msg: 'Category deleted' }))
    .catch(err =>
      res.status(400).json({ msg: 'Failed to delete category', err })
    );
});

module.exports = categoryController;
