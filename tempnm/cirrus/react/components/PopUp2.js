'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var handlerInstance = null;

var manager = {
  create: function create(component, parent, options) {
    handlerInstance.create(component, parent, options);
  },

  remove: function remove(component) {
    handlerInstance.remove(component);
  },

  removeAll: function removeAll() {
    if (handlerInstance) {
      handlerInstance.removeAll();
    }
  },

  positionAllChildren: function positionAllChildren() {
    handlerInstance.positionAllChildren();
  }
};

var Handler = _reactAddons2['default'].createClass({
  displayName: 'Handler',

  absoluteContainer: null,

  getInitialState: function getInitialState() {
    return {
      children: []
    };
  },

  render: function render() {
    var children = this.state.children.map(function (item, i) {
      return _reactAddons2['default'].addons.cloneWithProps(item.component, {
        ref: 'child' + i,
        key: item.component.key != null ? item.component.key : i
      });
    });

    return _reactAddons2['default'].createElement(
      'div',
      { className: 'popup-handler' },
      children
    );
  },

  componentWillMount: function componentWillMount() {
    /*eslint-disable consistent-this */
    handlerInstance = this;
    /*eslint-enable consistent-this */
  },

  componentDidMount: function componentDidMount() {
    var absoluteContainer = (0, _jquery2['default'])(_reactAddons2['default'].findDOMNode(this)).parents().filter(function () {
      var $this = (0, _jquery2['default'])(this);
      return $this.is('body') || $this.css('position') == 'relative' || $this.css('position') == 'absolute';
    }).slice(0, 1);

    this.absoluteContainer = absoluteContainer;

    (0, _jquery2['default'])(window).on('resize', this.positionAllChildren);
  },

  componentDidUpdate: function componentDidUpdate() {
    setTimeout((function () {
      this.positionAllChildren();

      setTimeout((function () {
        this.positionAllChildren();
      }).bind(this), 0);
    }).bind(this), 0);
  },

  componentWillUnmount: function componentWillUnmount() {
    (0, _jquery2['default'])(window).off('resize', this.positionAllChildren);
  },

  getChildIndex: function getChildIndex(component) {
    for (var i = 0; i < this.state.children.length; i++) {
      if (this.state.children[i].component == component) {
        return i;
      }
    }

    return -1;
  },

  getChildByKey: function getChildByKey(key) {
    for (var i = 0; i < this.state.children.length; i++) {
      if (this.state.children[i].component.key != null && this.state.children[i].component.key === key) {
        return this.state.children[i];
      }
    }

    return false;
  },

  positionAllChildren: function positionAllChildren(hide) {
    this.state.children.forEach((function (item, i) {
      var domNode = _reactAddons2['default'].findDOMNode(this.refs['child' + i]);
      this.position(domNode, item.parent, item.options.position, hide);
    }).bind(this));
  },

  position: function position(currentDOMNode, parentDOMNode, _position, hide) {
    var containerSize = {
      width: this.absoluteContainer.width(),
      height: this.absoluteContainer.height()
    };
    var containerPosition = this.absoluteContainer.offset();

    var parentSize = {
      width: (0, _jquery2['default'])(parentDOMNode).width(),
      height: (0, _jquery2['default'])(parentDOMNode).height()
    };

    var parentPosition = (0, _jquery2['default'])(parentDOMNode).offset();

    var currentSize = {
      width: (0, _jquery2['default'])(currentDOMNode).outerWidth(true),
      height: (0, _jquery2['default'])(currentDOMNode).outerHeight(true)
    };

    if (!parentPosition) {
      parentPosition = { left: 0, top: 0 };
    }

    var leftOffset = -containerPosition.left + parentPosition.left;
    var topOffset = -containerPosition.top + parentPosition.top;
    var rightOffset = containerPosition.left + containerSize.width - (parentPosition.left + parentSize.width);
    var bottomOffset = containerPosition.top + containerSize.height - (parentPosition.top + parentSize.height);

    var left = null;
    var top = null;
    var right = null;
    var bottom = null;

    //Percentage based postioning
    if (_position.percentLeft) {
      _position.left = _position.percentLeft * parentSize.width;
    }
    if (_position.percentTop) {
      _position.top = _position.percentTop * parentSize.height;
    }
    if (_position.percentRight) {
      _position.right = _position.percentRight * parentSize.width;
    }
    if (_position.percentBottom) {
      _position.bottom = _position.percentBottom * parentSize.height;
    }

    // Set popped-up element's top, left, right and/or bottom position relative to the inner edges of the parent container
    // (just like traidtional CSS position: absolute;)
    if (_position.left != null) {
      left = leftOffset + _position.left;
    }
    if (_position.top != null) {
      top = topOffset + _position.top;
    }
    if (_position.right != null) {
      right = rightOffset + _position.right;
    }
    if (_position.bottom != null) {
      bottom = bottomOffset + _position.bottom;
    }

    // Set popped-up element's top, left, right and/or bottom position relative to the outer edges of the parent container
    if (left === null && _position.outsideLeft != null) {
      left = leftOffset - currentSize.width - _position.outsideLeft;
    }
    if (top === null && _position.outsideTop != null) {
      top = topOffset - currentSize.height - _position.outsideTop;
    }
    if (right === null && _position.outsideRight != null) {
      right = rightOffset - currentSize.width - _position.outsideRight;
    }
    if (bottom === null && _position.outsideBottom != null) {
      bottom = bottomOffset - currentSize.height - _position.outsideBottom;
    }

    // Set popped-up element's position relative to the center point of the parent container
    if (left === null && right === null) {
      var horizontalCenter = _position.horizontalCenter != null ? _position.horizontalCenter : 0;
      left = leftOffset + parentSize.width / 2 - currentSize.width / 2 + horizontalCenter;
    }
    if (top === null && bottom === null) {
      var verticalCenter = _position.verticalCenter != null ? _position.verticalCenter : 0;
      top = topOffset + parentSize.height / 2 - currentSize.height / 2 + verticalCenter;
    }

    if (parentDOMNode == window) {
      if (top != null) {
        top += (0, _jquery2['default'])(document).scrollTop();
      }

      if (bottom != null) {
        bottom -= (0, _jquery2['default'])(document).scrollTop();
      }
    }

    (0, _jquery2['default'])(currentDOMNode).css({
      left: left,
      top: Math.max(top, -containerPosition.top),
      right: right,
      bottom: bottom,
      visibility: hide === true ? 'hidden' : 'visible'
    });
  },

  create: function create(component, parent, options) {
    var existing = this.getChildByKey(component.key);

    if (existing) {
      var styles = existing.component.props.style ? existing.component.props.style : {};
      styles.zIndex = this.getChildIndex(existing.component) + 1000;
      styles.position = 'absolute';
      styles.top = 0;
      styles.left = 0;
      styles.visibility = 'hidden';

      var className = existing.component.props.className ? existing.component.props.className + ' popup' : 'popup';

      component = _reactAddons2['default'].addons.cloneWithProps(component, {
        key: component.key,
        style: styles,
        className: className
      });

      existing.component = component;
      this.forceUpdate();
      return true;
    } else if (this.getChildIndex(component) !== -1) {
      return false;
    }

    if (!parent) {
      parent = window;
    }

    if (parent != window && (0, _jquery2['default'])(parent).css('position') == 'static') {
      (0, _jquery2['default'])(parent).css('position', 'relative');
    }

    if (!options) {
      options = {};
    }

    if (!options.position) {
      options.position = {};
    }

    var newChildren = [];
    var index = this.state.children.length;

    if (options.modal) {
      var onOverlayClick = null;

      if (options.closeOnOverlayClick) {
        onOverlayClick = (function () {
          this.remove(component);
        }).bind(this);
      }

      newChildren.push({
        component: _reactAddons2['default'].createElement('div', { className: 'overlay', onClick: onOverlayClick, style: { zIndex: index + 1000, position: 'absolute', top: 0, left: 0 } }),
        parent: document,
        options: {
          position: {
            left: 0,
            top: 0,
            bottom: 0,
            right: 0
          }
        }
      });

      index++;
    }

    if (typeof options.position.left == 'string' && options.position.left.indexOf('%') > -1) {
      options.position.percentLeft = parseFloat(options.position.left) / 100;
      options.position.left = null;
    }
    if (typeof options.position.top == 'string' && options.position.top.indexOf('%') > -1) {
      options.position.percentTop = parseFloat(options.position.top) / 100;
      options.position.top = null;
    }
    if (typeof options.position.right == 'string' && options.position.right.indexOf('%') > -1) {
      options.position.percentRight = parseFloat(options.position.right) / 100;
      options.position.right = null;
    }
    if (typeof options.position.bottom == 'string' && options.position.bottom.indexOf('%') > -1) {
      options.position.percentBottom = parseFloat(options.position.bottom) / 100;
      options.position.bottom = null;
    }

    styles = component.props.style ? component.props.style : {};
    styles.zIndex = index + 1000;
    styles.position = 'absolute';
    styles.top = 0;
    styles.left = 0;
    styles.visibility = 'hidden';

    className = component.props.className ? component.props.className + ' popup' : 'popup';

    component = _reactAddons2['default'].addons.cloneWithProps(component, {
      key: component.key,
      style: styles,
      className: className
    });

    newChildren.push({
      component: component,
      parent: parent,
      options: options
    });

    this.setState({
      children: this.state.children.concat(newChildren)
    });
  },

  remove: function remove(component) {

    if (component.key) {
      var existing = this.getChildByKey(component.key);
      if (existing) {
        component = existing.component;
      }
    }

    var index = this.getChildIndex(component);

    if (index === -1) {
      return false;
    }

    if (this.state.children[index].options.modal) {
      this.state.children.splice(index - 1, 1);
      index--;
    }

    this.state.children.splice(index, 1);

    this.setState({
      children: this.state.children
    });
  },

  removeAll: function removeAll(component) {
    this.setState({
      children: []
    });
  }
});

exports['default'] = {
  Handler: Handler,
  manager: manager
};
module.exports = exports['default'];