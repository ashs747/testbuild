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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _imagesloaded = require('imagesloaded');

var _imagesloaded2 = _interopRequireDefault(_imagesloaded);

var Cropper = _react2['default'].createClass({
  displayName: 'Cropper',

  getDefaultProps: function getDefaultProps() {
    return {
      x: 0,
      y: 0,
      width: 400,
      height: 400,
      minWidth: 100,
      minHeight: 100,
      fixRatio: true
    };
  },

  getInitialState: function getInitialState() {
    return {
      loading: true,
      container: null,
      drag: {
        start: false,
        from: null
      },
      image: {},
      cropRatio: this.props.width / this.props.height
    };
  },

  componentWillMount: function componentWillMount() {
    this.state.minWidth = this.props.minWidth;
    this.state.minHeight = this.props.fixRatio ? this.props.minWidth / this.state.cropRatio : this.props.minHeight;

    this.cropBox = {};
    this.preloadImage(this.props.src).on('done', this.onImagePreloaded);
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    if (prevState.loading !== this.state.loading) {
      this.imageNode = (0, _jquery2['default'])(this.refs.image.getDOMNode());
    }
  },

  render: function render() {
    var image = null;
    var cropBoxBg = null;
    var cropBox = null;
    var wrapperStyle = _jquery2['default'].extend({
      position: 'absolute',
      overflow: 'hidden'
    }, this.props.style);

    if (this.state.loading) {
      wrapperStyle.visibility = 'hidden';
    } else {
      var imageStyle = {
        position: 'absolute',
        width: this.state.image.calculatedSize.width,
        height: this.state.image.calculatedSize.height,
        left: this.state.image.position.left,
        top: this.state.image.position.top
      };

      image = _react2['default'].createElement('img', { ref: 'image', src: this.props.src, alt: this.props.alt, key: this.props.src, style: imageStyle });

      var crop = this.getCropBox();

      var cropBoxBgStyle = {
        position: 'absolute',
        cursor: 'crosshair',
        width: this.state.image.calculatedSize.width,
        height: this.state.image.calculatedSize.height,
        left: this.state.image.position.left,
        top: this.state.image.position.top,
        borderLeftWidth: Math.max(crop.x, 0),
        borderTopWidth: Math.max(crop.y, 0),
        borderRightWidth: Math.max(this.state.image.calculatedSize.width - (crop.x + crop.w), 0),
        borderBottomWidth: Math.max(this.state.image.calculatedSize.height - (crop.y + crop.h), 0)
      };

      var cropBoxStyle = {
        position: 'absolute',
        cursor: 'move',
        width: crop.w,
        height: crop.h,
        left: crop.x + this.state.image.position.left,
        top: crop.y + this.state.image.position.top
      };

      cropBoxBg = _react2['default'].createElement('div', { className: 'crop-box-bg', style: cropBoxBgStyle, onClick: this.onBgClick });

      cropBox = _react2['default'].createElement(
        'div',
        { ref: 'crop-box', className: 'crop-box', style: cropBoxStyle, onMouseDown: this.onMouseDown, onTouchStart: this.onMouseDown, unselectable: 'on' },
        _react2['default'].createElement('div', { ref: 'full', className: 'full', direction: 'nesw' }),
        _react2['default'].createElement('span', { ref: 'tm', className: 'tm', direction: 'n' }),
        _react2['default'].createElement('span', { ref: 'ml', className: 'ml', direction: 'w' }),
        _react2['default'].createElement('span', { ref: 'mr', className: 'mr', direction: 'e' }),
        _react2['default'].createElement('span', { ref: 'bm', className: 'bm', direction: 's' }),
        _react2['default'].createElement('span', { ref: 'cl', className: 'cl', direction: 'w' }),
        _react2['default'].createElement('span', { ref: 'ct', className: 'ct', direction: 'n' }),
        _react2['default'].createElement('span', { ref: 'cr', className: 'cr', direction: 'e' }),
        _react2['default'].createElement('span', { ref: 'cb', className: 'cb', direction: 's' }),
        _react2['default'].createElement('span', { ref: 'tl', className: 'tl', direction: 'nw' }),
        _react2['default'].createElement('span', { ref: 'tr', className: 'tr', direction: 'ne' }),
        _react2['default'].createElement('span', { ref: 'bl', className: 'bl', direction: 'sw' }),
        _react2['default'].createElement('span', { ref: 'br', className: 'br', direction: 'se' })
      );
    }

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { style: wrapperStyle, className: (0, _classnames2['default'])(this.props.className, 'cropper') }),
      image,
      cropBoxBg,
      cropBox
    );
  },

  componentWillUnmount: function componentWillUnmount() {
    (0, _jquery2['default'])(window).off('resize', this.resize);
    (0, _jquery2['default'])(document).off('mouseup', this.onMouseUp);
    (0, _jquery2['default'])(document).off('mousemove', this.onMouseMove);
    (0, _jquery2['default'])(document).off('touchmove', this.onMouseMove);
  },

  preloadImage: function preloadImage(src) {
    var tmpImg = new Image();
    tmpImg.src = src;

    return (0, _imagesloaded2['default'])(tmpImg);
  },

  onImagePreloaded: function onImagePreloaded(instance) {
    var container = (0, _jquery2['default'])(this.getDOMNode());
    var ratio = instance.elements[0].width / instance.elements[0].height;

    var imageSize = this.getImageSize(ratio, container.width(), container.height());

    this.diff = imageSize.width / instance.elements[0].width;
    this.setCropBox(this.props.x, this.props.y, this.props.width, this.props.height);

    this.setState({
      loading: false,
      container: container,
      ratio: ratio,
      image: {
        originalSize: {
          width: instance.elements[0].width,
          height: instance.elements[0].height
        },
        calculatedSize: imageSize,
        position: this.getImagePosition(imageSize.width, imageSize.height, container.width(), container.height())
      }
    });

    (0, _jquery2['default'])(window).on('resize', this.resize);

    container.attr("unselectable", "on");
    container.find("div").attr("unselectable", "on");

    if (this.props.onImageLoaded) {
      this.props.onImageLoaded();
    }
  },

  getImageSize: function getImageSize(ratio, containerWidth, containerHeight) {
    var newImageWidth = 0;
    var newImageHeight = 0;

    if (containerWidth / ratio > containerHeight) {
      newImageWidth = Math.round(containerHeight * ratio);
      newImageHeight = containerHeight;
    } else {
      newImageWidth = containerWidth;
      newImageHeight = Math.round(containerWidth / ratio);
    }

    return {
      width: newImageWidth,
      height: newImageHeight
    };
  },

  getImagePosition: function getImagePosition(imageWidth, imageHeight, containerWidth, containerHeight) {
    return {
      left: Math.round(containerWidth / 2) - imageWidth / 2,
      top: Math.round(containerHeight / 2) - imageHeight / 2
    };
  },

  resize: function resize() {
    var imageSize = this.getImageSize(this.state.image.ratio, this.state.container.width(), this.state.container.height());

    this.setState({
      image: {
        ratio: this.state.ratio,
        originalSize: this.state.image.originalSize,
        calculatedSize: imageSize,
        position: this.getImagePosition(imageSize.width, imageSize.height, this.state.container.width(), this.state.container.height())
      }
    });

    this.diff = imageSize.width / this.state.image.originalSize.width;
    this.setCropBox(this.cropBox.originalX, this.cropBox.originalY, this.cropBox.originalW, this.cropBox.originalH);
  },

  setCropBox: function setCropBox(x, y, w, h) {
    this.cropBox.originalX = x;
    this.cropBox.originalY = y;
    this.cropBox.originalW = w;
    this.cropBox.originalH = h;

    this.cropBox.x = Math.round(x * this.diff);
    this.cropBox.y = Math.round(y * this.diff);
    this.cropBox.w = Math.round(w * this.diff);
    this.cropBox.h = Math.round(h * this.diff);

    this.cropBox.minWidth = this.state.minWidth * this.diff;
    this.cropBox.minHeight = this.state.minHeight * this.diff;
  },

  getCropBox: function getCropBox() {
    return this.cropBox;
  },

  onMouseDown: function onMouseDown(event) {
    if (this.state.drag.start) {
      return;
    }

    var type = 'mouse';
    if (event.type == 'touchstart') {
      type = 'touch';
      event.target = event.touches[0].target;
      event.pageX = event.touches[0].pageX;
      event.pageY = event.touches[0].pageY;
    }

    var targetOffset = (0, _jquery2['default'])(this.refs['crop-box'].getDOMNode()).offset();

    (0, _jquery2['default'])('body').css({
      userSelect: 'none'
    });

    this.setState({
      drag: {
        start: true,
        type: type,
        from: this.refs[(0, _jquery2['default'])(event.target).attr('class')],
        targetX: event.pageX - targetOffset.left,
        targetY: event.pageY - targetOffset.top,
        originalX: this.cropBox.x,
        originalY: this.cropBox.y,
        originalW: this.cropBox.w,
        originalH: this.cropBox.h
      }
    });

    if (type == 'mouse') {
      (0, _jquery2['default'])(document).on('mousemove', this.onMouseMove);
      (0, _jquery2['default'])(document).on('mouseup', this.onMouseUp);
    } else {
      (0, _jquery2['default'])(document).on('touchmove', this.onMouseMove);
      (0, _jquery2['default'])(document).on('touchend touchcancel', this.onMouseUp);
    }
  },

  onMouseUp: function onMouseUp() {
    (0, _jquery2['default'])('body').css({
      userSelect: ''
    });

    this.setState({
      drag: {
        start: false,
        from: null
      }
    });

    (0, _jquery2['default'])(document).off('mousemove', this.onMouseMove);
    (0, _jquery2['default'])(document).off('mouseup', this.onMouseUp);
    (0, _jquery2['default'])(document).off('touchmove', this.onMouseMove);
    (0, _jquery2['default'])(document).off('touchend touchcancel', this.onMouseUp);
  },

  onMouseMove: function onMouseMove(event) {
    event.preventDefault();

    if (this.state.drag.start) {
      if (this.state.drag.type == 'touch') {
        event.pageX = event.touches[0].pageX;
        event.pageY = event.touches[0].pageY;
      }

      var offset = this.imageNode.offset();
      var x = event.pageX - offset.left - this.state.drag.targetX;
      var y = event.pageY - offset.top - this.state.drag.targetY;

      var direction = this.state.drag.from.props.direction;
      var xDistance = x - this.state.drag.originalX;
      var yDistance = y - this.state.drag.originalY;
      var newX = this.cropBox.x;
      var newY = this.cropBox.y;
      var newW = this.cropBox.w;
      var newH = this.cropBox.h;

      if (this.state.drag.from.props.direction == 'nesw') {
        newX = this.state.drag.originalX + xDistance;
        newY = this.state.drag.originalY + yDistance;
      } else {
        if (direction.indexOf('n') > -1) {
          var d = Math.max(yDistance, -this.state.drag.originalY);

          newY = Math.min(this.state.drag.originalY + d, this.state.drag.originalY + this.state.drag.originalH - this.cropBox.minHeight);
          newH = this.state.drag.originalH - d;

          if (this.props.fixRatio) {
            newW = newH * this.state.cropRatio;
          }
        }

        if (direction.indexOf('e') > -1) {
          newW = this.state.drag.originalW + xDistance;

          if (this.props.fixRatio) {
            newH = newW / this.state.cropRatio;
          }
        }

        if (direction.indexOf('s') > -1) {
          newH = this.state.drag.originalH + yDistance;

          if (this.props.fixRatio) {
            newW = newH * this.state.cropRatio;
          }
        }

        if (direction.indexOf('w') > -1) {
          d = Math.max(xDistance, -this.state.drag.originalX);

          newX = Math.min(this.state.drag.originalX + d, this.state.drag.originalX + this.state.drag.originalW - this.cropBox.minWidth);
          newW = this.state.drag.originalW - d;

          if (this.props.fixRatio) {
            newH = newW / this.state.cropRatio;
          }
        }
      }

      if (this.props.fixRatio && (newW != this.cropBox.w || newH != this.cropBox.h)) {
        if (newY + newH > this.state.image.calculatedSize.height) {
          newH = this.state.image.calculatedSize.height - newY;
          newW = newH * this.state.cropRatio;
        } else if (newX + newW > this.state.image.calculatedSize.width) {
          newW = this.state.image.calculatedSize.width - newX;
          newH = newW / this.state.cropRatio;
        }
      }

      this.cropBox.x = Math.min(Math.max(newX, 0), this.state.image.calculatedSize.width - this.cropBox.w);
      this.cropBox.y = Math.min(Math.max(newY, 0), this.state.image.calculatedSize.height - this.cropBox.h);
      this.cropBox.w = Math.max(this.cropBox.minWidth, Math.min(newW, this.state.image.calculatedSize.width - this.cropBox.x));
      this.cropBox.h = Math.max(this.cropBox.minHeight, Math.min(newH, this.state.image.calculatedSize.height - this.cropBox.y));

      this.cropBox.originalX = Math.round(this.cropBox.x / this.diff);
      this.cropBox.originalY = Math.round(this.cropBox.y / this.diff);
      this.cropBox.originalW = Math.round(this.cropBox.w / this.diff);
      this.cropBox.originalH = Math.round(this.cropBox.h / this.diff);

      this.forceUpdate();
    }
  },

  getDimensions: function getDimensions() {
    return {
      x: this.cropBox.originalX,
      y: this.cropBox.originalY,
      width: this.cropBox.originalW,
      height: this.cropBox.originalH
    };
  }
});

exports['default'] = Cropper;
module.exports = exports['default'];