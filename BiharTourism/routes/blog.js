const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();

// SHOW ALL BLOGS
router.get("/", async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render("blog/index", { blogs });
});

// SHOW SINGLE BLOG
router.get("/:slug", async (req, res) => {
    const blog = await Blog.findOne({ slug: req.params.slug });
    res.render("blog/show", { blog });
});

// ADD NEW BLOG (Admin Only)
router.post("/new", async (req, res) => {
    const { title, image, content, tags } = req.body;
    await Blog.create({
        title,
        image,
        content,
        tags: tags.split(",")
    });
    res.redirect("/blog");
});

module.exports = router;
