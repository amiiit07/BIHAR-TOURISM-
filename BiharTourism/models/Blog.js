const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    image: { type: String },
    content: { type: String, required: true },
    tags: [String],
    createdAt: { type: Date, default: Date.now }
});

// Auto-generate slug from title
blogSchema.pre("save", function (next) {
    this.slug = this.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    next();
});

module.exports = mongoose.model("Blog", blogSchema);
