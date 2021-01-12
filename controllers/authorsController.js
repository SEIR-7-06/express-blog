const express = require('express');
const router = express.Router();

// CURRENT PATH === '/authors'


// GET all Authors (Index)
router.get('/', (req, res) => {
  res.render('authors/authorsIndex');
});


// GET New Author Form
router.get('/new', (req, res) => {
  res.render('authors/authorsNew');
});

// POST New Author From New Author Form
router.post('/', (req, res) => {
  console.log(req.body);
});

module.exports = router;
