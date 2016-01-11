'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _configsAppConfig = require('../configs/appConfig');

var _configsAppConfig2 = _interopRequireDefault(_configsAppConfig);

var _jqueryParam = require('jquery-param');

var _jqueryParam2 = _interopRequireDefault(_jqueryParam);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _cookieCutter = require('cookie-cutter');

var _cookieCutter2 = _interopRequireDefault(_cookieCutter);

var superagentPromise = require('superagent-promise')(_superagent2['default'], _Promise);
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
  if (_underscore2['default'].isObject(current)) {
    _Object$keys(current).forEach(function (key) {
      if (_underscore2['default'].isString(current[key]) && isoDateRegex.test(current[key])) {
        current[key] = (0, _momentTimezone2['default'])(current[key]);
      } else {
        dateToMomentRecur(current[key]);
      }
    });
  } else if (_underscore2['default'].isArray(current)) {
    for (var i = 0; i < current.length; i++) {
      if (_underscore2['default'].isString(current[i]) && isoDateRegex.test(current[i])) {
        current[i] = (0, _momentTimezone2['default'])(current[i]);
      } else {
        dateToMomentRecur(current[i]);
      }
    }
  }
}

function momentToDateRecur(current) {
  if (_underscore2['default'].isObject(current)) {
    _Object$keys(current).forEach(function (key) {
      if (current[key] && current[key]._isAMomentObject) {
        current[key] = current[key].format();
      } else {
        momentToDateRecur(current[key]);
      }
    });
  } else if (_underscore2['default'].isArray(current)) {
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

  req.end = function () {
    return oldEnd.call(req).then(function (res) {
      return res.body;
    });
  };

  if (req.url.indexOf('http') !== 0) {
    req.url = _configsAppConfig2['default'].api.url + req.url;
  }

  if (_cookieCutter2['default'].get('authToken')) {
    req.set('Authorization', 'Bearer ' + _cookieCutter2['default'].get('authToken'));
  }

  return req.type('json').use(intercept);
}

var request = function request(method, url) {
  return decorateRequest(superagentPromise(method, url));
};

request.get = function (url, data) {
  momentToDateRecur(data);

  return decorateRequest(superagentPromise.get(url, (0, _jqueryParam2['default'])(data)));
};

request.post = function (url, data) {
  momentToDateRecur(data);

  return decorateRequest(superagentPromise.post(url, data));
};

request.put = function (url, data) {
  if (checkBrowserIsIE8OrLess()) {
    return request.post(url, addOverrideFlag(data, 'PUT'));
  }
  momentToDateRecur(data);

  return decorateRequest(superagentPromise.put(url, data));
};

request.patch = function (url, data) {
  if (checkBrowserIsIE8OrLess()) {
    return request.post(url, addOverrideFlag(data, 'PATCH'));
  }
  momentToDateRecur(data);

  return decorateRequest(superagentPromise.patch(url, data));
};

request.head = function (url, data) {
  momentToDateRecur(data);
  return decorateRequest(superagentPromise.head(url, data));
};

request.options = function (url) {
  return decorateRequest(superagentPromise.options(url));
};

request.del = function (url) {
  return decorateRequest(superagentPromise.del(url));
};

exports['default'] = request;
module.exports = exports['default'];