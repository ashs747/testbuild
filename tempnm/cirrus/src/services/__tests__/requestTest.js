import utils from '../../testing/utils';
import config from '../../configs/appConfig';
import request from '../../services/request';

describe('request', function() {

  var server, expect;
  beforeEach(function() {
    config.merge({
      api: {url: 'http://api.com'}
    });
    expect = utils.expect;
    server = utils.sinon.fakeServer.create();
  });

  afterEach(function() {
    server.restore();
  });

  it('should do get request to absolute url', function() {
    var httpResponse = { status: 'success' };
    server.respondWith([200, {"Content-Type": "application/json"}, JSON.stringify(httpResponse)]);
    var promise = request.get('http://api.cirrus.com/ping').then(function() {
      var req = server.requests[0];
      expect(req.method).to.equal('GET');
      expect(req.url).to.equal('http://api.cirrus.com/ping');
    });
    server.respond();
    return promise;
  });

  it('should do get request to url relative to config api url', function() {
    var httpResponse = { status: 'success' };
    server.respondWith([200, {"Content-Type": "application/json"}, JSON.stringify(httpResponse)]);
    var promise = request.get('/ping').then(function() {
      var req = server.requests[0];
      expect(req.method).to.equal('GET');
      expect(req.url).to.equal('http://api.com/ping');
    });
    server.respond();
    return promise;
  });

  it('should return http response', function() {
    var httpResponse = { status: 'success' };
    server.respondWith([200, {"Content-Type": "application/json"}, JSON.stringify(httpResponse)]);
    var promise = request.get('/ping').end().then(function(res) {
      expect(res).to.eql(httpResponse);
    });
    server.respond();
    return promise;
  });

  it('should do http post', function() {
    var httpResponse = { status: 'success' };
    server.respondWith([200, {"Content-Type": "application/json"}, JSON.stringify(httpResponse)]);
    var postData = {id: 1};
    var promise = request.post('/ping', postData).end().then(function(res) {
      var req = server.requests[0];
      expect(req.method).to.equal('POST');
      expect(req.requestBody).to.equal(JSON.stringify(postData));
      expect(res).to.eql(httpResponse);
    });
    server.respond();
    return promise;
  });

  it('should go to catch if http error', function() {
    var httpResponse = { status: 'any error' };
    server.respondWith([401, {}, JSON.stringify(httpResponse)]);
    var promise = request.get('/ping')
      .then(res => {
        expect(res).to.equal('something false so if we end up here it fails');
      })
      .catch(err => {
        expect(err.message).to.equal('Unauthorized');

      });
    server.respond();
    return promise;
  });

  describe('regex', function() {

    var isoDateRegex, precompiled;
    beforeEach(function() {
      isoDateRegex = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d/;
      precompiled = new RegExp('^\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d');
    });

    it('should match regex', function() {
      expect(isoDateRegex.test('2015-08-02T12:00:00+0000')).to.equal(true);
      expect(precompiled.test('2015-08-02T12:00:00+0000')).to.equal(true);
    });

  });

});
