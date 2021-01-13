const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const authorsController = require('./controllers/authorsController');
const articlesController = require('./controllers/articlesController');
const app = express();
const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs');


// BodyParser - put request data on req.body
app.use(bodyParser.urlencoded({extended: false}));

// Method-Override - Allows us to change reqs methods from GET/POST to PUT and DELETE
app.use(methodOverride('_method'));

//------------------------ ROUTES


// Home Page
app.get('/', (req, res) => {
  res.render('index');
});

app.use('/authors', authorsController);
app.use('/articles', articlesController);


// Start Server Listener
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
