const express = require('express');
const path = require('path');
const app = express();
const port = 5000; // you can change the port if needed

// Serve static files from the 'public' folder
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// API route to return products
app.get('/api/products', (req, res) => {
  res.json(require('./db.json').products);
});

// Example root route
app.get('/', (req, res) => {
  res.send('Backend is running...');
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
