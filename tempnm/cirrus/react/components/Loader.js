'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _imagesloaded = require('imagesloaded');

var _imagesloaded2 = _interopRequireDefault(_imagesloaded);

var Loader = _react2['default'].createClass({
  displayName: 'Loader',

  getInitialState: function getInitialState() {
    return {
      loading: true,
      style: {}
    };
  },

  componentWillMount: function componentWillMount() {
    this.image = {
      width: null,
      height: null
    };

    var tmpImg = new Image();
    tmpImg.src = this.props.image;

    (0, _imagesloaded2['default'])(tmpImg, this.onImageLoaded);
  },

  render: function render() {
    var image = null;

    if (!this.state.loading) {
      image = _react2['default'].createElement('img', { ref: 'image', style: this.state.style, src: this.props.image, alt: 'loader' });
    }

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { style: { position: 'relative', minHeight: this.state.style.height } }),
      image
    );
  },

  onImageLoaded: function onImageLoaded(instance) {
    this.image.width = instance.elements[0].naturalWidth;
    this.image.height = instance.elements[0].naturalHeight;

    if (this.isMounted()) {
      this.setState({
        loading: false,
        style: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: this.image.width || 'auto',
          height: this.image.height || 'auto',
          marginLeft: -(this.image.width / 2) || 'auto',
          marginTop: -(this.image.height / 2) || 'auto'
        }
      });
    }
  }
});

exports['default'] = Loader;
module.exports = exports['default'];