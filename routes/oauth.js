var express = require('express');
var router = express.Router();
var consumerData = require('../models/consumerData');

/* GET SF OAuth page. */
router.get('/sfOauth', function(req, res, next) {
  res.render('sfOauth', { title: 'Canvas Starter Kit - SF OAuth Page' });
});

/* GET SF OAuth page. */
router.get('/sfOauthCallback', function(req, res, next) {
  res.render('sfOauthCallback', { title: 'Canvas Starter Kit - SF OAuth Callback Page' });
});

/* GET consumer data key and url. */
router.get('/consumerData', function(req, res, next) {
  res.json(consumerData);
});

module.exports = router;
