import {expect, stubRequestService, unstubRequestService} from '../../../../testing/utils';
import oauthService from '../oauth';

var request = oauthService.__GetDependency__('request');

describe('oauthService', () => {
  beforeEach(function() {
    stubRequestService(request);
  });

  afterEach(function() {
    unstubRequestService(request);
  });

  describe('test oauth(params)', () => {
    it('calling with a params object should result in triggering an ajax request to /oauth containing those params and a returned promise', () => {
      const params = {
        test: true
      };

      var promise = oauthService.oauth(params);

      expect(request.post).to.have.been.calledWithExactly("/oauth", params);
      return expect(promise).to.eventually.equal('done');
    });
  });

  describe('test oauthValidate(params)', () => {
    it('calling with a params object should result in triggering an ajax request to /oauth/validate-token containing those params and a returned promise', () => {
      const params = {
        test: true
      };

      var promise = oauthService.oauthValidate(params);

      expect(request.post).to.have.been.calledWithExactly("/oauth/validate-token", params);
      return expect(promise).to.eventually.equal('done');
    });
  });
});
