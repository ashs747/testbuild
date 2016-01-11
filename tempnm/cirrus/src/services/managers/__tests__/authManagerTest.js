import {sinon, expect} from '../../../testing/utils';
import authManager from '../authManager';

const oauthService = authManager.__GetDependency__('oauthService');
const userService = authManager.__GetDependency__('userService');

describe('authManager', () => {
  beforeEach(() => {
    /*eslint-disable camelcase */
    sinon.stub(oauthService, "oauth").returns(Promise.resolve({
      access_token: 'abc'
    }));
    sinon.stub(oauthService, "oauthValidate").returns(Promise.resolve({
      success: true
    }));

    sinon.stub(userService, 'get').returns(Promise.resolve({
      user_id: 123
    }));
    /*eslint-enable camelcase */
  });

  afterEach(() => {
    oauthService.oauth.restore();
    oauthService.oauthValidate.restore();
    userService.get.restore();
  });

  describe('test auth(username, password, clientId) variation of arguments', () => {
    it('passing all required arguments should return promise resolved with an object containing an auth_token property', (done) => {
      const username = 'uzah';
      const password = 'passy';
      const clientId = 'clicli';
      const promise = authManager.auth(username, password, clientId);

      /*eslint-disable camelcase */
      expect(oauthService.oauth.getCall(0).args[0]).to.deep.equal({
        username: username,
        password: password,
        client_id: clientId,
        grant_type: 'password'
      });

      expect(promise).to.eventually.have.property('access_token', 'abc').notify(done);
      /*eslint-enable camelcase */
    });

    it('missing any argument should throw an Error', () => {
      function testNoArgs() {
        authManager.auth();
      }

      function testOneArg() {
        authManager.auth('one');
      }

      function testTwoArgs() {
        authManager.auth('one', 'two');
      }

      expect(testNoArgs).to.throw(Error);
      expect(testOneArg).to.throw(Error);
      expect(testTwoArgs).to.throw(Error);
    });
  });

  describe('test validateToken(userId, token) variation of arguments', () => {
    it('passing all required arguments should return promise resolved with an object containing an success property', (done) => {
      const userId = 1;
      const token = 'abc';
      const promise = authManager.validateToken(userId, token);

      expect(oauthService.oauthValidate.getCall(0).args[0]).to.deep.equal({
        userId: userId,
        token: token,
      });

      expect(promise).to.eventually.have.property('success', true).notify(done);
    });

    it('missing any argument should throw an Error', () => {
      function testNoArgs() {
        authManager.validateToken();
      }

      function testOneArg() {
        authManager.validateToken('one');
      }

      expect(testNoArgs).to.throw(Error);
      expect(testOneArg).to.throw(Error);
    });
  });

});
