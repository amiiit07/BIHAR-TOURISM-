const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');

// All Destinations
router.get('/', async (req, res) => {
    const destinations = await Destination.find();
    res.render('destination', { destinations });
});



// Admin dashboard – all places
router.get('/admin', async (req, res, next) => {
    try {
        const destinations = await Destination.find();
        res.render('admin/dashboard', { destinations });
    } catch (err) {
        console.error("Admin error:", err);
        next(err);  // Sends error to app.js
    }
});


// New form
router.get('/admin/new', (req, res) => {
    res.render('admin/new');
});

// Create new destination
router.post('/', async (req, res) => {
    const { name, location, description, image } = req.body;
    await Destination.create({ name, location, description, image });
    res.redirect('/destinations/admin');
});

// Edit form
router.get('/admin/:id/edit', async (req, res) => {
    const { id } = req.params;
    const destination = await Destination.findById(id);
    res.render('admin/edit', { destination });
});

// Update destination
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, location, description, image } = req.body;
    await Destination.findByIdAndUpdate(id, { name, location, description, image });
    res.redirect('/destinations/admin');
});

// Delete destination
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Destination.findByIdAndDelete(id);
    res.redirect('/destinations/admin');
});


// Search logic
router.get('/', async (req, res) => {
  const { q } = req.query;

  if (q) {
    const regex = new RegExp(q, 'i'); // case-insensitive
    const places = await Place.find({ name: regex });

    if (places.length === 0) {
      return res.render('places/notfound', { query: q });
    }

    res.render('places/searchResults', { places, query: q });
  } else {
    const allPlaces = await Place.find({});
    res.render('destinations/index', { places: allPlaces });
  }
});

module.exports = router;
