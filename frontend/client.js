const express = require('express');
const path = require('path');
const app = express();

// Serve the static files from the React app build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle any requests by sending back the index.html of the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
