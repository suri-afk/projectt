const express = require('express');
const router = express.Router();

const data = require('../data/data.json');

/* GET category page. */
router.get('/', function(req, res, next) {
  console.log(data);
  res.render('cat', {
    "title" : "All categories"
  });
});

/* GET category page. */
router.get('/:catname/:test', function(req, res, next) {
  console.log(req.params);
  res.send('ddd');
});

module.exports = router;