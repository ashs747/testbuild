'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var formMixin = {
  getStateObject: function getStateObject(dataObjString) {
    var parts = dataObjString.split('.');
    var current = this.state;

    for (var i in parts) {
      if (i == parts.length - 1) {
        return current[parts[i]] ? current[parts[i]] : '';
      } else if (current[parts[i]] === undefined) {
        return '';
      }

      current = current[parts[i]];
    }
  },

  setStateObject: function setStateObject(dataObjString, event) {
    var val = (0, _jquery2['default'])(event.target).attr('type') === 'checkbox' ? event.target.checked : event.target.value;

    var parts = dataObjString.split('.');
    var stateCopy = _jquery2['default'].extend(true, {}, this.state);
    var current = stateCopy;

    _jquery2['default'].each(parts, function (i) {
      if (i == parts.length - 1) {
        current[parts[i]] = val;
      } else if (current[parts[i]] == undefined) {
        current[parts[i]] = {};
      }

      current = current[parts[i]];
    });

    this.setState(stateCopy);
  },

  onError: function onError(control, errors) {
    if (control.touched) {
      _Object$keys(errors).forEach((function loop(i) {
        if (loop.stop) {
          return;
        }
        this.showError(control, errors[i]);
        loop.stop = true;
      }).bind(this));
    }
  },

  onValid: function onValid(control) {
    this.hideError(control);
  },

  showError: function showError(component, message) {
    var el = (0, _jquery2['default'])(component.getDOMNode());
    var errorEl = null;

    if (!el.data('error')) {
      if (el.parent().css('position') == 'static') {
        el.parent().css({
          position: 'relative'
        });
      }

      errorEl = (0, _jquery2['default'])('<div class="error-message"></div>').text(message).insertAfter(el);

      el.data('error', errorEl);
    } else {
      errorEl = el.data('error').text(message);
    }

    errorEl.show();
  },

  hideError: function hideError(component) {
    var el = (0, _jquery2['default'])(component.getDOMNode());
    if (el.data('error')) {
      el.data('error').hide();
    }
  }
};

exports['default'] = formMixin;
module.exports = exports['default'];