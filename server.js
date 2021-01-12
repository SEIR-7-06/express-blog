const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs');

//------------------------ ROUTES
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/authors', (req, res) => {
  res.render('authors/authorsIndex');
});

// Start Server Listener
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
