'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _servicesAjaxRpcBookingSlots = require('../../services/ajax/rpc/bookingSlots');

var _servicesAjaxRpcBookingSlots2 = _interopRequireDefault(_servicesAjaxRpcBookingSlots);

var _servicesAjaxRestActivityUser = require('../../services/ajax/rest/activityUser');

var _servicesAjaxRestActivityUser2 = _interopRequireDefault(_servicesAjaxRestActivityUser);

var _servicesAjaxRestEvent = require('../../services/ajax/rest/event');

var _servicesAjaxRestEvent2 = _interopRequireDefault(_servicesAjaxRestEvent);

exports['default'] = {
  getSlots: function getSlots() {
    var query = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    if (query.length == 0) {
      return _servicesAjaxRpcBookingSlots2['default'].get();
    }
    return _servicesAjaxRpcBookingSlots2['default'].get({
      query: query
    });
  },

  createBooking: function createBooking(userId, activityId, bookingObject) {
    var facilitator = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    var params = {
      embed: 'activity,facilitator',
      query: [{
        field: 'user',
        type: 'eq',
        value: userId
      }, {
        field: 'activity',
        type: 'eq',
        value: activityId
      }]
    };
    return _servicesAjaxRestActivityUser2['default'].get(params).then(function (activityUser) {

      var event = {
        name: activityUser.activity.name,
        description: activityUser.activity.descripition,
        location: bookingObject.location,
        activityUser: {
          id: activityUser.id,
          status: "booked"
        },
        dates: [{
          dateFrom: bookingObject.dateFrom,
          dateTo: bookingObject.dateTo
        }],
        attendees: [{
          user: userId,
          status: 'confirmed',
          type: 'guest'
        }, {
          user: facilitator,
          status: 'confirmed',
          type: 'owner'
        }]
      };

      return _servicesAjaxRestEvent2['default'].post(event);
    });
  },

  deleteBooking: function deleteBooking(userId, activityId, eventId) {
    var params = {
      query: [{
        field: 'user',
        type: 'eq',
        value: userId
      }, {
        field: 'activity',
        type: 'eq',
        value: activityId
      }]
    };
    return _servicesAjaxRestActivityUser2['default'].get(params).then(function (activityUser) {
      var params = {
        event: null,
        status: 'open'
      };
      return _servicesAjaxRestActivityUser2['default'].patch(activityUser.id, params).then(function () {
        return _servicesAjaxRestEvent2['default'].del(eventId);
      });
    });
  }
};
module.exports = exports['default'];