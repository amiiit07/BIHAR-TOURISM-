const express = require('express');
const app = express(); 

const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cors=require('cors')
const env = require('dotenv');
env.config();

const db_url = process.env.MONGO_URL;
// console.log(db_url)
const port = process.env.PORT



// Routes
const destinationRoutes = require('./routes/destinations');
const placeRoutes = require('./routes/places');
const cultureRoute = require('./routes/culture');
const cuisineRoute = require('./routes/cuisine');

//cm routes
const cmRoute = require("./routes/cm");  
app.use("/cm", cmRoute);  




// Middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.set('view engine', 'ejs');



// MongoDB Connection
mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));




// ✅ Global Variables Middleware
app.use((req, res, next) => {
  res.locals.success = null;
  res.locals.error = null;
  res.locals.user = req.user || null; // ✅ this fixes the `user is not defined` error
  next();
});

// Routes
app.use('/places', placeRoutes);
app.use('/destinations', destinationRoutes);
app.use('/culture', cultureRoute);
app.use('/cuisine', cuisineRoute);
//welcome to bihar
const welcomeRoutes = require('./routes/welcome');
app.use('/welcome', welcomeRoutes);

//tourist safety purpose
const safetyRoutes = require("./routes/safety");
app.use("/safety", safetyRoutes);


// Static Pages
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Server Start
app.listen(port, () => {
    console.log(`server is connected on port ${port}`);
});
