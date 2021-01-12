const express = require('express');
const bodyParser = require('body-parser');
const authorsController = require('./controllers/authorsController');
const app = express();
const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs');


// BodyParser - put request data on req.body
app.use(bodyParser.urlencoded({extended: false}));

//------------------------ ROUTES


// Home Page
app.get('/', (req, res) => {
  res.render('index');
});

app.use('/authors', authorsController);


// Start Server Listener
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
