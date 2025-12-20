const express = require('express');
const router = express.Router();
const Place = require('../models/Place');

// Render main places page (no auth)
router.get('/places', (req, res) => {
  res.render('places', { user: req.user }); // You can remove "user: req.user" if not used in view
});

// Show all places
router.get('/', async (req, res) => {
  const places = await Place.find({});
  res.render('places/index', { places });
});

// Form to add new place
router.get('/new', (req, res) => {
  res.render('places/new');
});

// Add new place
router.post('/', async (req, res) => {
  const { name, location, description, image } = req.body;
  const newPlace = new Place({ name, location, description, image });
  await newPlace.save();
  res.redirect('/places');
});

// Show edit form
router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  res.render('places/edit', { place });
});

// Update place
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, location, description, image } = req.body;
  await Place.findByIdAndUpdate(id, { name, location, description, image });
  res.redirect('/places');
});

// Delete place
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Place.findByIdAndDelete(id);
  res.redirect('/places');
});

// Search route
router.get('/search', async (req, res) => {
  const query = req.query.q;

  try {
    const results = await Place.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });

    if (results.length === 0) {
      return res.render('places/notfound', { query });
    }

    res.render('places/searchResults', { query, results });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).send("Error searching places");
  }
});

// Famous place routes
router.get('/mahabodhi-temple', (req, res) => {
  res.render('places/mahabodhi');
});

router.get('/nalanda-university', (req, res) => {
  res.render('places/nalanda');
});

router.get('/vishnupad-temple', (req, res) => {
  res.render('places/vishnupad');
});

router.get('/glass-bridge', (req, res) => {
  res.render('places/glassbridge');
});

router.get('/patna-sahib', (req, res) => {
  res.render('places/patna');
});

router.get('/nitish-kumar', (req, res) => {
  res.render('places/nitish');
});

module.exports = router;
