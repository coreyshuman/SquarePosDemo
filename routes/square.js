var express = require('express');
var router = express.Router();
var square = require('../square-response');

/* POST callback from square pos. */
router.post('/callback', function(req, res, next) {
    var data = req.body;
    var squareResponse = new square(data);
    res.render('callback', { status: squareResponse.isSuccess(), errorMessage: squareResponse.getErrorMessage() });
});

module.exports = router;