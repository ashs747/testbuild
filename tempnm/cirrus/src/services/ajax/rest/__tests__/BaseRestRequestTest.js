import utils from '../../../../testing/utils';
import BaseRestRequest from '../BaseRestRequest';

var request = BaseRestRequest.__GetDependency__('request');

describe('BaseRestRequest', function() {
  var baseRequest = null;

  beforeEach(function() {
    baseRequest = new BaseRestRequest('test');
    utils.stubRequestService(request);
  });

  afterEach(function() {
    utils.unstubRequestService(request);
  });

  ['get', 'put', 'patch'].forEach(function(method) {
    describe(`test all variations of params passed to baseRequest.${method}`, function() {
      it(`${method} all (no args)`, function() {
        baseRequest[method]();
        utils.expect(request[method]).to.have.been.calledWithExactly("/test", null);
      });

      it(`${method} by id`, function() {
        baseRequest[method](1);
        utils.expect(request[method]).to.have.been.calledWithExactly("/test/1", null);
      });

      it(`${method} by id obtained from param object {id: 1}`, function() {
        var params = {id: 1};
        baseRequest[method](params);
        utils.expect(request[method]).to.have.been.calledWithExactly("/test/1", params);
      });

      it(`${method} all with param object`, function() {
        var params = {test: true};
        baseRequest[method](params);
        utils.expect(request[method]).to.have.been.calledWithExactly("/test", params);
      });
    });
  });

  describe('test all variations of params passed to post', function() {
    it('post without params', function() {
      baseRequest.post();
      utils.expect(request.post).to.have.been.calledWithExactly("/test", null);
    });

    it('post with params', function() {
      var params = {test: true};
      baseRequest.post(params);
      utils.expect(request.post).to.have.been.calledWithExactly("/test", params);
    });
  });

  describe('test all variations of params passed to delete', function() {
    it('post without id', function() {
      baseRequest.del();
      utils.expect(request.del).to.have.been.calledWithExactly("/test", null);
    });

    it('post with id', function() {
      baseRequest.del(1);
      utils.expect(request.del).to.have.been.calledWithExactly("/test/1", null);
    });
  });
});
