require('dotenv/config');
const express = require('express');
const passport = require('passport');

const subcategoryController = express.Router();
const Subcategory = require('../models/Subcategory');
const Category = require('../models/Category');

// [/api/subcategories] /
// GET (PUBLIC)
// retrieve all subcategories
subcategoryController.get('/', (req, res) => {
  Subcategory.find()
    .populate('topics')
    .populate('topics.posts')
    .then(subcategories => {
      res.status(200).json(subcategories);
    });
});

// [/api/subcategories] /:id
// GET (PUBLIC)
// get basic info from a single subcategory
subcategoryController.get('/:id', (req, res) => {
  Subcategory.findById(req.params.id)
    .then(subcategory => res.status(200).json({ subcategory }))
    .catch(err =>
      res.status(400).json({ msg: 'Failed to get info of subcategory', err })
    );
});

// [/api/subcategories] /:id/topics
// GET (PUBLIC)
// get all topics from a subcategory
subcategoryController.get('/:id/topics', (req, res) => {
  Subcategory.findById(req.params.id)
    .populate('topics')
    .then(subcategory => res.status(200).json({ topics: subcategory.topics }))
    .catch(err =>
      res.status(400).json({ msg: 'Failed to get info of subcategory', err })
    );
});

// [/api/subcategories] /add
// POST (PRIVATE)
// add a new subcategory
subcategoryController.post('/add', (req, res) => {
  const { name, description, category } = req.body;
  const newSubcategory = new Subcategory({
    name,
    description,
    category,
  });

  newSubcategory
    .save()
    .then(subcategory => {
      Category.findById(category).then(c => {
        c.subcategories.push(newSubcategory);
        c.save().then(() => {
          res.status(200).json({ subcategory });
        });
      });
    })
    .catch(err => res.json({ msg: 'Failed to add a new subcategory', err }));
});

// [/api/subcategories] /update
// POST (PRIVATE)
// update a subcategory
subcategoryController.post('/update', (req, res) => {
  Subcategory.findByIdAndUpdate(req.body.id, req.body, {
    useFindAndModify: false,
  })
    .then(subcategory => res.status(200).json({ msg: 'Subcategory updated', subcategory }))
    .catch(err =>
      res.status(400).json({ msg: 'Failed to update subcategory', err })
    );
});

// [/api/subcategories] /delete
// DELETE (PRIVATE)
// delete a subcategory
subcategoryController.post('/delete', (req, res) => {
  Subcategory.findByIdAndDelete(req.body.id)
    .then(() => res.status(200).json({ msg: 'Subcategory deleted' }))
    .catch(err =>
      res.status(400).json({ msg: 'Failed to delete subcategory', err })
    );
});

module.exports = subcategoryController;
