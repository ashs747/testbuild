'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _testingUtils = require('../../../../testing/utils');

var _oauth = require('../oauth');

var _oauth2 = _interopRequireDefault(_oauth);

var request = _oauth2['default'].__GetDependency__('request');

describe('oauthService', function () {
  beforeEach(function () {
    (0, _testingUtils.stubRequestService)(request);
  });

  afterEach(function () {
    (0, _testingUtils.unstubRequestService)(request);
  });

  describe('test oauth(params)', function () {
    it('calling with a params object should result in triggering an ajax request to /oauth containing those params and a returned promise', function () {
      var params = {
        test: true
      };

      var promise = _oauth2['default'].oauth(params);

      (0, _testingUtils.expect)(request.post).to.have.been.calledWithExactly("/oauth", params);
      return (0, _testingUtils.expect)(promise).to.eventually.equal('done');
    });
  });

  describe('test oauthValidate(params)', function () {
    it('calling with a params object should result in triggering an ajax request to /oauth/validate-token containing those params and a returned promise', function () {
      var params = {
        test: true
      };

      var promise = _oauth2['default'].oauthValidate(params);

      (0, _testingUtils.expect)(request.post).to.have.been.calledWithExactly("/oauth/validate-token", params);
      return (0, _testingUtils.expect)(promise).to.eventually.equal('done');
    });
  });
});