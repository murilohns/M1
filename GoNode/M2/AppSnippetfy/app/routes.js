const express = require('express');

const routes = express.Router();
const authMiddleware = require('./middlewares/auth');
const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController.js');

routes.use('/app', authMiddleware);

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

routes.get('/', authController.signin);
routes.get('/signup', authController.signup);
routes.get('/signout', authController.signout);

routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

routes.get('/app/dashboard', dashboardController.index);

module.exports = routes;
