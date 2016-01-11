'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.doRenderElem = doRenderElem;
exports.doRenderComponent = doRenderComponent;
exports.stubComponent = stubComponent;
exports.StubbedThrottle = StubbedThrottle;
exports.stubThrottle = stubThrottle;
exports.mockRequestSuccess = mockRequestSuccess;
exports.stubRequestService = stubRequestService;
exports.unstubRequestService = unstubRequestService;
exports.getMockReactComponent = getMockReactComponent;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _sinonChai = require('sinon-chai');

var _sinonChai2 = _interopRequireDefault(_sinonChai);

var _servicesRequest = require('../services/request');

var _servicesRequest2 = _interopRequireDefault(_servicesRequest);

_chai2['default'].should();
_chai2['default'].use(_sinonChai2['default']);
_chai2['default'].use(_chaiAsPromised2['default']);

var sinon = _sinon2['default'];
exports.sinon = sinon;
var expect = _chai2['default'].expect;

exports.expect = expect;

function doRenderElem(markup) {
  var div = document.createElement('div');
  _reactAddons2['default'].render(markup, div);
  var elem = (0, _jquery2['default'])(div);
  return _Promise.resolve(elem);
}

;

function doRenderComponent(markup) {
  var component = _reactAddons2['default'].addons.TestUtils.renderIntoDocument(markup);
  return _Promise.resolve(component);
}

;

function stubComponent(ContainingObject, propertyName) {
  var MockedComponent = _reactAddons2['default'].createClass({
    displayName: 'MockedComponent',

    render: function render() {
      return _reactAddons2['default'].createElement(
        'p',
        this.props,
        'mock'
      );
    }
  });
  var revert = ContainingObject.__set__(propertyName, MockedComponent);
  MockedComponent.revert = revert;
  MockedComponent.restore = revert;
  return MockedComponent;
}

;

function StubbedThrottle() {
  this.called = false;

  this._stub = function (func, wait, options) {
    var self = this;
    return function () {
      if (!self.called || self.flushed) {
        func.apply(undefined, arguments);
        self.called = true;
        self.flushed = false;
      }
    };
  };

  this._flush = function () {
    this.flushed = true;
    this.called = false;
  };
}

function stubThrottle() {
  var stubThrottle = new StubbedThrottle();
  var stubbed = sinon.stub(_, 'throttle', stubThrottle._stub.bind(stubThrottle));
  stubbed.flush = stubThrottle._flush.bind(stubThrottle);
  return stubbed;
}

;

function mockRequestSuccess(res) {
  return {
    end: function end() {
      return _Promise.resolve(res);
    }
  };
}

;

function stubRequestService(request) {
  sinon.stub(request, "get").returns({ end: function end() {
      return _Promise.resolve('done');
    } });
  sinon.stub(request, "post").returns({ end: function end() {
      return _Promise.resolve('done');
    } });
  sinon.stub(request, "patch").returns({ end: function end() {
      return _Promise.resolve('done');
    } });
  sinon.stub(request, "put").returns({ end: function end() {
      return _Promise.resolve('done');
    } });
  sinon.stub(request, "del").returns({ end: function end() {
      return _Promise.resolve('done');
    } });
  return request;
}

function unstubRequestService(request) {
  request.get.restore();
  request.post.restore();
  request.patch.restore();
  request.put.restore();
  request.del.restore();
  return request;
}

function getMockReactComponent() {
  var MockedComponent = _reactAddons2['default'].createClass({
    displayName: 'MockedComponent',

    render: function render() {
      return _reactAddons2['default'].createElement(
        'p',
        this.props,
        'mock'
      );
    }
  });
  return MockedComponent;
}

exports['default'] = {
  doRenderElem: doRenderElem,
  doRenderComponent: doRenderComponent,
  stubComponent: stubComponent,
  stubThrottle: stubThrottle,
  mockRequestSuccess: mockRequestSuccess,
  expect: _chai2['default'].expect,
  sinon: sinon,
  stubRequestService: stubRequestService,
  unstubRequestService: unstubRequestService
};