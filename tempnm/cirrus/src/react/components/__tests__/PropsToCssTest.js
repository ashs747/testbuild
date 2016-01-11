import utils from '../../../testing/utils';
import React from 'react/addons';
import PropsToCss from '../PropsToCss.jsx';

describe('style properties', function() {
  it('should render nothing if styles are undefined', function() {
    var srcProps = undefined;
    return utils.doRenderComponent(<PropsToCss src={srcProps} />).then(function(elem) {
      utils.expect(elem.getDOMNode()).to.be.null;
    });
  });

  it('should render nothing if styles are empty', function() {
    var srcProps = {};
    utils.doRenderComponent(<PropsToCss src={srcProps} />).then(function(elem) {
      utils.expect(elem.getDOMNode()).to.be.null;
    });
  });

  it('should render inline style tag with css', function() {
    var srcProps = {
      body: {
        "background-color": "#fff"
      }
    };
    utils.doRenderElem(<PropsToCss src={srcProps} />).then(function(elem) {
      var elemNode = elem[0];
      utils.expect(elemNode.childNodes.length).to.equal(1);
      var styleNode = elemNode.childNodes[0];
      utils.expect(styleNode.nodeName).to.equal('STYLE');
      var styleDefinition = styleNode.textContent;
      utils.expect(styleDefinition).to.equal('body {background-color: #fff}');
    });
  });

  it('should render multiple attributes for the same style', function() {

    var srcProps = {
      body: {
        "background-color": '#fff',
        "position": 'absolute'
      }
    };
    utils.doRenderElem(<PropsToCss src={srcProps} />).then(function(elem) {
      var styleDefinition = elem.find('style').text();
      var style = 'body {background-color: #fff; position: absolute}';
      utils.expect(styleDefinition).to.equal(style);
    });

  });

  it('should render multiple style definitions', function() {
    var srcProps = {
      body: {
        "background-color": '#fff',
        "position": 'absolute'
      },
      p: {
        color: 'pink',
        'font-size': '2em'
      }
    };
    utils.doRenderElem(<PropsToCss src={srcProps} />).then(function(elem) {
      var styleDefinition = elem.find('style').text();
      var style = '' +
        'body {background-color: #fff; position: absolute}\n' +
        'p {color: pink; font-size: 2em}';
      utils.expect(styleDefinition).to.equal(style);
    });
  });

  it('should not create style definitions where there are no properties', function() {
    var srcProps = {
      body: {
        "background-color": '#fff',
        "position": 'absolute'
      },
      p: {}
    };
    utils.doRenderElem(<PropsToCss src={srcProps} />).then(function(elem) {
      var styleDefinition = elem.find('style').text();
      var style = '' +
        'body {background-color: #fff; position: absolute}';
      utils.expect(styleDefinition).to.equal(style);
    });
  });

  describe('special characters', function() {

    function promiseStyle(srcProps) {
      return utils.doRenderElem(<PropsToCss src={srcProps} />).then(function(elem) {
        var styleDefinition = elem.find('style').text();
        return styleDefinition;
      });
    }

    it('should not escape special characters', function() {
      var srcProps = {
        'body > div': { "background-color": '#fff' }
      };
      return utils.expect(promiseStyle(srcProps)).to.eventually.eql('body > div {background-color: #fff}');
    });

  });

});
