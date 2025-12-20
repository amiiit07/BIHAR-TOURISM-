const express = require("express");
const router = express.Router();

// GET request for Tourist Safety page
router.get("/", (req, res) => {
  res.render("safety"); // this will render safety.ejs
});

module.exports = router;
