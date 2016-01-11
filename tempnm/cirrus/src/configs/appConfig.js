import extend from 'extend';

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
  api: {
  }
};

// config merging
config.merge = function(otherConfig) {
  extend(true, config, otherConfig);
  return config;
};

config.setEnvironmentConfig = function(env) {
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

export default config;
