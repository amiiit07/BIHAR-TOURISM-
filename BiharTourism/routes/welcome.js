const express = require('express');
const router = express.Router();

// GET /welcome  -> renders the Welcome to Bihar page
router.get('/', (req, res) => {
  res.render('welcome', { title: 'Welcome to Bihar' });
});

module.exports = router;
