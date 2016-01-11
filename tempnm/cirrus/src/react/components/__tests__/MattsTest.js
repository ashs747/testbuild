import utils from '../../../testing/utils';

describe('Test Tutorial', function() {

  it('should assert identity', function() {
    utils.expect(100).to.equal(100);
  });

  it('should assert equality', function() {
    var myObject = {someProp: 1};
    var anotherObject = {someProp: 1};
    utils.expect(myObject).to.equal(myObject);
    utils.expect(myObject).not.to.equal(anotherObject);
    utils.expect(myObject).to.eql(anotherObject);
  });

});
