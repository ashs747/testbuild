'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _learningJourneyManager = require('../learningJourneyManager');

var _learningJourneyManager2 = _interopRequireDefault(_learningJourneyManager);

var _testingUtils = require('../../../../testing/utils');

var moduleService = _learningJourneyManager2['default'].__GetDependency__('moduleService');
// mocks

describe('learningJourneyManager', function () {

  beforeEach(function () {
    _testingUtils.sinon.stub(moduleService, "get");
  });

  afterEach(function () {
    moduleService.get.restore();
  });

  describe('getLearningModulesByUser', function () {
    it(' passes through correct query parameters', function () {
      var expected = {
        embed: 'programme,activities.activityUsers.event.dates',
        query: [{
          field: 'activities.activityUsers.user',
          type: 'eq',
          value: 1
        }, {
          field: 'programme',
          type: 'eq',
          value: 1
        }]
      };
      _learningJourneyManager2['default'].getlearningModulesByUser(1, 1);
      (0, _testingUtils.expect)(moduleService.get.getCall(0).args[0]).to.have.all.keys(expected);
    });

    it('missing any argument should throw an Error', function () {
      function testNoArgs() {
        _learningJourneyManager2['default'].getlearningModulesByUser();
      }

      function testOneArg() {
        _learningJourneyManager2['default'].getlearningModulesByUser('one');
      }

      function testTwoArgs() {
        _learningJourneyManager2['default'].getlearningModulesByUser(null, 'two');
      }

      (0, _testingUtils.expect)(testNoArgs).to['throw'](Error);
      (0, _testingUtils.expect)(testOneArg).to['throw'](Error);
      (0, _testingUtils.expect)(testTwoArgs).to['throw'](Error);
    });
  });
});