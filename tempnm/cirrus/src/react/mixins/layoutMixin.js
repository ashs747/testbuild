var $ = require('jquery'),
  enquire = require('enquire.js');

var mediaQueries = {};
var matching = [];
var components = [];

var layoutMixin = {
  componentWillMount: function() {
    components.push(this);
    this.windowListeners = [];
  },

  setMediaQuery: function(name, query) {
    mediaQueries[name] = query;

    enquire.register(query, {
      match: function() {
        matching.push(name);

        for (var i = 0; i < components.length; i++) {
          if (components[i].mediaQueryMatch) {
            components[i].mediaQueryMatch.call(components[i], name);
          }
        }
      },

      unmatch: function() {
        matching.splice(matching.indexOf(name), 1);

        for (var i = 0; i < components.length; i++) {
          if (components[i].mediaQueryUnmatch) {
            components[i].mediaQueryUnmatch.call(components[i], name);
          }
        }
      }
    }, true); //true is 'shouldDegrade' flag so that IE8 always matches
  },

  getMediaQuery: function(name) {
    return mediaQueries[name];
  },

  isMatching: function(name) {
    return matching.indexOf(name) !== -1;
  },

  sameHeight: function(containers, stretchEls) {
    $(window).on('resize', onResize);
    this.windowListeners.push(onResize);
    onResize();

    function onResize() {
      if (!containers || containers.length == 0) {
        return;
      }

      var biggestEl = null;
      var biggestIndex = null;
      var heights = [];

      for (var i = 0; i < containers.length; i++) {
        var container = $(containers[i]);
        $(stretchEls[i]).css({
          minHeight: ''
        });

        if (biggestEl) {
          heights[i] = container.height();

          if (heights[i] > biggestEl.height()) {
            biggestEl = container;
            biggestIndex = i;
          }
        } else {
          biggestEl = container;
          biggestIndex = i;
          heights[i] = container.height();
        }
      }

      for (i = 0; i < containers.length; i++) {
        container = $(containers[i]);
        var diff = heights[biggestIndex] - heights[i];
        var el = $(stretchEls[i]);
        el.css({
          minHeight: el.outerHeight() + diff
        });
      }
    }

    return function() {
      for (var i = 0; i < stretchEls.length; i++) {
        $(stretchEls[i]).css({
          minHeight: ''
        });
      }

      $(window).off('resize', onResize);
    };
  },

  sameHeightTrigger: function() {
    $.each(this.windowListeners, function(i) {
      this.windowListeners[i]();
    }.bind(this));
  },

  verticalAlign: function(el) {
    el = $(el).css('position', 'relative');
    var parent = el.parent();

    $(window).on('resize', onResize);
    this.windowListeners.push(onResize);
    onResize();

    function onResize() {
      el.css({
        top: (parent.height() / 2) - (el.height() / 2)
      });
    }

    return function() {
      el.css({
        top: ''
      });

      $(window).off('resize', onResize);
    };
  },

  componentWillUnmount: function() {
    $.each(this.windowListeners, function(i) {
      $(window).off('resize', this.windowListeners[i]);
    }.bind(this));

    this.windowListeners = [];

    for (var i = 0; i < components.length; i++) {
      if (components[i] == this) {
        components.splice(i, 1);
      }
    }
  }
};

export default layoutMixin;
