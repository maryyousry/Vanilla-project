const express = require('express');
const path = require('path');
const app = express();
const port = 5000; // You can use your preferred port number

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Example route (optional, if you want to return some data)
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Other routes (for API, for example)
app.get('/api/products', (req, res) => {
  res.json(require('./db.json').products);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
