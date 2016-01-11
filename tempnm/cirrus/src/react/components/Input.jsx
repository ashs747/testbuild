import React from 'react';
import $ from 'jquery';
import formControlMixin from '../mixins/formControlMixin';

var Input = React.createClass({
  mixins: [formControlMixin],

  render: function() {
    return (
      <input {...this.props} className={this.getStateClasses()} onChange={this.onChange} />
    );
  },

  componentDidMount: function() {
    if (this.props.placeholder && !this.placeholderSupport) {
      this.createPlaceholder();
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.placeholder && !this.placeholderSupport) {
      this.createPlaceholder();
    }
  },

  componentDidUpdate: function() {
    if (this.props.placeholder && !this.placeholderSupport) {
      this.positionPlaceholder();
    }
  },

  createPlaceholder: function() {
    if (this.placeholderNode) {
      return;
    }

    var domNode = $(this.getDOMNode());

    if (domNode.parent().css('position') == 'static') {
      domNode.parent().css('position', 'relative');
    }

    this.placeholderNode = $('<div>').addClass('placeholder').css({
      position: 'absolute'
    }).text(this.props.placeholder);

    this.placeholderNode.insertAfter(domNode);

    domNode.data('placeholder', this.placeholderNode);
    this.placeholderNode.data('input', domNode);

    domNode.on('focus', this.hidePlaceholder);
    this.placeholderNode.on('click', function(e) {
      if (!domNode.prop("disabled")) {
        this.hidePlaceholder(e);
      }
    }.bind(this));
    domNode.on('blur', this.showPlaceholder);

    this.positionPlaceholder();

    if (domNode.val()) {
      this.hidePlaceholder({target: domNode});
    }
  },

  positionPlaceholder: function() {
    if (!this.placeholderNode) {
      return;
    }

    var domNode = $(this.getDOMNode());

    var paddingLeft = (domNode.css('paddingLeft')) ? parseFloat(domNode.css('paddingLeft')) : 0;
    var paddingTop = (domNode.css('paddingTop')) ? parseFloat(domNode.css('paddingTop')) : 0;
    var borderWidth = (domNode.css('borderWidth')) ? parseFloat(domNode.css('borderWidth')) : 0;

    this.placeholderNode.css({
      paddingLeft: paddingLeft + borderWidth,
      paddingTop: paddingTop + borderWidth
    });

    var inputPosition = domNode.position();

    this.placeholderNode.css({
      left: inputPosition.left,
      top: inputPosition.top
    });
  },

  hidePlaceholder: function(event) {
    domNode = $(event.target);

    if (domNode.data('input')) {
      domNode = domNode.data('input');
    }

    domNode.data('placeholder').hide();
    domNode.off('focus', this.hidePlaceholder);
    domNode.focus();
    domNode.on('focus', this.hidePlaceholder);
  },

  showPlaceholder: function(event) {
    domNode = $(event.target);

    if (!domNode.val()) {
      domNode.data('placeholder').show();
    }
  }
});

export default Input;
