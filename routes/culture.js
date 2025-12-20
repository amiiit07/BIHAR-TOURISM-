const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
  res.render('culture', {
    title: 'Culture of Bihar',
    user: req.user || null   // ✅ this avoids undefined errors
  });
});
module.exports = router;