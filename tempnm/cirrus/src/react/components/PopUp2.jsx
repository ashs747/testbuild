import React from 'react';
import $ from 'jquery';

var handlerInstance = null;

var manager = {
  create: function(component, parent, options) {
    handlerInstance.create(component, parent, options);
  },

  remove: function(component) {
    handlerInstance.remove(component);
  },

  removeAll: function() {
    if (handlerInstance) {
      handlerInstance.removeAll();
    }
  },

  positionAllChildren: function() {
    handlerInstance.positionAllChildren();
  }
};

var Handler = React.createClass({
  absoluteContainer: null,

  getInitialState: function() {
    return {
      children: []
    };
  },

  render: function() {
    var children = this.state.children.map(function(item, i) {
      return React.addons.cloneWithProps(item.component, {
        ref: 'child' + i,
        key: (item.component.key != null) ? item.component.key : i
      });
    });

    return (
      <div className="popup-handler">{children}</div>
    );
  },

  componentWillMount: function() {
    /*eslint-disable consistent-this */
    handlerInstance = this;
    /*eslint-enable consistent-this */
  },

  componentDidMount: function() {
    var absoluteContainer = $(findDOMNode(this)).parents().filter(function() {
      var $this = $(this);
      return $this.is('body') || $this.css('position') == 'relative' || $this.css('position') == 'absolute';
    }).slice(0, 1);

    this.absoluteContainer = absoluteContainer;

    $(window).on('resize', this.positionAllChildren);
  },

  componentDidUpdate: function() {
    setTimeout(function() {
      this.positionAllChildren();

      setTimeout(function() {
        this.positionAllChildren();
      }.bind(this), 0);
    }.bind(this), 0);
  },

  componentWillUnmount: function() {
    $(window).off('resize', this.positionAllChildren);
  },

  getChildIndex: function(component) {
    for (var i = 0; i < this.state.children.length; i++) {
      if (this.state.children[i].component == component) {
        return i;
      }
    }

    return -1;
  },

  getChildByKey: function(key) {
    for (var i = 0; i < this.state.children.length; i++) {
      if (this.state.children[i].component.key != null && this.state.children[i].component.key === key) {
        return this.state.children[i];
      }
    }

    return false;
  },

  positionAllChildren: function(hide) {
    this.state.children.forEach(function(item, i) {
      var domNode = findDOMNode(this.refs['child' + i]);
      this.position(domNode, item.parent, item.options.position, hide);
    }.bind(this));
  },

  position: function(currentDOMNode, parentDOMNode, position, hide) {
    var containerSize = {
      width: this.absoluteContainer.width(),
      height: this.absoluteContainer.height()
    };
    var containerPosition = this.absoluteContainer.offset();

    var parentSize = {
      width: $(parentDOMNode).width(),
      height: $(parentDOMNode).height()
    };

    var parentPosition = $(parentDOMNode).offset();

    var currentSize = {
      width: $(currentDOMNode).outerWidth(true),
      height: $(currentDOMNode).outerHeight(true)
    };

    if (!parentPosition) {
      parentPosition = {left: 0, top: 0};
    }

    var leftOffset = -containerPosition.left + parentPosition.left;
    var topOffset = -containerPosition.top + parentPosition.top;
    var rightOffset = (containerPosition.left + containerSize.width) - (parentPosition.left + parentSize.width);
    var bottomOffset = (containerPosition.top + containerSize.height) - (parentPosition.top + parentSize.height);

    var left = null;
    var top = null;
    var right = null;
    var bottom = null;

    //Percentage based postioning
    if (position.percentLeft) {
      position.left = position.percentLeft * parentSize.width;
    }
    if (position.percentTop) {
      position.top = position.percentTop * parentSize.height;
    }
    if (position.percentRight) {
      position.right = position.percentRight * parentSize.width;
    }
    if (position.percentBottom) {
      position.bottom = position.percentBottom * parentSize.height;
    }

    // Set popped-up element's top, left, right and/or bottom position relative to the inner edges of the parent container
    // (just like traidtional CSS position: absolute;)
    if (position.left != null) {
      left = leftOffset + position.left;
    }
    if (position.top != null) {
      top = topOffset + position.top;
    }
    if (position.right != null) {
      right = rightOffset + position.right;
    }
    if (position.bottom != null) {
      bottom = bottomOffset + position.bottom;
    }

    // Set popped-up element's top, left, right and/or bottom position relative to the outer edges of the parent container
    if (left === null && position.outsideLeft != null) {
      left = leftOffset - currentSize.width - position.outsideLeft;
    }
    if (top === null && position.outsideTop != null) {
      top = topOffset - currentSize.height - position.outsideTop;
    }
    if (right === null && position.outsideRight != null) {
      right = rightOffset - currentSize.width - position.outsideRight;
    }
    if (bottom === null && position.outsideBottom != null) {
      bottom = bottomOffset - currentSize.height - position.outsideBottom;
    }

    // Set popped-up element's position relative to the center point of the parent container
    if (left === null && right === null) {
      var horizontalCenter = (position.horizontalCenter != null) ? position.horizontalCenter : 0;
      left = leftOffset + (parentSize.width / 2) - (currentSize.width / 2) + horizontalCenter;
    }
    if (top === null && bottom === null) {
      var verticalCenter = (position.verticalCenter != null) ? position.verticalCenter : 0;
      top = topOffset + (parentSize.height / 2) - (currentSize.height / 2) + verticalCenter;
    }

    if (parentDOMNode == window) {
      if (top != null) {
        top += $(document).scrollTop();
      }

      if (bottom != null) {
        bottom -= $(document).scrollTop();
      }
    }

    $(currentDOMNode).css({
      left: left,
      top: Math.max(top, -containerPosition.top),
      right: right,
      bottom: bottom,
      visibility: (hide === true) ? 'hidden' : 'visible'
    });
  },

  create: function(component, parent, options) {
    var existing = this.getChildByKey(component.key);

    if (existing) {
      var styles = (existing.component.props.style) ? existing.component.props.style : {};
      styles.zIndex = this.getChildIndex(existing.component) + 1000;
      styles.position = 'absolute';
      styles.top = 0;
      styles.left = 0;
      styles.visibility = 'hidden';

      var className = (existing.component.props.className) ? existing.component.props.className + ' popup' : 'popup';

      component = React.addons.cloneWithProps(component, {
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

    if (parent != window && $(parent).css('position') == 'static') {
      $(parent).css('position', 'relative');
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
        onOverlayClick = function() {
          this.remove(component);
        }.bind(this);
      }

      newChildren.push({
        component: (
          <div className="overlay" onClick={onOverlayClick} style={{zIndex: index + 1000, position: 'absolute', top: 0, left: 0}}></div>
        ),
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

    styles = (component.props.style) ? component.props.style : {};
    styles.zIndex = index + 1000;
    styles.position = 'absolute';
    styles.top = 0;
    styles.left = 0;
    styles.visibility = 'hidden';

    className = (component.props.className) ? component.props.className + ' popup' : 'popup';

    component = React.addons.cloneWithProps(component, {
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

  remove: function(component) {

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

  removeAll: function(component) {
    this.setState({
      children: []
    });
  }
});

export default {
  Handler: Handler,
  manager: manager
};
