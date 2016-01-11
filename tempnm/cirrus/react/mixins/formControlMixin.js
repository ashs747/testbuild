'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var Validators = {
  required: function required(value) {
    if (value && value.replace) {
      value = value.replace(' ', '');
    }

    return !!value;
  },

  match: function match(value, props) {
    if (!this.required(value)) {
      return true;
    }

    var re = new RegExp(props.pattern);
    return re.test(value);
  },

  minLength: function minLength(value, props) {
    return value.length >= props.length;
  }
};

var i = document.createElement('input');
var placeholderSupport = ('placeholder' in i);

var formControlMixin = {
  placeholderSupport: placeholderSupport,

  getDefaultProps: function getDefaultProps() {
    return {
      validateOnChange: true
    };
  },

  getInitialState: function getInitialState() {
    return {
      valid: false,
      dirty: false,
      touched: false
    };
  },

  componentWillMount: function componentWillMount() {
    if (this.props.onConstruct) {
      this.props.onConstruct(this);
    }

    if (!this.props.value && this.props.defaultValue) {
      this.value = this.props.defaultValue;
    } else if (!this.props.value && this.props.children) {
      this.value = this.props.children;
    }

    this.validators = this.getValidators(this.props.validators);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.value && nextProps.value != undefined) {
      this.value = nextProps.value;
    }
  },

  componentDidMount: function componentDidMount() {
    this.validate();

    (0, _jquery2['default'])(this.getDOMNode()).on('blur', this.onBlur);
  },

  componentWillUnmount: function componentWillUnmount() {
    (0, _jquery2['default'])(this.getDOMNode()).off('blur', this.onBlur);
  },

  getValidators: function getValidators(definitionObject) {
    var callables = [];

    _Object$keys(definitionObject).forEach(function (validatorName) {
      var _definitionObject$validatorName = definitionObject[validatorName];
      var message = _definitionObject$validatorName.message;

      var otherProps = _objectWithoutProperties(_definitionObject$validatorName, ['message']);

      callables.push((function (validatorName, message, otherProps) {
        return function (value) {
          if (Validators[validatorName](value, otherProps) === true) {
            return true;
          }
          var error = {};
          error[validatorName] = message;

          return error;
        };
      })(validatorName, message, otherProps));
    });

    return callables;
  },

  validate: function validate() {
    var errors = null;

    _jquery2['default'].each(this.validators, (function (i) {
      var validator = this.validators[i](this.value);

      if (validator !== true) {
        if (!errors) {
          errors = {};
        }

        _Object$keys(validator).forEach(function (validatorName) {
          errors[validatorName] = validator[validatorName];
        });
      }
    }).bind(this));

    return this.announce(errors);
  },

  error: function error(message) {
    return this.announce({
      error: message
    });
  },

  announce: function announce(errors) {
    if (errors !== null && this.props.onError && (JSON.stringify(this.errors) != JSON.stringify(errors) || this.touched !== this.state.touched)) {
      this.props.onError(this, errors);
    } else if (errors === null && this.state.valid !== true && this.props.onValid) {
      this.props.onValid(this);
    }

    this.setState({
      valid: errors === null,
      dirty: this.dirty,
      touched: this.touched
    });

    this.errors = errors;

    return errors === null ? true : errors;
  },

  onChange: function onChange(event) {
    this.value = event.currentTarget.value;
    this.dirty = true;

    if (this.props.validateOnChange) {
      this.validate();
    }

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  },

  onBlur: function onBlur(event) {
    this.value = event.currentTarget.value;
    this.touched = true;

    if (this.props.validateOnChange) {
      this.validate();
    }

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  },

  getStateClasses: function getStateClasses() {
    var className = this.props.className ? this.props.className : '';

    className += this.state.valid ? ' valid' : ' error';
    className += this.state.dirty ? ' dirty' : ' clean';
    className += this.state.touched ? ' touched' : ' untouched';

    return className;
  }
};

exports['default'] = formControlMixin;
module.exports = exports['default'];