import ViewStack from './ViewStack.jsx';
import React from 'react';
import $ from 'jquery';

var TabStack = React.createClass({
  getInitialState: function() {
    return {
      selectedIndex: 0
    };
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
  },

  render: function() {
    var className = this.props.className;
    className = this.addClass(className, 'tab-stack');

    return (
      <div {...this.props} className={className}>
        <TabBar onChange={this.onChange} selectedIndex={this.state.selectedIndex}>
          {this.props.children}
        </TabBar>
        <ViewStack ref="viewStack" selectedIndex={this.state.selectedIndex}>
          {this.props.children}
        </ViewStack>
      </div>
    );
  },

  componentWillMount: function() {
    if (this.props.selectedIndex) {
      this.setState({selectedIndex: this.props.selectedIndex});
    }
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (this.props.onChange && this.state.selectedIndex != nextState.selectedIndex) {
      this.props.onChange(nextState.selectedIndex);
    }
  },

  onChange: function(index) {
    if (!this.props.onBeforeChange || (this.props.onBeforeChange && this.props.onBeforeChange(index) !== false)) {
      this.setState({
        selectedIndex: index
      });
    }
  },

  selectIndex: function(index) {
    this.setState({
      selectedIndex: index
    });
  },

  getSelectedIndex: function() {
    return this.refs.viewStack.getSelectedIndex();
  }
});

var TabBar = React.createClass({

  render: function() {
    var tabs = [];

    React.Children.forEach(this.props.children, function(item, i) {

      var className = item.props.tabClass;
      var activeClass = i == this.props.selectedIndex ? 'active' : '';
      className = `${className} ${activeClass}`;

      tabs.push(
        <div key={i} onClick={this.onClick.bind(this, i)} className={className}><span>{item.props.label}</span></div>
      );
    }.bind(this));

    return (
      <div className="tab-bar clearfix">
        {tabs}
      </div>
    );
  },

  onClick: function(index) {
    if (this.props.onChange) {
      this.props.onChange(index);
    }
  }
});

export default TabStack;
