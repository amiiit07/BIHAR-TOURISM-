const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');


// ⬅️ GET All Destinations (MAIN PAGE)
router.get('/', async (req, res) => {
    try {
        const destinations = await Destination.find();

        // Debug to confirm DB result
        console.log("DESTINATIONS FROM DB:", destinations);

        res.render('destination', { destinations });
    } catch (err) {
        console.log("Error fetching destinations:", err);
        res.status(500).send("Server Error");
    }
});


// ⬅️ ADMIN — Display all places
router.get('/admin', async (req, res, next) => {
    try {
        const destinations = await Destination.find();
        res.render('admin/dashboard', { destinations });
    } catch (err) {
        console.error("Admin error:", err);
        next(err);
    }
});


// ⬅️ ADMIN — Add New Form
router.get('/admin/new', (req, res) => {
    res.render('admin/new');
});


// ⬅️ ADMIN — Create New Destination
router.post('/', async (req, res) => {
    const { name, description, image, price } = req.body;
    await Destination.create({ name, description, image, price });
    res.redirect('/destinations/admin');
});


// ⬅️ ADMIN — Edit Form
router.get('/admin/:id/edit', async (req, res) => {
    const { id } = req.params;
    const destination = await Destination.findById(id);
    res.render('admin/edit', { destination });
});


// ⬅️ ADMIN — Update Destination
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, image, price } = req.body;
    await Destination.findByIdAndUpdate(id, { name, description, image, price });
    res.redirect('/destinations/admin');
});


// ⬅️ ADMIN — Delete Destination
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Destination.findByIdAndDelete(id);
    res.redirect('/destinations/admin');
});


module.exports = router;
