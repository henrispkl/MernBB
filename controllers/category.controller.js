require('dotenv/config');
const async = require('async');
const express = require('express');
const passport = require('passport');

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
    .populate({
      path: 'subcategories',
      select: '-category',
      populate: {
        path: 'lastpost',
        select: '-message',
        // options: {
        //   sort: {
        //     createdAt: 'desc',
        //   },
        // },
        populate: {
          path: 'author',
          select: '-posts -topics',
        },
      },
    })
    .then(categories => {
      // Loop through each category
      categories.forEach(category => {
        // Loop through each subcategory
        async.each(
          category.subcategories,
          (subcategory, callback) => {
            Topic.countDocuments({
              subcategory: subcategory._id,
            })
              .then(topicCount => {
                subcategory.topics = topicCount;
                subcategory.posts = 0;

                return Topic.find(
                  { subcategory: subcategory._id },
                  'posts'
                ).lean();
              })
              .then(topics => {
                topics.forEach(topic => {
                  subcategory.posts += topic.posts.length;
                });
                callback();
              })
              .catch(err => {
                console.log(err);
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
categoryController.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { name } = req.body;
    const newCategory = new Category({
      name,
    });

    newCategory
      .save()
      .then(category => res.status(200).json({ category }))
      .catch(err => res.json({ msg: 'Failed to add a new category', err }));
  }
);

// [/api/categories] /update
// POST (PRIVATE)
// update a category
categoryController.post(
  '/update',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Category.findByIdAndUpdate(req.body.id, req.body, {
      useFindAndModify: false,
    })
      .then(category =>
        res.status(200).json({ msg: 'Category updated', category })
      )
      .catch(err =>
        res.status(400).json({ msg: 'Failed to update category', err })
      );
  }
);

// [/api/categories] /delete
// DELETE (PRIVATE)
// delete a category
categoryController.post(
  '/delete',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Category.findByIdAndDelete(req.body.id)
      .then(() => res.status(200).json({ msg: 'Category deleted' }))
      .catch(err =>
        res.status(400).json({ msg: 'Failed to delete category', err })
      );
  }
);

module.exports = categoryController;
