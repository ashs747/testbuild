'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

// default config
var config = {
  programmeId: 0,
  appId: 0,
  appName: '',
  appSlug: '',
  version: {
    major: 0,
    minor: 0,
    patch: 0
  },
  timezone: 'Europe/London',
  analyticsId: '',
  env: '',
  api: {}
};

// config merging
config.merge = function (otherConfig) {
  (0, _extend2['default'])(true, config, otherConfig);
  return config;
};

config.setEnvironmentConfig = function (env) {
  switch (env) {
    case 'development':
      config.merge({
        env: 'development'
      });
      break;
    case 'latest':
      config.merge({
        env: 'latest',
        api: {
          url: 'https://latest.core.cirrus-connect.com'
        }
      });
      break;
    case 'staging':
      config.merge({
        env: 'staging',
        api: {
          url: 'https://staging.core.cirrus-connect.com'
        }
      });
      break;
    case 'production':
      config.merge({
        env: 'production',
        api: {
          url: 'https://production.core.cirrus-connect.com'
        }
      });
      break;
  }
};

config.setEnvironmentConfig(window.env);

exports['default'] = config;
module.exports = exports['default'];