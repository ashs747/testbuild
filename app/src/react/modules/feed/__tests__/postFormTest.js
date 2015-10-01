import React from 'react/addons';
import PostForm from '../components/PostForm.jsx';
import {expect} from 'cirrus/testing/utils';

describe('PostForm', () => {

  var testUtils = React.addons.TestUtils;
  var props = {
    profilePic: 'url-of-pic',
    onSave: () => {},
    onChange: () => {},
    onUploadMedia: () => {},
    onEmbedVideo: () => {}
  };
  var element = React.createElement(PostForm, props);
  var component;
  var mountedComponent;

  beforeEach(() => {
    component = testUtils.renderIntoDocument(element);
    mountedComponent = React.findDOMNode(component);
  });

  afterEach(() => {
    component = null;
    mountedComponent = null;
  });

  it('it should render a div with className: post-form', () => {
    var components = testUtils.scryRenderedDOMComponentsWithClass(component, 'post-form');
    expect(components.length).to.equal(1);
  });

  it('should display the profile picture if passed through', () => {
    var profilePic = mountedComponent.querySelector('.profile img').src;
    expect(profilePic).to.contain("url-of-pic");
  });

  it('should display the placeholder image if no profile pic is passed', () => {
    let updatedProps = props;
    updatedProps.profilePic = null;
    let updatedComponent = testUtils.renderIntoDocument(React.createElement(PostForm, updatedProps));
    var profilePic = React.findDOMNode(updatedComponent).querySelector('.profile img').src;
    expect(profilePic).to.contain("assets/img/profile-placeholder.jpg");
  });

});
