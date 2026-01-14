const express = require('express');
const app = express();

const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cors = require('cors');
const env = require('dotenv');
env.config();

const db_url = process.env.MONGO_URL;
const port = process.env.PORT;


// ------------------- ROUTES IMPORT -------------------
const destinationRoutes = require('./routes/destinations');
const placeRoutes = require('./routes/places');
const cultureRoute = require('./routes/culture');
const cuisineRoute = require('./routes/cuisine');
const cmRoute = require('./routes/cm');
const welcomeRoutes = require('./routes/welcome');
const safetyRoutes = require('./routes/safety');
const seedRoute = require("./routes/seed");
const blogRoutes = require("./routes/blog");



// ------------------- MIDDLEWARE -------------------
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.set('view engine', 'ejs');


// ------------------- MONGO CONNECTION -------------------
mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


// ------------------- ADVENTURE DATA -------------------
const adventures = [
  { title: "Hot Air Balloon Ride", location: "Rajgir", image: "/images/adventure1.jpg" },
  { title: "Kaimur Hills Trek", location: "Kaimur", image: "/images/adventure2.jpg" },
  { title: "River Rafting", location: "Ganga, Patna", image: "/images/adventure3.jpg" },
  { title: "Wildlife Safari", location: "Valmiki Tiger Reserve", image: "/images/adventure4.jpg" },
  { title: "Rajgir Glass Bridge", location: "Rajgir, Nalanda", image: "/images/adventure5.jpg" },
  { title: "Asia’s Longest Ropeway Ride", location: "Rajgir, Nalanda", image: "/images/adventure6.jpg" },
  { title: "Bodh Gaya Hill Trek Experience", location: "Dungeshwari Hills, Gaya", image: "/images/adventure7.jpg" },
  { title: "Wild Jungle Trek", location: "Bhimbandh Wildlife Sanctuary, Munger", image: "/images/adventure8.jpg" }
];


// ------------------- GLOBAL VARIABLE MIDDLEWARE -------------------
app.use((req, res, next) => {
  res.locals.success = null;
  res.locals.error = null;
  res.locals.user = req.user || null;
  next();
});


// ------------------- ROUTES -------------------
app.use('/places', placeRoutes);
app.use('/destinations', destinationRoutes);   // ⭐ IMPORTANT ROUTE (Details page works here)
app.use('/culture', cultureRoute);
app.use('/cuisine', cuisineRoute);
app.use('/cm', cmRoute);
app.use('/welcome', welcomeRoutes);
app.use('/safety', safetyRoutes);
//app.use("/", seedRoute);
app.use("/blog", blogRoutes);

// ❌ REMOVE old mahavirmandir route
// app.use('/mahavir-mandir-patna', mahavirmandirRoutes);


// ------------------- STATIC PAGES -------------------
app.get('/', (req, res) => {
  res.render('index', { adventures });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});


// ------------------- ERROR HANDLER -------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


// ------------------- SERVER START -------------------
app.listen(port, () => {
  console.log(`server is connected on port ${port}`);
});
