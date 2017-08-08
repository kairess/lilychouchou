var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/script', function(req, res, next) {
    var playscript = require('../playscripts/01kyomei.json');

    res.json(playscript);
});

module.exports = router;