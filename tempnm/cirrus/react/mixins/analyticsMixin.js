'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var analyticsMixin = {
  track: function track(category, action, value) {
    ga('send', 'event', category, action, value, { 'page': window.location.hash });
  },

  trackPage: function trackPage() {
    ga('send', 'pageview', { 'page': window.location.hash });
  }
};

exports['default'] = analyticsMixin;
module.exports = exports['default'];