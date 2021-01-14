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
  let context;

  // GET all authors from DB so it can be displayed in the form
  db.Author.find({}, (err, allAuthors) => {
    console.log(allAuthors);

    context = {
      authors: allAuthors
    }

    res.render('articles/articlesNew', context);
  })

});

// GET One Article By ID (Show)
router.get('/:id', (req, res) => {
  // Query the DB to find article by ID, then res with template and data
  const articleId = req.params.id;

  // Get an article by it's id and populate the author data
  db.Article.findById(articleId)
    .populate('author')
    .exec((err, foundArticle) => {
      if (err) {
        console.log(err);
        return res.send(err);
      }

      console.log('author name:', foundArticle.author.name);

      const context = {
        articleData: foundArticle,
      }

      res.render('articles/articlesShow', context);
    });
});


// POST New Article From New Article Form
router.post('/', (req, res) => {
  console.log(req.body);

  // Creates a new Article Object in MongoDB
  db.Article.create(req.body, (err, newArticle) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    // Updates the Author Object by adding the id of the new
    // article in the articles array.
    // Remember, the articles property on author is justan array
    // of author id's
    db.Author.findByIdAndUpdate(
      newArticle.author,
      { $push: { articles: newArticle._id} },
      { new: true },
      (err, updatedAuthor) => {
        if (err) {
          console.log(err);
          return res.send(
            'Apologies for the inconvenience. It looks like there was an error getting your data.'
          );
        }

        console.log('updatedAuthor:', updatedAuthor);

        res.redirect('/articles');
      }
    )

  });
});

// GET An Article By ID with Form (Edit)
router.get('/:id/edit', (req, res) => {
  // Get the article by id.
  // Show the edit form populating the data in the form.
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
  const articleId = req.params.id;

  // Remove an article by its id
  db.Article.findByIdAndDelete(articleId, (err, deletedArticle) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    // Find the author associated with that Article
    // Update the Author by removing an article id
    // from the articles array.
    // Remember, the Author object has an articles property
    // that is just an array of article ids.
    db.Author.findByIdAndUpdate(
      deletedArticle.author,
      { $pull: {articles: deletedArticle._id} },
      { new: true },
      (err, updatedAuthor) => {
        console.log('updatedAuthor:', updatedAuthor);
        res.redirect('/articles');
      }
    )

  });
});

module.exports = router;
