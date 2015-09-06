import Main from '../Main.jsx';

describe('main', function () {

  var expect;
  beforeEach(function () {
    var utils = require('cirrus/testing/utils');
    expect = utils.expect;
  });

  it('test...test', function () {
    expect(true).to.eql(true);
  });

});
