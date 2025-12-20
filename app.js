const express = require('express');
const app = express(); 

const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
dotenv.config();



// Routes
const destinationRoutes = require('./routes/destinations');
const placeRoutes = require('./routes/places');
const cultureRoute = require('./routes/culture');
const cuisineRoute = require('./routes/cuisine');

// Optional: If you're using Passport
// const passport = require('passport');
// require('./config/passport')(passport);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bihartourism', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.set('view engine', 'ejs');

// SESSION + PASSPORT SETUP (if you use it)
// app.use(require('express-session')({
//     secret: 'secretkey',
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());

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
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
