// D:\BiharTourism\middleware\auth.js

function auth(req, res, next) {
  console.log('Auth middleware triggered');
  next();
}

module.exports = auth;
