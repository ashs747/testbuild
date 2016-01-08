import React from 'react';
import $ from 'jquery';
import cloneWithProps from 'react-addons-clone-with-props';

var HIDDEN_STYLE_PROPS = {
  style: {
    visibility: 'hidden',
    height: 0,
    padding: 0,
    margin: 0,
    width: '100%',
    position: 'absolute',
    zIndex: -1000,
    overflow: 'hidden'
  }
};

var ViewStack = React.createClass({
  getDefaultProps: function() {
    return {
      selectedIndex: 0
    };
  },

  render: function() {
    var className = this.props.className;
    className = this.addClass(className, 'view-stack');

    var children = React.Children.map(this.props.children, function(child, index) {

      var props = {
        key: "view-stack-" + index,
        className: 'view-stack-item'
      };
      var isCurrentVisiblePage = this.props.selectedIndex === index;
      if (!isCurrentVisiblePage) {
        Object.assign(props, HIDDEN_STYLE_PROPS);
      }
      return cloneWithProps(child, props);

    }.bind(this));

    return (
      <div {...this.props} className={className}>
        {children}
      </div>
    );
  },

  getSelectedIndex: function() {
    return this.props.selectedIndex;
  },

  addClass: function(oldClasses, newClasses) {
    newClasses = newClasses.split(' ');
    oldClasses = oldClasses ? oldClasses.split(' ') : [];

    for (var i = 0; i < newClasses.length; i++) {
      oldClasses.push(newClasses[i]);
    }

    return oldClasses.join(" ");
  },

  linkify: function(text) {

    var urlPattern = /(\b(https?):\/\/[-A-Z0-9+&amp;@#\/%?=~_|!:,.;]*[-A-Z0-9+&amp;@#\/%=~_|])/ig;
    var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

    text = text.replace(urlPattern, '<a class="colored-link-1" title="$1" href="$1" target="_blank">$1</a>');
    text = text.replace(pseudoUrlPattern, '$1<a class="colored-link-1" href="http://$2" target="_blank">$2</a>');

    return text;
  },

  findKey: function(obj, id) {
    var key = null;

    _.find(obj, function(v, k) {
      if (v.id === id) {
        key = k;
        return true;
      } else {
        return false;
      }
    });

    return key;
  },

  compare: function(x, y) {
    if (x === y) {
      return 0;
    }
    return x < y ? 1 : -1;
  }

});

export default ViewStack;
