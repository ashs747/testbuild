'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Number$isInteger = require('babel-runtime/core-js/number/is-integer')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _request2 = require('../../request');

var _request3 = _interopRequireDefault(_request2);

var _default = (function () {
  function _default(serviceName) {
    _classCallCheck(this, _default);

    var urlify = serviceName.replace(/([A-Z])/, '-$1').toLowerCase();
    this.name = urlify;
  }

  _createClass(_default, [{
    key: 'get',
    value: function get(idOrParams, ParamsForId) {
      return this.request('get', idOrParams, ParamsForId);
    }
  }, {
    key: 'put',
    value: function put(idOrParams, ParamsForId) {
      return this.request('put', idOrParams, ParamsForId);
    }
  }, {
    key: 'post',
    value: function post(params) {
      return this.request('post', params);
    }
  }, {
    key: 'patch',
    value: function patch(idOrParams, ParamsForId) {
      return this.request('patch', idOrParams, ParamsForId);
    }
  }, {
    key: 'del',
    value: function del(id) {
      return this.request('del', id);
    }
  }, {
    key: 'request',
    value: function request(method, idOrParams, ParamsForId) {
      var id = null;
      var params = null;

      if (_Number$isInteger(idOrParams)) {
        id = idOrParams;

        params = ParamsForId ? ParamsForId : null;
      } else {
        if (typeof idOrParams === 'object' && idOrParams.id) {
          id = idOrParams.id;
        }

        params = idOrParams ? idOrParams : null;
      }

      if (!id) {
        return _request3['default'][method]('/' + this.name, params).end();
      }
      return _request3['default'][method]('/' + this.name + '/' + id, params).end();
    }
  }]);

  return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];