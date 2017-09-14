var express = require('express');
var router = express.Router();
var square = require('../square-response');

/* get callback from square pos. */
router.get('/callback', function(req, res, next) {
    var data = JSON.parse(req.query.data);
    var squareResponse = new square(data);
    res.render('callback', { status: squareResponse.isSuccess(), errorMessage: squareResponse.getErrorMessage() });
});

module.exports = router;