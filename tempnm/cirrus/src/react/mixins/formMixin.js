import $ from 'jquery';

var formMixin = {
  getStateObject: function(dataObjString) {
    var parts = dataObjString.split('.');
    var current = this.state;

    for (var i in parts) {
      if (i == parts.length - 1) {
        return (current[parts[i]]) ? current[parts[i]] : '';
      } else if (current[parts[i]] === undefined) {
        return '';
      }

      current = current[parts[i]];
    }
  },

  setStateObject: function(dataObjString, event) {
    var val = ($(event.target).attr('type') === 'checkbox') ? event.target.checked : event.target.value;

    var parts = dataObjString.split('.');
    var stateCopy = $.extend(true, {}, this.state);
    var current = stateCopy;

    $.each(parts, function(i) {
      if (i == parts.length - 1) {
        current[parts[i]] = val;
      } else if (current[parts[i]] == undefined) {
        current[parts[i]] = {};
      }

      current = current[parts[i]];
    });

    this.setState(stateCopy);
  },

  onError: function(control, errors) {
    if (control.touched) {
      Object.keys(errors).forEach(function loop(i) {
        if (loop.stop) {
          return;
        }
        this.showError(control, errors[i]);
        loop.stop = true;
      }.bind(this));
    }
  },

  onValid: function(control) {
    this.hideError(control);
  },

  showError: function(component, message) {
    var el = $(component.getDOMNode());
    var errorEl = null;

    if (!el.data('error')) {
      if (el.parent().css('position') == 'static') {
        el.parent().css({
          position: 'relative'
        });
      }

      errorEl = $('<div class="error-message"></div>')
        .text(message)
        .insertAfter(el);

      el.data('error', errorEl);
    } else {
      errorEl = el.data('error').text(message);
    }

    errorEl.show();
  },

  hideError: function(component) {
    var el = $(component.getDOMNode());
    if (el.data('error')) {
      el.data('error').hide();
    }
  }
};

export default formMixin;
