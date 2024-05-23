const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('../controllers/userController');

const app = express();

app.use(bodyParser.json());

// Include the userRoutes for handling routes
app.use('/api', userRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
