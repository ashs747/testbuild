'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _servicesAjaxRestModule = require('../../services/ajax/rest/module');

var _servicesAjaxRestModule2 = _interopRequireDefault(_servicesAjaxRestModule);

exports['default'] = {
  getlearningModulesByUser: function getlearningModulesByUser(userId, programId) {
    if (!userId || !programId) {
      throw new Error('Invalid arguments: getlearningModulesByUser() requires a userId, and programId, ' + arguments + ' given');
    }
    var params = {
      embed: 'programme,activities.activityUsers.event.dates',
      query: [{
        field: 'activities.activityUsers.user',
        type: 'eq',
        value: userId
      }, {
        field: 'programme',
        type: 'eq',
        value: programId
      }]
    };
    return _servicesAjaxRestModule2['default'].get(params);
  }
};
module.exports = exports['default'];