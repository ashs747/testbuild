import React from 'react';
import $ from 'jquery';
import classNames from 'classnames';

var Button = React.createClass({
  render: function() {
    var {onClick, loading, className, ...other} = this.props;
    var content = this.props.children;
    var size = "";
    var style = "";
    var classes = [];
    var loader = 'green';

    switch (this.props.skin) {
      case 'warning':
        style = 'btn-warning';
        loader = 'orange';
        break;
      case 'red':
        loader = 'red';
        break;
      case false:
        break;
      default:
        style = 'btn-primary';
        break;
    }

    switch (this.props.size) {
      case 'large':
        size = 'btn-lg';
        break;
    }

    classes.push('btn', style, size, className);

    if (loading) {
      style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: '-10px',
        marginTop: '-10px'
      };

      classes.push('loading');

      content = <span>&nbsp;<img style={style} src={'assets/img/circle-loader-20x20-' + loader + '.gif'} /></span>;
    }

    if (this.props.type === 'submit') {
      return <button {...other} className={classNames(classes)} onClick={this.onClick.bind(this, onClick)}>{content}</button>;
    }

    return <a {...other} className={classNames(classes)} onClick={this.onClick.bind(this, onClick)}>{content}</a>;
  },

  onClick: function(onClick, e) {
    if (this.props.loading || this.props.disabled) {
      e.preventDefault();
    } else if (onClick) {
      onClick();
    }
  }
});

export default Button;
