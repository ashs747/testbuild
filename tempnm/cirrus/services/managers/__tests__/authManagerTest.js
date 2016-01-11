'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _testingUtils = require('../../../testing/utils');

var _authManager = require('../authManager');

var _authManager2 = _interopRequireDefault(_authManager);

var oauthService = _authManager2['default'].__GetDependency__('oauthService');
var userService = _authManager2['default'].__GetDependency__('userService');

describe('authManager', function () {
  beforeEach(function () {
    /*eslint-disable camelcase */
    _testingUtils.sinon.stub(oauthService, "oauth").returns(_Promise.resolve({
      access_token: 'abc'
    }));
    _testingUtils.sinon.stub(oauthService, "oauthValidate").returns(_Promise.resolve({
      success: true
    }));

    _testingUtils.sinon.stub(userService, 'get').returns(_Promise.resolve({
      user_id: 123
    }));
    /*eslint-enable camelcase */
  });

  afterEach(function () {
    oauthService.oauth.restore();
    oauthService.oauthValidate.restore();
    userService.get.restore();
  });

  describe('test auth(username, password, clientId) variation of arguments', function () {
    it('passing all required arguments should return promise resolved with an object containing an auth_token property', function (done) {
      var username = 'uzah';
      var password = 'passy';
      var clientId = 'clicli';
      var promise = _authManager2['default'].auth(username, password, clientId);

      /*eslint-disable camelcase */
      (0, _testingUtils.expect)(oauthService.oauth.getCall(0).args[0]).to.deep.equal({
        username: username,
        password: password,
        client_id: clientId,
        grant_type: 'password'
      });

      (0, _testingUtils.expect)(promise).to.eventually.have.property('access_token', 'abc').notify(done);
      /*eslint-enable camelcase */
    });

    it('missing any argument should throw an Error', function () {
      function testNoArgs() {
        _authManager2['default'].auth();
      }

      function testOneArg() {
        _authManager2['default'].auth('one');
      }

      function testTwoArgs() {
        _authManager2['default'].auth('one', 'two');
      }

      (0, _testingUtils.expect)(testNoArgs).to['throw'](Error);
      (0, _testingUtils.expect)(testOneArg).to['throw'](Error);
      (0, _testingUtils.expect)(testTwoArgs).to['throw'](Error);
    });
  });

  describe('test validateToken(userId, token) variation of arguments', function () {
    it('passing all required arguments should return promise resolved with an object containing an success property', function (done) {
      var userId = 1;
      var token = 'abc';
      var promise = _authManager2['default'].validateToken(userId, token);

      (0, _testingUtils.expect)(oauthService.oauthValidate.getCall(0).args[0]).to.deep.equal({
        userId: userId,
        token: token
      });

      (0, _testingUtils.expect)(promise).to.eventually.have.property('success', true).notify(done);
    });

    it('missing any argument should throw an Error', function () {
      function testNoArgs() {
        _authManager2['default'].validateToken();
      }

      function testOneArg() {
        _authManager2['default'].validateToken('one');
      }

      (0, _testingUtils.expect)(testNoArgs).to['throw'](Error);
      (0, _testingUtils.expect)(testOneArg).to['throw'](Error);
    });
  });
});