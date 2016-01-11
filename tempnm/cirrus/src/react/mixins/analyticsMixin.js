var analyticsMixin = {
  track: function(category, action, value) {
    ga('send', 'event', category, action, value, {'page': window.location.hash});
  },

  trackPage: function() {
    ga('send', 'pageview', {'page': window.location.hash});
  }
};

export default analyticsMixin;
