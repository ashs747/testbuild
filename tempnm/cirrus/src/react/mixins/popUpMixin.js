import $ from 'jquery';
import _ from 'underscore';

var locationMixin = {
  openPopUp: function(name, data) {
    var pathQueryParts = window.location.hash.replace('#/', '').split('?');

    if (!$.isPlainObject(data)) {
      data = null;
    }

    var query = _.extend({
      p: name
    }, data);

    window.location.hash = '#/' + pathQueryParts[0] + '?' + $.param(query);
  },

  closePopUp: function() {
    var pathQueryParts = window.location.hash.replace('#/', '').split('?');
    window.location.hash = '#/' + pathQueryParts[0];
  }
};

export default locationMixin;
