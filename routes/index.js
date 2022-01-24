var express = require('express');
var router = express.Router();

router.use(require('./inventory'));
router.use(require('./transaction'));

module.exports = router;
