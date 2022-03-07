var express = require('express');
var router = express.Router();
const path = require("path");

//if / is accessed, return the index.html file in the public folder
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve('public/index.html') );
});

router.get('/icons/*', function(req, res, next) {
    //Potential for injection!
    //The client will have the ability to access any file in public/icons/
    res.sendFile(path.resolve('public/' + req.url) );
});

router.get('/scripts/*', function(req, res, next) {
    //Potential for injection!
    //The client will have the ability to access any file in public/scripts/
    res.sendFile(path.resolve('public/' + req.url) );
});




module.exports = router;
