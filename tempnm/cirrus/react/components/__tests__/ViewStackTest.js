'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _testingUtils = require('../../../testing/utils');

var _testingUtils2 = _interopRequireDefault(_testingUtils);

var _ViewStackJsx = require('../ViewStack.jsx');

var _ViewStackJsx2 = _interopRequireDefault(_ViewStackJsx);

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var TestUtils = _reactAddons2['default'].addons.TestUtils;

describe('ViewStack', function () {
  describe('normal view stack behaviour', function () {

    var markup;
    beforeEach(function () {
      markup = _reactAddons2['default'].createElement(
        _ViewStackJsx2['default'],
        { className: 'my-stack' },
        _reactAddons2['default'].createElement(
          'p',
          { className: 'one' },
          'first'
        ),
        _reactAddons2['default'].createElement(
          'p',
          { className: 'two' },
          'second'
        ),
        _reactAddons2['default'].createElement(
          'p',
          { className: 'three' },
          'third'
        )
      );
    });

    it('should have all children', function (done) {
      _testingUtils2['default'].doRenderComponent(markup).then(function (stack) {
        var children = TestUtils.scryRenderedDOMComponentsWithTag(stack, 'p');
        _testingUtils2['default'].expect(children.length).to.equal(3);
        done();
      })['catch'](done);
    });

    it('should display first child by default', function (done) {
      _testingUtils2['default'].doRenderComponent(markup).then(function (stack) {
        var children = TestUtils.scryRenderedDOMComponentsWithTag(stack, 'p');
        _testingUtils2['default'].expect(children[0].props.style).not.to.exist;
        _testingUtils2['default'].expect(children[1].props.style.visibility).to.equal('hidden');
        _testingUtils2['default'].expect(children[2].props.style.visibility).to.equal('hidden');
        done();
      })['catch'](done);
    });

    it('should add view-stack-item class to each child', function (done) {
      _testingUtils2['default'].doRenderElem(markup).then(function (stackElem) {
        var children = stackElem.find('.view-stack').children();
        _testingUtils2['default'].expect(children.length).to.equal(3);
        _testingUtils2['default'].expect((0, _jquery2['default'])(children[0]).hasClass('view-stack-item')).to.be['true'];
        _testingUtils2['default'].expect((0, _jquery2['default'])(children[1]).hasClass('view-stack-item')).to.be['true'];
        _testingUtils2['default'].expect((0, _jquery2['default'])(children[2]).hasClass('view-stack-item')).to.be['true'];
        done();
      })['catch'](done);
    });

    it('should retain existing classes on children', function (done) {
      _testingUtils2['default'].doRenderElem(markup).then(function (stackElem) {
        var children = stackElem.find('.view-stack').children();
        _testingUtils2['default'].expect(children.length).to.equal(3);
        _testingUtils2['default'].expect((0, _jquery2['default'])(children[0]).attr('class')).to.equal('view-stack-item one');
        _testingUtils2['default'].expect((0, _jquery2['default'])(children[1]).attr('class')).to.equal('view-stack-item two');
        _testingUtils2['default'].expect((0, _jquery2['default'])(children[2]).attr('class')).to.equal('view-stack-item three');
        done();
      })['catch'](done);
    });
  });

  describe('changing pages', function () {

    var TestParent, state;
    beforeEach(function () {
      state = { page: 0 };

      TestParent = _reactAddons2['default'].createClass({
        displayName: 'TestParent',

        getInitialState: function getInitialState() {
          return state;
        },
        nextPage: function nextPage() {
          this.setState({ page: this.state.page += 1 });
        },
        render: function render() {
          return _reactAddons2['default'].createElement(
            _ViewStackJsx2['default'],
            { selectedIndex: this.state.page, className: 'my-stack' },
            _reactAddons2['default'].createElement(
              'p',
              { className: 'one' },
              'first'
            ),
            _reactAddons2['default'].createElement(
              'p',
              { className: 'two' },
              'second'
            ),
            _reactAddons2['default'].createElement(
              'p',
              { className: 'three' },
              'third'
            )
          );
        }
      });
    });

    describe('visible page', function () {
      it('should display page one when selectedIndex is 1', function (done) {
        state.page = 1;
        _testingUtils2['default'].doRenderComponent(_reactAddons2['default'].createElement(TestParent, null)).then(function (stack) {
          var children = TestUtils.scryRenderedDOMComponentsWithTag(stack, 'p');
          _testingUtils2['default'].expect(children[0].props.style.visibility).to.equal('hidden');
          _testingUtils2['default'].expect(children[1].props.style).not.to.exist;
          _testingUtils2['default'].expect(children[2].props.style.visibility).to.equal('hidden');
          done();
        })['catch'](done);
      });

      it('should set next page as visible', function (done) {
        state.page = 1;
        _testingUtils2['default'].doRenderComponent(_reactAddons2['default'].createElement(TestParent, null)).then(function (stack) {
          stack.nextPage();
          var children = TestUtils.scryRenderedDOMComponentsWithTag(stack, 'p');
          _testingUtils2['default'].expect(children[0].props.style.visibility).to.equal('hidden');
          _testingUtils2['default'].expect(children[1].props.style.visibility).to.equal('hidden');
          _testingUtils2['default'].expect(children[2].props.style).not.to.exist;
          done();
        })['catch'](done);
      });
    });
  });

  describe('array components', function () {

    var createParent, CustomChild;
    beforeEach(function () {
      CustomChild = _reactAddons2['default'].createClass({
        displayName: 'CustomChild',

        render: function render() {
          return _reactAddons2['default'].createElement(
            'p',
            { className: this.props.content },
            this.props.content
          );
        }
      });
      createParent = function (markup) {
        return _reactAddons2['default'].createClass({
          render: function render() {
            return markup;
          }
        });
      };
    });

    it('should render array of child items', function (done) {
      var childComponents = ['one', 'two', 'three'].map(function (item, index) {
        return _reactAddons2['default'].createElement(
          'p',
          { key: index, className: item },
          item
        );
      });
      var markup = _reactAddons2['default'].createElement(
        _ViewStackJsx2['default'],
        { className: 'my-stack' },
        childComponents
      );
      var TestParent = createParent(markup);

      _testingUtils2['default'].doRenderComponent(_reactAddons2['default'].createElement(TestParent, null)).then(function (stack) {
        var children = TestUtils.scryRenderedDOMComponentsWithTag(stack, 'p');

        _testingUtils2['default'].expect(children[0].getDOMNode().textContent).to.equal('one');
        _testingUtils2['default'].expect(children[1].getDOMNode().textContent).to.equal('two');
        _testingUtils2['default'].expect(children[2].getDOMNode().textContent).to.equal('three');
        done();
      })['catch'](done);
    });

    it('should render array of201:1 custom child items', function (done) {

      var childComponents = ['one', 'two', 'three'].map(function (item, index) {
        return _reactAddons2['default'].createElement(CustomChild, { key: index, content: item });
      });
      var markup = _reactAddons2['default'].createElement(
        _ViewStackJsx2['default'],
        { className: 'my-stack' },
        childComponents
      );
      var TestParent = createParent(markup);

      _testingUtils2['default'].doRenderComponent(_reactAddons2['default'].createElement(TestParent, null)).then(function (stack) {
        var children = TestUtils.scryRenderedDOMComponentsWithTag(stack, 'p');

        _testingUtils2['default'].expect(children[0].getDOMNode().textContent).to.equal('one');
        _testingUtils2['default'].expect(children[1].getDOMNode().textContent).to.equal('two');
        _testingUtils2['default'].expect(children[2].getDOMNode().textContent).to.equal('three');
        done();
      })['catch'](done);
    });

    it('should render children mixed with array of child items', function (done) {

      var childComponents = ['one', 'two', 'three'].map(function (item, index) {
        return _reactAddons2['default'].createElement(CustomChild, { key: index, content: item });
      });
      var first = _reactAddons2['default'].createElement(
        'p',
        { key: 'first' },
        'go'
      );
      var last = _reactAddons2['default'].createElement(
        'p',
        { key: 'last' },
        'go'
      );

      var markup = _reactAddons2['default'].createElement(
        _ViewStackJsx2['default'],
        { className: 'my-stack' },
        first,
        childComponents,
        last
      );
      var TestParent = createParent(markup);
      _testingUtils2['default'].doRenderComponent(_reactAddons2['default'].createElement(TestParent, null)).then(function (stack) {
        var children = TestUtils.scryRenderedDOMComponentsWithTag(stack, 'p');

        _testingUtils2['default'].expect(children.length).to.equal(5);
        _testingUtils2['default'].expect(children[0].getDOMNode().textContent).to.equal('go');
        _testingUtils2['default'].expect(children[1].getDOMNode().textContent).to.equal('one');
        _testingUtils2['default'].expect(children[2].getDOMNode().textContent).to.equal('two');
        _testingUtils2['default'].expect(children[3].getDOMNode().textContent).to.equal('three');
        _testingUtils2['default'].expect(children[4].getDOMNode().textContent).to.equal('go');
        done();
      })['catch'](done);
    });

    it('should add support single child', function (done) {
      var markup = _reactAddons2['default'].createElement(
        _ViewStackJsx2['default'],
        null,
        _reactAddons2['default'].createElement(
          'p',
          null,
          'one'
        )
      );

      _testingUtils2['default'].doRenderComponent(markup).then(function (stack) {
        var children = TestUtils.scryRenderedDOMComponentsWithTag(stack, 'p');

        _testingUtils2['default'].expect(children.length).to.equal(1);
        _testingUtils2['default'].expect(children[0].getDOMNode().textContent).to.equal('one');
        done();
      })['catch'](done);
    });

    it('should support children being null', function (done) {
      var markup = _reactAddons2['default'].createElement(
        _ViewStackJsx2['default'],
        null,
        null
      );

      _testingUtils2['default'].doRenderComponent(markup).then(function (stack) {
        var children = TestUtils.scryRenderedDOMComponentsWithTag(stack, 'p');
        _testingUtils2['default'].expect(children.length).to.equal(0);
        done();
      })['catch'](done);
    });
  });
});