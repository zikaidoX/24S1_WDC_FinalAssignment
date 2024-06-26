var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.sendFile('home.html', { root: 'public' });
});

/* GET Trips page. */
router.get('/trip', function(req, res, next) {
  res.sendFile('trip.html', { root: 'public' });
});

/* GET feedback page. */
router.get('/feedback', function(req, res, next) {
  res.sendFile('feedback.html', { root: 'public' });
});

/* GET show feedback page. */
router.get('/show-feedback', function(req, res, next) {
  res.sendFile('feedback_shown.html', { root: 'public' });
});

/* GET feedback manager page. */
router.get('/manager', function(req, res, next) {
  res.sendFile('manager.html', { root: 'public' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.sendFile('about.html', { root: 'public' });
});

module.exports = router;