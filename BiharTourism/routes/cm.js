const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("cm");   // cm.ejs file render hoga
});

module.exports = router;
