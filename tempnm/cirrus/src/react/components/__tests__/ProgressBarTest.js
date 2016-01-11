import utils from '../../../testing/utils';
import React from 'react/addons';
import ProgressBar from '../ProgressBar.jsx';

describe('ProgressBar', function() {
  it('should display progress bar with container and progress', function(done) {
    utils.doRenderElem(<ProgressBar />).then(function(bar) {
      var container = bar.find('.progressbar-container');
      utils.expect(container.length).to.equal(1);
      var progressIndicator = container.find('.progressbar-progress');
      utils.expect(progressIndicator.length).to.equal(1);
      done();
    }).catch(done);
  });

  describe('width', function() {

    it('should have zero progress by default', function(done) {
      utils.doRenderElem(<ProgressBar />).then(function(bar) {
        var progressIndicator = bar.find('.progressbar-progress');
        utils.expect(progressIndicator.css('width')).to.equal('0%');
        done();
      }).catch(done);

    });

    it('should have width dependent on completed prop', function(done) {
      utils.doRenderElem(<ProgressBar completed="62" />).then(function(bar) {
        var progressIndicator = bar.find('.progressbar-progress');
        utils.expect(progressIndicator.css('width')).to.equal('62%');
        done();
      }).catch(done);

    });

    it('should not have width less than zero', function(done) {
      utils.doRenderElem(<ProgressBar completed="-10" />).then(function(bar) {
        var progressIndicator = bar.find('.progressbar-progress');
        utils.expect(progressIndicator.css('width')).to.equal('0%');
        done();
      }).catch(done);
    });

    it('should not have width greater than 100', function(done) {
      utils.doRenderElem(<ProgressBar completed="1342" />).then(function(bar) {
        var progressIndicator = bar.find('.progressbar-progress');
        utils.expect(progressIndicator.css('width')).to.equal('100%');
        done();
      }).catch(done);
    });

    it('should throw exception if passed a value which is not a number', function() {
      var render = utils.doRenderElem.bind(null, <ProgressBar completed="anything"/>);
      utils.expect(render).to.throw('completed value must be a number');
    });

    describe('calculating percent', function() {

      it('should calculate percent based on props', function(done) {
        utils.doRenderElem(<ProgressBar completed="20" max="50" />).then(function(bar) {
          var progressIndicator = bar.find('.progressbar-progress');
          utils.expect(progressIndicator.css('width')).to.equal('40%');
          done();
        }).catch(done);
      });

      it('should round percent value', function(done) {
        utils.doRenderElem(<ProgressBar completed="1" max="3" />).then(function(bar) {
          var progressIndicator = bar.find('.progressbar-progress');
          utils.expect(progressIndicator.css('width')).to.equal('33%');
          done();
        }).catch(done);
      });

      it('should throw exception if passed a max which is not a number', function() {
        var render = utils.doRenderElem.bind(null, <ProgressBar completed="20" max="max"/>);
        utils.expect(render).to.throw('max value must be a number');
      });

    });

  });

  describe('colour', function() {

    it('should have progress indicator with default colour', function(done) {
      utils.doRenderElem(<ProgressBar />).then(function(bar) {
        var progressIndicator = bar.find('.progressbar-progress');
        var rgb = progressIndicator.css('background-color');
        utils.expect(_rgbToHex(rgb)).to.equal('#0bd318');
        done();
      }).catch(done);
    });

    it('should overwrite progress indicator with custom colour', function(done) {
      utils.doRenderElem(<ProgressBar color="#FFFFFF" />).then(function(bar) {
        var progressIndicator = bar.find('.progressbar-progress');
        var rgb = progressIndicator.css('background-color');
        utils.expect(_rgbToHex(rgb)).to.equal('#ffffff');
        done();
      }).catch(done);
    });

    function _rgbToHex(color) {
      var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

      var r = Number(digits[2]);
      var g = Number(digits[3]);
      var b = Number(digits[4]);

      return _valuesToHex(r, g, b);
    }

    function _valuesToHex(r, g, b) {
      return "#" + _numberToHex(r) + _numberToHex(g) + _numberToHex(b);
    }

    function _numberToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

  });

});
