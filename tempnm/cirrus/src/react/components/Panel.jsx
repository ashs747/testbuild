import React from 'react';
import $ from 'jquery';
import _ from 'underscore';

var Container = React.createClass({
  getInitialState: function() {
    return {
      header: null
    };
  },

  render: function() {
    var {className, ...other} = this.props;

    if (!className) {
      className = '';
    }

    className += ' panel panel-default';

    var header = this.state.header;
    if (!header) {
      var closeButton = this.props.showClose ? <a className="close" href="javascript:;" onClick={this.onClose}></a> : null;

      header = this.props.title || this.props.showClose ?
        <h2 className="panel-heading">
          <span className="title">{this.props.title}</span>
          {closeButton}
        </h2> : null;
    }

    return (
      <div {...this.props} className={$.trim(className)}>
        {header}
        <div className="panel-body">
          {this.props.children}
        </div>
      </div>
    );
  },

  componentWillMount: function() {
    function recur(children) {
      React.Children.forEach(children, function(item, i) {
        if (item && item.type == Header.type) {
          this.setState({
            header: item.props.children
          });
        } else if (item && item.type != Container.type && item.props) {
          recur.call(this, item.props.children);
        }
      }.bind(this));
    }

    recur.call(this, this.props.children);
  },

  onClose: function() {
    if (_.isFunction(this.props.onClose)) {
      this.props.onClose();
    }
  }
});

var Header = React.createClass({
  render: function() {
    return <div style={{display: 'none'}}></div>;
  }
});

export default {
  Container: Container,
  Header: Header
};
