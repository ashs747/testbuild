var config = require('../config');
var param = require('jquery-param');
var superagent = require('superagent');
var superagentPromise = require('superagent-promise')(superagent, Promise);
var intercept = require('superagent-intercept')(function(err, res) {
  // global error handling

  // ensure the response is parsed as JSON for non application/json response
  // content-types. For IE 8 and 9 and CORS (xdomain.js) the response content-type
  // has to be text/html, therefore the below will ensure it is still parsed as JSON.
  if (!res.body && res.text) {
    var rawText = res.text.trim();

    if (rawText.charAt(0) == '{' || rawText.charAt(0) == '[')
      res.body = JSON.parse(res.text);
  }
});

function decorateRequest(req) {
  if (req.url.indexOf('http') !== 0)
    req.url = config.api.url + req.url;

  if (config.api.authToken)
    req.set('Authorization', 'Bearer ' + config.api.authToken)

  return req.type('json').use(intercept);
}

var request = function(method, url) {
  return decorateRequest(superagentPromise(method, url));
};

request.get = function(url, data) {
  return decorateRequest(superagentPromise.get(url, param(data)));
};

request.post = function(url, data) {
  return decorateRequest(superagentPromise.post(url, data));
};

request.put = function(url, data) {
  return decorateRequest(superagentPromise.put(url, data));
};

request.patch = function(url, data) {
  return decorateRequest(superagentPromise.patch(url, data));
};

request.head = function(url, data) {
  return decorateRequest(superagentPromise.head(url, data));
};

request.options = function(url) {
  return decorateRequest(superagentPromise.options(url));
};

request.del = function(url) {
  return decorateRequest(superagentPromise.del(url));
};

module.exports = request;
