'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _testingUtils = require('../../testing/utils');

var _testingUtils2 = _interopRequireDefault(_testingUtils);

var _appConfig = require('../appConfig');

var _appConfig2 = _interopRequireDefault(_appConfig);

describe('Config', function () {
  describe('Default config object', function () {
    it("should have only the known top level keys: 'programmeId', 'appId', 'appName', 'appSlug', 'version', 'analyticsId', 'env', 'api', 'timezone', 'merge', 'setEnvironmentConfig'", function () {

      _testingUtils2['default'].expect(_appConfig2['default']).to.have.all.keys('programmeId', 'appId', 'appName', 'appSlug', 'version', 'analyticsId', 'env', 'api', 'timezone', 'merge', 'setEnvironmentConfig');
    });

    it('should contain a programmeId key containing the number 0', function () {
      _testingUtils2['default'].expect(_appConfig2['default'].programmeId).to.be.a('number');
      _testingUtils2['default'].expect(_appConfig2['default'].programmeId).to.eq(0);
    });

    it('should contain an appId key containing the number 0', function () {
      _testingUtils2['default'].expect(_appConfig2['default'].appId).to.be.a('number');
      _testingUtils2['default'].expect(_appConfig2['default'].appId).to.eq(0);
    });

    it('should contain an appName key containing an empty string', function () {
      _testingUtils2['default'].expect(_appConfig2['default'].appName).to.be.a('string');
      _testingUtils2['default'].expect(_appConfig2['default'].appName).to.be.empty;
    });

    it('should contain a version key containing an object with major, minor and patch keys all containiner the number 0', function () {
      _testingUtils2['default'].expect(_appConfig2['default'].version).to.be.an('object');
      _testingUtils2['default'].expect(_appConfig2['default'].version.major).to.be.a('number');
      _testingUtils2['default'].expect(_appConfig2['default'].version.minor).to.be.a('number');
      _testingUtils2['default'].expect(_appConfig2['default'].version.patch).to.be.a('number');
    });

    it('should contain an analyticsId key containing an empty string', function () {
      _testingUtils2['default'].expect(_appConfig2['default'].analyticsId).to.be.a('string');
      _testingUtils2['default'].expect(_appConfig2['default'].analyticsId).to.be.empty;
    });

    it('should contain an env key containing an empty string', function () {
      _testingUtils2['default'].expect(_appConfig2['default'].env).to.be.a('string');
      _testingUtils2['default'].expect(_appConfig2['default'].env).to.be.empty;
    });

    it('should contain an api key containing an empty object', function () {
      _testingUtils2['default'].expect(_appConfig2['default'].api).to.be.an('object');
      _testingUtils2['default'].expect(_appConfig2['default'].api).to.be.empty;
    });

    it('should contain a merge key containing a function', function () {
      _testingUtils2['default'].expect(_appConfig2['default'].merge).to.be.a('function');
    });

    it('should contain a setEnvironmentConfig key containing a function', function () {
      _testingUtils2['default'].expect(_appConfig2['default'].setEnvironmentConfig).to.be.a('function');
    });
  });

  describe('Config merging', function () {
    it('the config.config() method should merge the simple {test: true} object with the config object', function () {
      var mergedConfig = _appConfig2['default'].merge({ test: true });
      _testingUtils2['default'].expect(mergedConfig.test).to.be['true'];
    });

    it('the config.config() method should merge the deeper {version: {minor: 1}} object with the config object maintaining the existing version.major and version.patch keys', function () {
      var mergedConfig = _appConfig2['default'].merge({ version: { minor: 1 } });
      _testingUtils2['default'].expect(mergedConfig.version.minor).to.eq(1);
      _testingUtils2['default'].expect(mergedConfig.version.major).to.eq(0);
      _testingUtils2['default'].expect(mergedConfig.version.patch).to.eq(0);
    });
  });

  describe('Environment based config switching', function () {
    it('should have an env key containing \'development\'', function () {
      _appConfig2['default'].setEnvironmentConfig('development');
      _testingUtils2['default'].expect(_appConfig2['default'].env).to.eq('development');
    });

    it('should have an env key containing \'latest\'', function () {
      _appConfig2['default'].setEnvironmentConfig('latest');
      _testingUtils2['default'].expect(_appConfig2['default'].env).to.eq('latest');
    });

    it('should have an env key containing \'staging\'', function () {
      _appConfig2['default'].setEnvironmentConfig('staging');
      _testingUtils2['default'].expect(_appConfig2['default'].env).to.eq('staging');
    });

    it('should have an env key containing \'production\'', function () {
      _appConfig2['default'].setEnvironmentConfig('production');
      _testingUtils2['default'].expect(_appConfig2['default'].env).to.eq('production');
    });
  });
});