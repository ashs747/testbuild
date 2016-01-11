'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var locationMixin = {
  openPopUp: function openPopUp(name, data) {
    var pathQueryParts = window.location.hash.replace('#/', '').split('?');

    if (!_jquery2['default'].isPlainObject(data)) {
      data = null;
    }

    var query = _underscore2['default'].extend({
      p: name
    }, data);

    window.location.hash = '#/' + pathQueryParts[0] + '?' + _jquery2['default'].param(query);
  },

  closePopUp: function closePopUp() {
    var pathQueryParts = window.location.hash.replace('#/', '').split('?');
    window.location.hash = '#/' + pathQueryParts[0];
  }
};

exports['default'] = locationMixin;
module.exports = exports['default'];