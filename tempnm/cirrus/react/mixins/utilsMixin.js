'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var utilsMixin = {
  addClass: function addClass(oldClasses, newClasses) {
    newClasses = newClasses.split(' ');
    oldClasses = oldClasses ? oldClasses.split(' ') : [];

    for (var i = 0; i < newClasses.length; i++) {
      oldClasses.push(newClasses[i]);
    }

    return oldClasses.join(" ");
  },

  linkify: function linkify(text) {

    var urlPattern = /(\b(https?):\/\/[-A-Z0-9+&amp;@#\/%?=~_|!:,.;]*[-A-Z0-9+&amp;@#\/%=~_|])/ig;
    var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

    text = text.replace(urlPattern, '<a class="colored-link-1" title="$1" href="$1" target="_blank">$1</a>');
    text = text.replace(pseudoUrlPattern, '$1<a class="colored-link-1" href="http://$2" target="_blank">$2</a>');

    return text;
  },

  findKey: function findKey(obj, id) {
    var key = null;

    _underscore2['default'].find(obj, function (v, k) {
      if (v.id === id) {
        key = k;
        return true;
      } else {
        return false;
      }
    });

    return key;
  },

  compare: function compare(x, y) {
    if (x === y) {
      return 0;
    }
    return x < y ? 1 : -1;
  }
};

exports['default'] = utilsMixin;
module.exports = exports['default'];