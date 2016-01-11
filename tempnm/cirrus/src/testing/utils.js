import $ from 'jquery';
import React from 'react/addons';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonLibrary from 'sinon';
import sinonChai from 'sinon-chai';
import request from '../services/request';

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

export let sinon = sinonLibrary;
export let expect = chai.expect;

export function doRenderElem(markup) {
  var div = document.createElement('div');
  React.render(markup, div);
  var elem = $(div);
  return Promise.resolve(elem);
};

export function doRenderComponent(markup) {
  var component = React.addons.TestUtils.renderIntoDocument(markup);
  return Promise.resolve(component);
};

export function stubComponent(ContainingObject, propertyName) {
  var MockedComponent = React.createClass({
    render() {
      return <p {...this.props} >mock</p>;
    }
  });
  var revert = ContainingObject.__set__(propertyName, MockedComponent);
  MockedComponent.revert = revert;
  MockedComponent.restore = revert;
  return MockedComponent;
};

export function StubbedThrottle() {
  this.called = false;

  this._stub = function(func, wait, options) {
    var self = this;
    return function() {
      if (!self.called || self.flushed) {
        func(...arguments);
        self.called = true;
        self.flushed = false;
      }
    };
  };

  this._flush = function() {
    this.flushed = true;
    this.called = false;
  };

}

export function stubThrottle() {
  var stubThrottle = new StubbedThrottle();
  var stubbed = sinon.stub(_, 'throttle', stubThrottle._stub.bind(stubThrottle));
  stubbed.flush = stubThrottle._flush.bind(stubThrottle);
  return stubbed;
};

export function mockRequestSuccess(res) {
  return {
    end() {
      return Promise.resolve(res);
    }
  };
};

export function stubRequestService(request) {
  sinon.stub(request, "get").returns({end: () => Promise.resolve('done')});
  sinon.stub(request, "post").returns({end: () => Promise.resolve('done')});
  sinon.stub(request, "patch").returns({end: () => Promise.resolve('done')});
  sinon.stub(request, "put").returns({end: () => Promise.resolve('done')});
  sinon.stub(request, "del").returns({end: () => Promise.resolve('done')});
  return request;
}

export function unstubRequestService(request) {
  request.get.restore();
  request.post.restore();
  request.patch.restore();
  request.put.restore();
  request.del.restore();
  return request;
}

export function getMockReactComponent() {
  var MockedComponent = React.createClass({
    render() {
      return <p {...this.props} >mock</p>;
    }
  });
  return MockedComponent;
}

export default {
  doRenderElem: doRenderElem,
  doRenderComponent: doRenderComponent,
  stubComponent: stubComponent,
  stubThrottle: stubThrottle,
  mockRequestSuccess: mockRequestSuccess,
  expect: chai.expect,
  sinon: sinon,
  stubRequestService: stubRequestService,
  unstubRequestService: unstubRequestService
};
