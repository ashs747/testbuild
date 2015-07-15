var localConfig = require('./localConfig');

var config = {
  programmeId: 1
};

// environment specific config
switch(window.env) {
  case 'development':
    // Potential developer specific settings such as api.url should be defined in
    // the localConfig.js, which is ingored by git.
    Object.assign(config, {
      
    });
    break;
  case 'latest':
    Object.assign(config, {
      api: {
        url: 'https://latest.core.cirrus-connect.com'
      }
    });
    break;
  case 'staging':
    Object.assign(config, {
      api: {
        url: 'https://staging.core.cirrus-connect.com'
      }
    });
    break;
  case 'production':
    Object.assign(config, {
      api: {
        url: 'https://production.core.cirrus-connect.com'
      }
    });
    break;
}

// local config override
Object.assign(config, localConfig);

export default config;
