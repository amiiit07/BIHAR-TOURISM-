const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('cuisine', {
    title: 'Bihari Cuisine',
    user: req.user || null
  });
});

module.exports = router;