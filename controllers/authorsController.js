const express = require('express');
const router = express.Router();
const db = require('../models');

// CURRENT PATH === '/authors'


// GET all Authors (Index)
router.get('/', (req, res) => {
  // Get All Authors in DB
  db.Author.find({}, (err, allAuthors) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    const context = {
      authorsData: allAuthors,
    };

    res.render('authors/authorsIndex', context);

  });
});


// GET New Author Form
router.get('/new', (req, res) => {
  res.render('authors/authorsNew');
});

// POST New Author From New Author Form
router.post('/', (req, res) => {
  console.log(req.body);
  // Create a new Author Object in MongoDB
  db.Author.create(req.body, (err, newAuthor) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    res.redirect('/authors');
  });
});

module.exports = router;
