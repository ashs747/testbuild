'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _booking = require('../booking');

var _booking2 = _interopRequireDefault(_booking);

var _testingUtils = require('../../../../testing/utils');

var activityUserService = _booking2['default'].__GetDependency__('activityUserService');
var eventService = _booking2['default'].__GetDependency__('eventService');
var bookingService = _booking2['default'].__GetDependency__('bookingService');
// mocks

describe('bookingManager', function () {

  beforeEach(function () {

    _testingUtils.sinon.stub(activityUserService, "get").returns(_Promise.resolve({
      "activity": { 'name': "testActivity", 'description': "testDescription" }
    }));
    _testingUtils.sinon.stub(activityUserService, "patch").returns(_Promise.resolve({
      success: true
    }));
    _testingUtils.sinon.stub(eventService, "post").returns(_Promise.resolve({
      "activity": { 'name': "testActivity", 'description': "testDescription" }
    }));
    _testingUtils.sinon.stub(eventService, "del").returns(_Promise.resolve({
      success: true
    }));
    _testingUtils.sinon.stub(bookingService, "get");
  });

  afterEach(function () {
    activityUserService.get.restore();
    activityUserService.patch.restore();
    eventService.post.restore();
    bookingService.get.restore();
    eventService.del.restore();
  });

  describe('getSlots', function () {
    it(' passes through correct query parameters', function () {
      var obj = { data: 'nooooooo' };
      var expected = { query: { data: 'nooooooo' } };
      _booking2['default'].getSlots(obj);
      (0, _testingUtils.expect)(bookingService.get.getCall(0).args[0]).to.have.all.keys(expected);
    });

    it(' passes through nothing if query is empty', function () {
      var expected = undefined;
      _booking2['default'].getSlots();
      (0, _testingUtils.expect)(bookingService.get.getCall(0).args[0]).equals(expected);
    });
  });

  describe('createBooking', function () {
    it('builds an event object to pass through to service', function (done) {

      var expected = {
        name: 'testActivity',
        description: 'testDescription',
        location: 'Telephone',
        activityUser: {
          id: 1,
          status: "booked"
        },
        dates: [{
          dateFrom: '2015-08-24T08:00:00+0000',
          dateTo: '2015-08-24T08:00:00+0000'
        }],
        attendees: [{
          user: 1,
          status: 'confirmed',
          type: 'guest'
        }, {
          user: 2,
          status: 'confirmed',
          type: 'owner'
        }]
      };

      _booking2['default'].createBooking(2, 1, {
        dateFrom: '2015-08-24T08:00:00+0000',
        dateTo: '2015-08-24T08:00:00+0000',
        location: 'Telephone'
      }, 2).then(function () {
        (0, _testingUtils.expect)(eventService.post.getCall(0).args[0]).to.have.all.keys(expected);
      }).then(done)['catch'](done);

      (0, _testingUtils.expect)(_booking2['default'].createBooking);
    });
  });

  describe('deleteBooking', function () {
    it('it updates activty user record before deletion', function (done) {

      var params = {
        event: null,
        status: 'open'
      };

      _booking2['default'].deleteBooking(2, 1, 2).then(function () {
        (0, _testingUtils.expect)(activityUserService.patch.getCall(0).args[1]).to.have.all.keys(params);
      }).then(done)['catch'](done);
    });

    it('it updates activty user record before deletion', function (done) {

      var params = {
        event: null,
        status: 'open'
      };

      _booking2['default'].deleteBooking(2, 1, 2).then(function () {
        (0, _testingUtils.expect)(eventService.del.getCall(0).args[0]).equals(2);
      }).then(done)['catch'](done);
    });
  });
});