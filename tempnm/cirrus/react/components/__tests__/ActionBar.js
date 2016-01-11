'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _ActionBarJsx = require('../ActionBar.jsx');

var _ActionBarJsx2 = _interopRequireDefault(_ActionBarJsx);

var _testingUtils = require('../../../testing/utils');

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

describe('Action Bar', function () {

  var component;
  var testUtils = _reactAddons2['default'].addons.TestUtils;
  beforeEach(function () {
    component = testUtils.renderIntoDocument(_reactAddons2['default'].createElement(_ActionBarJsx2['default']));
  });

  it('should render a div with class: action-bar', function () {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'action-bar');
    (0, _testingUtils.expect)(components.length).to.equal(1);
  });
});