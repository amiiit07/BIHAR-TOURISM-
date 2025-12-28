//adventure 
const express = require("express");
const router = express.Router();
const Destination = require("../models/Destination");

// Sample Data (You can replace with your actual data)
const seedData = [
  {
    name: "Hot Air Balloon Ride",
    description: "Amazing sky adventure in Rajgir",
    price: 2000,
    image: "/images/adventure1.jpg"
  },
  {
    name: "Kaimur Hills Trek",
    description: "Best trekking experience in Bihar",
    price: 0,
    image: "/images/adventure2.jpg"
  }
];

// Route to insert data
router.get("/seed-destinations", async (req, res) => {
  try {
    await Destination.deleteMany({});
    await Destination.insertMany(seedData);

    res.send("Destinations Seeded Successfully!");
  } catch (err) {
    res.status(500).send("Error Seeding Data");
    console.log(err);
  }
});

module.exports = router;
