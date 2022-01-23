var express = require('express');
var router = express.Router();

router.use(require('./inventory'));
router.use(require('./transaction'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.end('OK');
});


module.exports = router;
