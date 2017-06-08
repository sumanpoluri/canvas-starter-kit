var express = require('express');
var base64url = require('base64url');
var crypto = require('crypto');

var router = express.Router();

/* GET canvas page. */
router.get('/', function(req, res, next) {
  var sfdcCanvasAuth = req.query._sfdc_canvas_auth;
  doCanvasCheck(null, sfdcCanvasAuth, req, res, next);
});

/* POST canvas page. */
router.post('/', function(req, res, next) {
  var signedRequest = req.body.signed_request;
  var sfdcCanvasAuth = req.body._sfdc_canvas_auth;
  doCanvasCheck(signedRequest, sfdcCanvasAuth, req, res, next);
});

/* Check for SF Canvas App signatures */
function doCanvasCheck(signedRequest, sfdcCanvasAuth, req, res, next) {
  if (!signedRequest) {
    if (!sfdcCanvasAuth) {
      // No POST or GET, not opened in Salesforce.
      return next(new Error('Error: Signed request not found. App must be invoked using a signed request in Salesforce.'));
    }

    // Received GET instead of signed post means that users must self authorize (org setting)
    // Proceed to Oauth page.
    var loginUrl = req.query.loginUrl;
    res.redirect('/oauth/sfOauth?loginUrl=' + loginUrl);
  }

  var consumerSecret = '<consumer secret for your connected/canvas app>';
  var encodedData = '';
  var sig = '';
  var json = '';
  var data = '';

  // decode the data
  try {
    encodedData = signedRequest.split('.', 2);
    sig = encodedData[0];
    json = base64url.decode(encodedData[1]);
    data = JSON.parse(json);
  } catch (e) {
    return next(new Error('Could not parse signed request. Is the App configured correctly?'));
  }

  // check algorithm - not relevant to error
  if (!data.algorithm || data.algorithm.toUpperCase() != 'HMACSHA256') {
    return next(new Error('Unknown algorithm; expected HMACSHA256. Is the App configured correctly?'));
  }

  var expectedSig = crypto.createHmac('sha256', consumerSecret).update(encodedData[1]).digest('base64');

  if (sig !== expectedSig) {
    return next(new Error('Error: Signed Request Failed. Is the app in Canvas?'));
  }

  // signatures match, proceed to app home page
  res.redirect('/');
}

module.exports = router;
