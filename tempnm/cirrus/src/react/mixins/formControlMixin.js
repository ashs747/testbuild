import $ from 'jquery';

var Validators = {
  required: function(value) {
    if (value && value.replace) {
      value = value.replace(' ', '');
    }

    return !!(value);
  },

  match: function(value, props) {
    if (!this.required(value)) {
      return true;
    }

    var re = new RegExp(props.pattern);
    return re.test(value);
  },

  minLength: function(value, props) {
    return value.length >= props.length;
  }
};

var i = document.createElement('input');
var placeholderSupport = 'placeholder' in i;

var formControlMixin = {
  placeholderSupport: placeholderSupport,

  getDefaultProps: function() {
    return {
      validateOnChange: true
    };
  },

  getInitialState: function() {
    return {
      valid: false,
      dirty: false,
      touched: false
    };
  },

  componentWillMount: function() {
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

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.value != this.value && nextProps.value != undefined) {
      this.value = nextProps.value;
    }
  },

  componentDidMount: function() {
    this.validate();

    $(this.getDOMNode()).on('blur', this.onBlur);
  },

  componentWillUnmount: function() {
    $(this.getDOMNode()).off('blur', this.onBlur);
  },

  getValidators: function(definitionObject) {
    var callables = [];

    Object.keys(definitionObject).forEach(function(validatorName) {
      var {
        message, ...otherProps
      } = definitionObject[validatorName];

      callables.push((function(validatorName, message, otherProps) {
        return function(value) {
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

  validate: function() {
    var errors = null;

    $.each(this.validators, function(i) {
      var validator = this.validators[i](this.value);

      if (validator !== true) {
        if (!errors) {
          errors = {};
        }

        Object.keys(validator).forEach(function(validatorName) {
          errors[validatorName] = validator[validatorName];
        });
      }
    }.bind(this));

    return this.announce(errors);
  },

  error: function(message) {
    return this.announce({
      error: message
    });
  },

  announce: function(errors) {
    if (errors !== null && this.props.onError &&
      (JSON.stringify(this.errors) != JSON.stringify(errors) || this.touched !== this.state.touched)) {
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

  onChange: function(event) {
    this.value = event.currentTarget.value;
    this.dirty = true;

    if (this.props.validateOnChange) {
      this.validate();
    }

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  },

  onBlur: function(event) {
    this.value = event.currentTarget.value;
    this.touched = true;

    if (this.props.validateOnChange) {
      this.validate();
    }

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  },

  getStateClasses: function() {
    var className = this.props.className ? this.props.className : '';

    className += this.state.valid ? ' valid' : ' error';
    className += this.state.dirty ? ' dirty' : ' clean';
    className += this.state.touched ? ' touched' : ' untouched';

    return className;
  }
};

export default formControlMixin;
