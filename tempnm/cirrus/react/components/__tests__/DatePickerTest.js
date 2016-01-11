'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _testingUtils = require('../../../testing/utils');

var _testingUtils2 = _interopRequireDefault(_testingUtils);

var _DatePickerJsx = require('../DatePicker.jsx');

var _DatePickerJsx2 = _interopRequireDefault(_DatePickerJsx);

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var TestUtils = _reactAddons2['default'].TestUtils;

describe('DatePicker', function () {

  it('should render a calendar into selected div', function () {
    return _testingUtils2['default'].doRenderComponent(_reactAddons2['default'].createElement(_DatePickerJsx2['default'], null)).then(function (component) {
      //  var node = TestUtils.findRenderedComponentbyClass(component, 'datepicker');
      //  TestUtils.expect(node.getDOMNode().ClassName).is.equal('datepicker');
    });
  });
});