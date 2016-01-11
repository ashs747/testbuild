import Input from './Input';
import TextArea from './TextArea';
import RadioGroup from './RadioGroup';
import StarRating from './StarRating';
import React from 'react';
import $ from 'jquery';

var Form = React.createClass({
  getInitialState: function() {
    return {
      valid: false,
      dirty: false,
      touched: false
    };
  },

  componentWillMount: function() {
    this.controls = [];
    this.reactEls = [];

    this.registerControls(this.props.children);
  },

  render: function() {
    var {className, ...other} = this.props;
    var classNames = className ? className.split(' ') : [];

    classNames.push(this.state.valid ? 'valid' : 'error');
    classNames.push(this.state.dirty ? 'dirty' : 'clean');
    classNames.push(this.state.touched ? 'touched' : 'untouched');
    className = classNames.join(' ');

    return (
      <form noValidate className={className} {...other}>{this.props.children}</form>
    );
  },

  registerControls: function(children) {
    this.controls = [];

    function recur(children) {
      React.Children.forEach(children, function(child) {
        if (!child) {
          return;
        }

        if (child.type == Input.type || child.type == TextArea.type || child.type == RadioGroup.type || child.type == StarRating) {
          this.bindListeners(child);
        }

        if (child.props && React.Children.count(child.props.children)) {
          recur.call(this, child.props.children);
        }
      }.bind(this));
    }

    recur.call(this, children);
  },

  bindListeners: function(child) {
    var control = null;

    child.props.onConstruct = function(c) {
      this.reactEls.push(child);
      this.controls.push(c);
      control = c;
    }.bind(this);

    var itemError = null;
    if (child.props.onError) {
      itemError = child.props.onError;
    }

    child.props.onError = function(control, errors) {
      this.onControlError(control, errors);

      if (itemError) {
        itemError(control, errors);
      }
    }.bind(this);
  },

  onControlError: function(control, errors) {

  },

  isValid: function() {
    var valid = true;

    $.each(this.controls, function(i) {
      this.controls[i].touched = true;
      if (this.controls[i].validate() !== true) {
        valid = false;
      }
    }.bind(this));

    return valid;
  }
});

export default Form;
