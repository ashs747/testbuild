import utils from '../../../testing/utils';
import ViewStack from '../ViewStack.jsx';
import React from 'react/addons';
import $ from 'jquery';

var TestUtils = React.addons.TestUtils;

describe('ViewStack', function() {
  describe('normal view stack behaviour', function() {

    var markup;
    beforeEach(function() {
      markup = (
        <ViewStack className='my-stack'>
          <p className="one">first</p>
          <p className="two">second</p>
          <p className="three">third</p>
        </ViewStack>
      );
    });

    it('should have all children', function(done) {
      utils.doRenderComponent(markup).then(function(stack) {
        var children = TestUtils.scryRenderedDOMComponentsWithTag(stack, 'p');
        utils.expect(children.length).to.equal(3);
        done();
      }).catch(done);
    });

    it('should display first child by default', function(done) {
      utils.doRenderComponent(markup).then(function(stack) {
        var children = TestUtils.scryRenderedDOMComponentsWithTag(stack, 'p');
        utils.expect(children[0].props.style).not.to.exist;
        utils.expect(children[1].props.style.visibility).to.equal('hidden');
        utils.expect(children[2].props.style.visibility).to.equal('hidden');
        done();
      }).catch(done);
    });

    it('should add view-stack-item class to each child', function(done) {
      utils.doRenderElem(markup).then(function(stackElem) {
        var children = stackElem.find('.view-stack').children();
        utils.expect(children.length).to.equal(3);
        utils.expect($(children[0]).hasClass('view-stack-item')).to.be.true;
        utils.expect($(children[1]).hasClass('view-stack-item')).to.be.true;
        utils.expect($(children[2]).hasClass('view-stack-item')).to.be.true;
        done();
      }).catch(done);
    });

    it('should retain existing classes on children', function(done) {
      utils.doRenderElem(markup).then(function(stackElem) {
        var children = stackElem.find('.view-stack').children();
        utils.expect(children.length).to.equal(3);
        utils.expect($(children[0]).attr('class')).to.equal('view-stack-item one');
        utils.expect($(children[1]).attr('class')).to.equal('view-stack-item two');
        utils.expect($(children[2]).attr('class')).to.equal('view-stack-item three');
        done();
      }).catch(done);
    });

  });

  describe('changing pages', function() {

    var TestParent, state;
    beforeEach(function() {
      state = {page: 0};

      TestParent = React.createClass({
        getInitialState() {
          return state;
        },
        nextPage() {
          this.setState({page: this.state.page += 1});
        },
        render() {
          return (
            <ViewStack selectedIndex={this.state.page} className='my-stack'>
              <p className="one">first</p>
              <p className="two">second</p>
              <p className="three">third</p>
            </ViewStack>
          );
        }
      });

    });

    describe('visible page', function() {
      it('should display page one when selectedIndex is 1', function(done) {
        state.page = 1;
        utils.doRenderComponent(<TestParent />).then(function(stack) {
          var children = TestUtils.scryRenderedDOMComponentsWithTag(stack, 'p');
          utils.expect(children[0].props.style.visibility).to.equal('hidden');
          utils.expect(children[1].props.style).not.to.exist;
          utils.expect(children[2].props.style.visibility).to.equal('hidden');
          done();
        }).catch(done);

      });

      it('should set next page as visible', function(done) {
        state.page = 1;
        utils.doRenderComponent(<TestParent />).then(function(stack) {
          stack.nextPage();
          var children = TestUtils.scryRenderedDOMComponentsWithTag(stack, 'p');
          utils.expect(children[0].props.style.visibility).to.equal('hidden');
          utils.expect(children[1].props.style.visibility).to.equal('hidden');
          utils.expect(children[2].props.style).not.to.exist;
          done();
        }).catch(done);

      });
    });
  });

  describe('array components', function() {

    var createParent, CustomChild;
    beforeEach(function() {
      CustomChild = React.createClass({
        render() {
          return (<p className={this.props.content}>{this.props.content}</p>);
        }
      });
      createParent = function(markup) {
        return React.createClass({
          render() {
            return (markup);
          }
        });
      };
    });

    it('should render array of child items', function(done) {
      var childComponents = ['one', 'two', 'three'].map(function(item, index) {
        return <p key={index} className={item}>{item}</p>;
      });
      var markup = (<ViewStack className='my-stack'>{childComponents}</ViewStack>);
      var TestParent = createParent(markup);

      utils.doRenderComponent(<TestParent />).then(function(stack) {
        var children = TestUtils.scryRenderedDOMComponentsWithTag(stack, 'p');

        utils.expect(children[0].getDOMNode().textContent).to.equal('one');
        utils.expect(children[1].getDOMNode().textContent).to.equal('two');
        utils.expect(children[2].getDOMNode().textContent).to.equal('three');
        done();
      }).catch(done);

    });

    it('should render array of201:1 custom child items', function(done) {

      var childComponents = ['one', 'two', 'three'].map(function(item, index) {
        return <CustomChild key={index} content={item} />;
      });
      var markup = (<ViewStack className='my-stack'>{childComponents}</ViewStack>);
      var TestParent = createParent(markup);

      utils.doRenderComponent(<TestParent />).then(function(stack) {
        var children = TestUtils.scryRenderedDOMComponentsWithTag(stack, 'p');

        utils.expect(children[0].getDOMNode().textContent).to.equal('one');
        utils.expect(children[1].getDOMNode().textContent).to.equal('two');
        utils.expect(children[2].getDOMNode().textContent).to.equal('three');
        done();
      }).catch(done);

    });

    it('should render children mixed with array of child items', function(done) {

      var childComponents = ['one', 'two', 'three'].map(function(item, index) {
        return <CustomChild key={index} content={item} />;
      });
      var first = <p key="first">go</p>;
      var last = <p key="last">go</p>;

      var markup = (
        <ViewStack className='my-stack'>
          {first}
          {childComponents}
          {last}
        </ViewStack>
      );
      var TestParent = createParent(markup);
      utils.doRenderComponent(<TestParent />).then(function(stack) {
        var children = TestUtils.scryRenderedDOMComponentsWithTag(stack, 'p');

        utils.expect(children.length).to.equal(5);
        utils.expect(children[0].getDOMNode().textContent).to.equal('go');
        utils.expect(children[1].getDOMNode().textContent).to.equal('one');
        utils.expect(children[2].getDOMNode().textContent).to.equal('two');
        utils.expect(children[3].getDOMNode().textContent).to.equal('three');
        utils.expect(children[4].getDOMNode().textContent).to.equal('go');
        done();
      }).catch(done);
    });

    it('should add support single child', function(done) {
      var markup = (
        <ViewStack>
          <p>one</p>
        </ViewStack>);

      utils.doRenderComponent(markup).then(function(stack) {
        var children = TestUtils.scryRenderedDOMComponentsWithTag(stack, 'p');

        utils.expect(children.length).to.equal(1);
        utils.expect(children[0].getDOMNode().textContent).to.equal('one');
        done();
      }).catch(done);

    });

    it('should support children being null', function(done) {
      var markup = (
        <ViewStack>
          {null}
        </ViewStack>);

      utils.doRenderComponent(markup).then(function(stack) {
        var children = TestUtils.scryRenderedDOMComponentsWithTag(stack, 'p');
        utils.expect(children.length).to.equal(0);
        done();
      }).catch(done);

    });

  });

});
