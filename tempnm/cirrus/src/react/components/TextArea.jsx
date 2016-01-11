import React from 'react';
import $ from 'jquery';
import formControlMixin from '../mixins/formControlMixin';

var TextArea = React.createClass({
  mixins: [formControlMixin],

  render: function() {
    return (
      <textarea {...this.props} className={this.getStateClasses()} onChange={this.onChange} disabled={this.props.loading} />
    );
  }
});

export default TextArea;
