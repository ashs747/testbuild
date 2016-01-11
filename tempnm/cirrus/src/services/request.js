import config from '../configs/appConfig';
import param from 'jquery-param';
import _ from 'underscore';
import moment from 'moment-timezone';
import superagent from 'superagent';
import cookie from 'cookie-cutter';
var superagentPromise = require('superagent-promise')(superagent, Promise);
var Bowser = require('bowser');
var isoDateRegex = new RegExp('^\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d');

function parseResponse(res) {
  // ensure the response is parsed as JSON for non application/json response
  // content-types. For IE 8 and 9 and CORS (xdomain.js) the response content-type
  // has to be text/html, therefore the below will ensure it is still parsed as JSON.
  if (res && !res.body && res.text) {
    var rawText = res.text.trim();

    if (rawText.charAt(0) == '{' || rawText.charAt(0) == '[') {
      res.body = JSON.parse(res.text);
    }
  }
}

function dateToMomentRecur(current) {
  if (_.isObject(current)) {
    Object.keys(current).forEach(key => {
      if (_.isString(current[key]) && isoDateRegex.test(current[key])) {
        current[key] = moment(current[key]);
      } else {
        dateToMomentRecur(current[key]);
      }
    });
  } else if (_.isArray(current)) {
    for (var i = 0; i < current.length; i++) {
      if (_.isString(current[i]) && isoDateRegex.test(current[i])) {
        current[i] = moment(current[i]);
      } else {
        dateToMomentRecur(current[i]);
      }
    }
  }
}

function momentToDateRecur(current) {
  if (_.isObject(current)) {
    Object.keys(current).forEach(key => {
      if (current[key] && current[key]._isAMomentObject) {
        current[key] = current[key].format();
      } else {
        momentToDateRecur(current[key]);
      }
    });
  } else if (_.isArray(current)) {
    for (var i = 0; i < current.length; i++) {
      if (current[i] && current[i]._isAMomentObject) {
        current[i] = current[i].format();
      } else {
        momentToDateRecur(current[i]);
      }
    }
  }
}

function interceptResponse(err, res) {
  if (res) {
    parseResponse(res);
    dateToMomentRecur(res.body);
  }
}

function checkBrowserIsIE8OrLess() {
  return Bowser.browser.msie && Bowser.browser.version <= 8;
}

function addOverrideFlag(data, verb) {
  /*eslint-disable camelcase */
  data.verb_override = verb;
  /*eslint-enable camelcase */
  return data;
}

var intercept = require('superagent-intercept')(interceptResponse);

function decorateRequest(req) {
  var oldEnd = req.end;

  req.end = function() {
    return oldEnd.call(req).then(res => {
      return res.body;
    });
  };

  if (req.url.indexOf('http') !== 0) {
    req.url = config.api.url + req.url;
  }

  if (cookie.get('authToken')) {
    req.set('Authorization', 'Bearer ' + cookie.get('authToken'));
  }

  return req.type('json').use(intercept);
}

var request = function(method, url) {
  return decorateRequest(superagentPromise(method, url));
};

request.get = function(url, data) {
  momentToDateRecur(data);

  return decorateRequest(superagentPromise.get(url, param(data)));
};

request.post = function(url, data) {
  momentToDateRecur(data);

  return decorateRequest(superagentPromise.post(url, data));
};

request.put = function(url, data) {
  if (checkBrowserIsIE8OrLess()) {
    return request.post(url, addOverrideFlag(data, 'PUT'));
  }
  momentToDateRecur(data);

  return decorateRequest(superagentPromise.put(url, data));
};

request.patch = function(url, data) {
  if (checkBrowserIsIE8OrLess()) {
    return request.post(url, addOverrideFlag(data, 'PATCH'));
  }
  momentToDateRecur(data);

  return decorateRequest(superagentPromise.patch(url, data));
};

request.head = function(url, data) {
  momentToDateRecur(data);
  return decorateRequest(superagentPromise.head(url, data));
};

request.options = function(url) {
  return decorateRequest(superagentPromise.options(url));
};

request.del = function(url) {
  return decorateRequest(superagentPromise.del(url));
};

export default request;
