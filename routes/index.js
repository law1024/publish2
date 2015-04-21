var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {
    title: 'Publish - less is more'
  };

  res.render('index', data);
});

module.exports = router;
