describe('main', function () {

  var expect;
  beforeEach(function () {
    var utils = require('cirrus/dist/testUtils');
    expect = utils.expect;
  });

  it('test...test', function () {
    expect(true).to.eql(true);
  });

});
