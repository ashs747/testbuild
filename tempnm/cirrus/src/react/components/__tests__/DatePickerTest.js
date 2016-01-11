import utils from '../../../testing/utils';
import DatePicker from '../DatePicker.jsx';
import React from 'react/addons';
var TestUtils = React.TestUtils;

describe('DatePicker', function() {

  it('should render a calendar into selected div', function() {
    return utils.doRenderComponent(<DatePicker />).then(function(component) {
    //  var node = TestUtils.findRenderedComponentbyClass(component, 'datepicker');
    //  TestUtils.expect(node.getDOMNode().ClassName).is.equal('datepicker');
    });
  });
});
