const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;


// Start Server Listener
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
