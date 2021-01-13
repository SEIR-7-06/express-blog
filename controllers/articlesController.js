const express = require('express');
const router = express.Router();
const db = require('../models');

// CURRENT PATH === '/articles'


// GET all Articles (Index)
router.get('/', (req, res) => {
  // Get All Articles in DB
  db.Article.find({}, (err, allArticles) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    const context = {
      articlesData: allArticles,
    };

    res.render('articles/articlesIndex', context);

  });
});


// GET New Article Form
router.get('/new', (req, res) => {
  res.render('articles/articlesNew');
});

// GET One Article By ID (Show)
router.get('/:id', (req, res) => {
  // Query the DB to find article by ID, then res with template and data
  const articleId = req.params.id;

  db.Article.findById(articleId, (err, foundArticle) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    const context = {
      articleData: foundArticle,
    }

    res.render('articles/articlesShow', context);
  });
});


// POST New Article From New Article Form
router.post('/', (req, res) => {
  console.log(req.body);
  // Create a new Article Object in MongoDB
  db.Article.create(req.body, (err, newArticle) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    res.redirect('/articles');
  });
});

// GET An Article By ID with Form (Edit)
router.get('/:id/edit', (req, res) => {
  db.Article.findById(req.params.id, (err, foundArticle) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    const context = {
      articleData: foundArticle,
    };

    res.render('articles/articlesEdit', context);
  });
});

// PUT Update Article By ID
router.put('/:id', (req, res) => {
  db.Article.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, updatedArticle) => {
      if (err) {
        console.log(err);
        return res.send(err);
      }

      res.redirect('/articles');
    }
  );
});

// DELETE One Article By ID
router.delete('/:id', (req, res) => {
  db.Article.findByIdAndDelete(req.params.id, (err, deletedArticle) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    res.redirect('/articles');
  });
});

module.exports = router;
