'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _testingUtils = require('../../../testing/utils');

var _testingUtils2 = _interopRequireDefault(_testingUtils);

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _PropsToCssJsx = require('../PropsToCss.jsx');

var _PropsToCssJsx2 = _interopRequireDefault(_PropsToCssJsx);

describe('style properties', function () {
  it('should render nothing if styles are undefined', function () {
    var srcProps = undefined;
    return _testingUtils2['default'].doRenderComponent(_reactAddons2['default'].createElement(_PropsToCssJsx2['default'], { src: srcProps })).then(function (elem) {
      _testingUtils2['default'].expect(elem.getDOMNode()).to.be['null'];
    });
  });

  it('should render nothing if styles are empty', function () {
    var srcProps = {};
    _testingUtils2['default'].doRenderComponent(_reactAddons2['default'].createElement(_PropsToCssJsx2['default'], { src: srcProps })).then(function (elem) {
      _testingUtils2['default'].expect(elem.getDOMNode()).to.be['null'];
    });
  });

  it('should render inline style tag with css', function () {
    var srcProps = {
      body: {
        "background-color": "#fff"
      }
    };
    _testingUtils2['default'].doRenderElem(_reactAddons2['default'].createElement(_PropsToCssJsx2['default'], { src: srcProps })).then(function (elem) {
      var elemNode = elem[0];
      _testingUtils2['default'].expect(elemNode.childNodes.length).to.equal(1);
      var styleNode = elemNode.childNodes[0];
      _testingUtils2['default'].expect(styleNode.nodeName).to.equal('STYLE');
      var styleDefinition = styleNode.textContent;
      _testingUtils2['default'].expect(styleDefinition).to.equal('body {background-color: #fff}');
    });
  });

  it('should render multiple attributes for the same style', function () {

    var srcProps = {
      body: {
        "background-color": '#fff',
        "position": 'absolute'
      }
    };
    _testingUtils2['default'].doRenderElem(_reactAddons2['default'].createElement(_PropsToCssJsx2['default'], { src: srcProps })).then(function (elem) {
      var styleDefinition = elem.find('style').text();
      var style = 'body {background-color: #fff; position: absolute}';
      _testingUtils2['default'].expect(styleDefinition).to.equal(style);
    });
  });

  it('should render multiple style definitions', function () {
    var srcProps = {
      body: {
        "background-color": '#fff',
        "position": 'absolute'
      },
      p: {
        color: 'pink',
        'font-size': '2em'
      }
    };
    _testingUtils2['default'].doRenderElem(_reactAddons2['default'].createElement(_PropsToCssJsx2['default'], { src: srcProps })).then(function (elem) {
      var styleDefinition = elem.find('style').text();
      var style = '' + 'body {background-color: #fff; position: absolute}\n' + 'p {color: pink; font-size: 2em}';
      _testingUtils2['default'].expect(styleDefinition).to.equal(style);
    });
  });

  it('should not create style definitions where there are no properties', function () {
    var srcProps = {
      body: {
        "background-color": '#fff',
        "position": 'absolute'
      },
      p: {}
    };
    _testingUtils2['default'].doRenderElem(_reactAddons2['default'].createElement(_PropsToCssJsx2['default'], { src: srcProps })).then(function (elem) {
      var styleDefinition = elem.find('style').text();
      var style = '' + 'body {background-color: #fff; position: absolute}';
      _testingUtils2['default'].expect(styleDefinition).to.equal(style);
    });
  });

  describe('special characters', function () {

    function promiseStyle(srcProps) {
      return _testingUtils2['default'].doRenderElem(_reactAddons2['default'].createElement(_PropsToCssJsx2['default'], { src: srcProps })).then(function (elem) {
        var styleDefinition = elem.find('style').text();
        return styleDefinition;
      });
    }

    it('should not escape special characters', function () {
      var srcProps = {
        'body > div': { "background-color": '#fff' }
      };
      return _testingUtils2['default'].expect(promiseStyle(srcProps)).to.eventually.eql('body > div {background-color: #fff}');
    });
  });
});