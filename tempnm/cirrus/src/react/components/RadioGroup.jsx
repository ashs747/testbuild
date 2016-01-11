import React from 'react/addons';
import formControlMixin from '../mixins/formControlMixin';

var groupI = 1;

var RadioGroup = React.createClass({
  mixins: [formControlMixin],

  componentWillMount: function() {
    this.setState({
      groupI: groupI,
      value: this.props.value
    });

    groupI++;

    this.value = this.props.value ? this.props.value : this.props.defaultValue;
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.value != this.state.value && nextProps.value != undefined) {
      this.setState({
        value: nextProps.value
      });
    }
  },

  render: function() {
    function recur(children) {
      React.Children.forEach(children, function(item, i) {
        if (item.type == "input" && item.props.type == "radio") {
          children[i] = React.addons.cloneWithProps(item, {
            ref: i,
            name: 'group' + this.state.groupI,
            checked: this.state.value == item.props.value,
            onChange: this.onRadioChange
          });
        } else if (item.props && item.props.children) {
          recur.call(this, item.props.children);
        }
      }.bind(this));
    }

    recur.call(this, this.props.children);

    return (
      <div {...this.props} className={this.getStateClasses()}>{this.props.children}</div>
    );
  },

  onRadioChange: function(event) {
    event.stopPropagation();

    if (event.currentTarget.value == this.state.value) {
      return;
    }

    this.setState({
      value: event.currentTarget.value
    });

    this.touched = true;
    this.onChange(event);
  }
});

export default RadioGroup;
