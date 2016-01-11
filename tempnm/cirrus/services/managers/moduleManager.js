'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _servicesAjaxRestContentTypeData = require('../../services/ajax/rest/contentTypeData');

var _servicesAjaxRestContentTypeData2 = _interopRequireDefault(_servicesAjaxRestContentTypeData);

exports['default'] = {
  getContentTypeData: function getContentTypeData(context, type, embed) {

    var params = {
      embed: embed,
      context: context,
      type: type
    };
    return _servicesAjaxRestContentTypeData2['default'].get(params);
  }
};
module.exports = exports['default'];