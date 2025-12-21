
const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,   // unique identifier for URL
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 1000, // optional limit
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/600x400?text=No+Image", 
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ]
}, { timestamps: true });

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

module.exports = Place;


