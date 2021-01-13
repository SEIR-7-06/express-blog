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

// GET One Author By ID (Show)
router.get('/:id', (req, res) => {
  // Query the DB to find author by ID, then res with template and data
  const authorId = req.params.id;

  db.Author.findById(authorId, (err, foundAuthor) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    console.log('foundAuthor:', foundAuthor);

    const context = {
      authorData: foundAuthor,
    }

    res.render('authors/authorsShow', context);
  });
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

// GET An Author By ID with Form (Edit)
router.get('/:id/edit', (req, res) => {
  db.Author.findById(req.params.id, (err, foundAuthor) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    const context = {
      authorData: foundAuthor,
    };

    res.render('authors/authorsEdit', context);
  });
});

// PUT Update Author By ID
router.put('/:id', (req, res) => {
  db.Author.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, updatedAuthor) => {
      if (err) {
        console.log(err);
        return res.send(err);
      }

      res.redirect('/authors');
    }
  );
});

// DELETE One Author By ID
router.delete('/:id', (req, res) => {
  db.Author.findByIdAndDelete(req.params.id, (err, deletedAuthor) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    res.redirect('/authors');
  });
});

module.exports = router;
