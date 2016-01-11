'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _testingUtils = require('../../../../testing/utils');

var _testingUtils2 = _interopRequireDefault(_testingUtils);

var _BaseRestRequest = require('../BaseRestRequest');

var _BaseRestRequest2 = _interopRequireDefault(_BaseRestRequest);

var request = _BaseRestRequest2['default'].__GetDependency__('request');

describe('BaseRestRequest', function () {
  var baseRequest = null;

  beforeEach(function () {
    baseRequest = new _BaseRestRequest2['default']('test');
    _testingUtils2['default'].stubRequestService(request);
  });

  afterEach(function () {
    _testingUtils2['default'].unstubRequestService(request);
  });

  ['get', 'put', 'patch'].forEach(function (method) {
    describe('test all variations of params passed to baseRequest.' + method, function () {
      it(method + ' all (no args)', function () {
        baseRequest[method]();
        _testingUtils2['default'].expect(request[method]).to.have.been.calledWithExactly("/test", null);
      });

      it(method + ' by id', function () {
        baseRequest[method](1);
        _testingUtils2['default'].expect(request[method]).to.have.been.calledWithExactly("/test/1", null);
      });

      it(method + ' by id obtained from param object {id: 1}', function () {
        var params = { id: 1 };
        baseRequest[method](params);
        _testingUtils2['default'].expect(request[method]).to.have.been.calledWithExactly("/test/1", params);
      });

      it(method + ' all with param object', function () {
        var params = { test: true };
        baseRequest[method](params);
        _testingUtils2['default'].expect(request[method]).to.have.been.calledWithExactly("/test", params);
      });
    });
  });

  describe('test all variations of params passed to post', function () {
    it('post without params', function () {
      baseRequest.post();
      _testingUtils2['default'].expect(request.post).to.have.been.calledWithExactly("/test", null);
    });

    it('post with params', function () {
      var params = { test: true };
      baseRequest.post(params);
      _testingUtils2['default'].expect(request.post).to.have.been.calledWithExactly("/test", params);
    });
  });

  describe('test all variations of params passed to delete', function () {
    it('post without id', function () {
      baseRequest.del();
      _testingUtils2['default'].expect(request.del).to.have.been.calledWithExactly("/test", null);
    });

    it('post with id', function () {
      baseRequest.del(1);
      _testingUtils2['default'].expect(request.del).to.have.been.calledWithExactly("/test/1", null);
    });
  });
});