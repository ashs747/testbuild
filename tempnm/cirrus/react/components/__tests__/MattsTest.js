'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _testingUtils = require('../../../testing/utils');

var _testingUtils2 = _interopRequireDefault(_testingUtils);

describe('Test Tutorial', function () {

  it('should assert identity', function () {
    _testingUtils2['default'].expect(100).to.equal(100);
  });

  it('should assert equality', function () {
    var myObject = { someProp: 1 };
    var anotherObject = { someProp: 1 };
    _testingUtils2['default'].expect(myObject).to.equal(myObject);
    _testingUtils2['default'].expect(myObject).not.to.equal(anotherObject);
    _testingUtils2['default'].expect(myObject).to.eql(anotherObject);
  });
});