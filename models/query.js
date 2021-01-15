/* *******************************************************
This file shows example of making a query to the Mongo DB
once you've set up the relationships between your models.
This does not need to be in your project.
*********************************************************/

const mongoose = require('mongoose');
const db = require('./');

const newAuthor = {
  name: 'John Steinbeck',
  articles: []
};

const newArticle = {
  title: 'Shiny Object Found in the Desert',
  body: 'Qadsfasdf  asdf asdf asdfasdfsafsaf.'
}

// Creating new Author
db.Author.create(newAuthor, (err, createdAuthor) => {
  if (err) console.log(err);

  console.log('createdAuthor:', createdAuthor);

  newArticle.author = createdAuthor._id;

  // Creating a new Article associated with our new Author
  db.Article.create(newArticle, (err, createdArticle) => {
    if (err) console.log(err);

    console.log('createdArticle:', createdArticle);
  })
});