var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/m/:music', function(req, res, next) {
    var playscript = require(`../playscripts/${req.params.music}.json`);

    res.render('music', {
        title: playscript.title,
        music: req.params.music
    });
});

router.get('/script/:music', function(req, res, next) {
    var playscript = require(`../playscripts/${req.params.music}.json`);

    res.json(playscript);
});

module.exports = router;