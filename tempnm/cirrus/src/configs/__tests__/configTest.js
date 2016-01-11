import utils from '../../testing/utils';
import config from '../appConfig';

describe('Config', function() {
  describe('Default config object', function() {
    it("should have only the known top level keys: 'programmeId', 'appId', 'appName', 'appSlug', 'version', 'analyticsId', 'env', 'api', 'timezone', 'merge', 'setEnvironmentConfig'", function() {

      utils.expect(config).to.have.all.keys(
        'programmeId', 'appId', 'appName', 'appSlug', 'version', 'analyticsId', 'env', 'api', 'timezone', 'merge', 'setEnvironmentConfig'
      );
    });

    it('should contain a programmeId key containing the number 0', function() {
      utils.expect(config.programmeId).to.be.a('number');
      utils.expect(config.programmeId).to.eq(0);
    });

    it('should contain an appId key containing the number 0', function() {
      utils.expect(config.appId).to.be.a('number');
      utils.expect(config.appId).to.eq(0);
    });

    it('should contain an appName key containing an empty string', function() {
      utils.expect(config.appName).to.be.a('string');
      utils.expect(config.appName).to.be.empty;
    });

    it('should contain a version key containing an object with major, minor and patch keys all containiner the number 0', function() {
      utils.expect(config.version).to.be.an('object');
      utils.expect(config.version.major).to.be.a('number');
      utils.expect(config.version.minor).to.be.a('number');
      utils.expect(config.version.patch).to.be.a('number');
    });

    it('should contain an analyticsId key containing an empty string', function() {
      utils.expect(config.analyticsId).to.be.a('string');
      utils.expect(config.analyticsId).to.be.empty;
    });

    it('should contain an env key containing an empty string', function() {
      utils.expect(config.env).to.be.a('string');
      utils.expect(config.env).to.be.empty;
    });

    it('should contain an api key containing an empty object', function() {
      utils.expect(config.api).to.be.an('object');
      utils.expect(config.api).to.be.empty;
    });

    it('should contain a merge key containing a function', function() {
      utils.expect(config.merge).to.be.a('function');
    });

    it('should contain a setEnvironmentConfig key containing a function', function() {
      utils.expect(config.setEnvironmentConfig).to.be.a('function');
    });
  });

  describe('Config merging', function() {
    it('the config.config() method should merge the simple {test: true} object with the config object', function() {
      var mergedConfig = config.merge({test: true});
      utils.expect(mergedConfig.test).to.be.true;
    });

    it('the config.config() method should merge the deeper {version: {minor: 1}} object with the config object maintaining the existing version.major and version.patch keys', function() {
      var mergedConfig = config.merge({version: {minor: 1}});
      utils.expect(mergedConfig.version.minor).to.eq(1);
      utils.expect(mergedConfig.version.major).to.eq(0);
      utils.expect(mergedConfig.version.patch).to.eq(0);
    });
  });

  describe('Environment based config switching', function() {
    it('should have an env key containing \'development\'', function() {
      config.setEnvironmentConfig('development');
      utils.expect(config.env).to.eq('development');
    });

    it('should have an env key containing \'latest\'', function() {
      config.setEnvironmentConfig('latest');
      utils.expect(config.env).to.eq('latest');
    });

    it('should have an env key containing \'staging\'', function() {
      config.setEnvironmentConfig('staging');
      utils.expect(config.env).to.eq('staging');
    });

    it('should have an env key containing \'production\'', function() {
      config.setEnvironmentConfig('production');
      utils.expect(config.env).to.eq('production');
    });
  });
});
