import React from 'react';
import Video from '../components/Video.jsx';
import Carousel from '../components/Carousel.jsx';
import LearningJourneyWidget from '../modules/personalLearningJourney/LearningJourneyWidget.jsx';
import moment from 'moment-timezone';
import {connect} from 'react-redux';

class LeadershipProgrammeView extends React.Component {

  constructor() {
    super();
  }

  render() {
    let carouselItems = [{
      name: "Ambassador for Change",
      icon: "shield",
      copy: "You enable others to learn and develop; show them how, provide support and create opportunities; share knowledge and skills with others."
    }, {
      name: "Ambassador for Change",
      icon: "shield",
      copy: "You enable others to learn and develop; show them how, provide support and create opportunities; share knowledge and skills with others."
    }, {
      name: "Ambassador for Change",
      icon: "shield",
      copy: "You enable others to learn and develop; show them how, provide support and create opportunities; share knowledge and skills with others."
    }];

    let values = [{
      name: "Customer Focus",
      icon: "heart",
      copy: "We never forget that we are here to serve our customers and we develop services to meet their needs efficiently whilst providing value for money."
    }, {
      name: "Customer Focus",
      icon: "heart",
      copy: "We never forget that we are here to serve our customers and we develop services to meet their needs efficiently whilst providing value for money."
    }, {
      name: "Customer Focus",
      icon: "heart",
      copy: "We never forget that we are here to serve our customers and we develop services to meet their needs efficiently whilst providing value for money."
    }];

    return (
      <div className="leadership-programme">
        <div className="intro">
          <div className="inner">
            <h1>Your Leadership Programme</h1>
            <p>All of the modules in this programme have been designed specifically for managers and leaders at States of Jersey. We’ve listened to your feedback and designed courses, activities and self learning tools to help you accelerate, stretch and grow.</p>
          </div>
        </div>
        <div className="our-values">
          <div className="inner">
            <h1>Powered by our Values</h1>
            <p>Our values are key to the way we act towards each other and how we interact with our customers.</p>
          </div>
        </div>
        <div className="value-carousel">
          <div className="inner">
            <Carousel context="values" items={values} defineWidthClass="programme-width" />
          </div>
        </div>
        <div className="double-column clearfix">
          <div className="col-sm-6 left-column">
            <div className="inner">
              <div className="circle">
                <p><i className="fa fa-paint-brush"></i></p>
              </div>
              <h3>Designed just for you</h3>
              <p>You enable others to learn and develop; show them how, provide support and create opportunities; share knowledge and skills with others.</p>
            </div>
          </div>
          <div className="col-sm-6 right-column">
            <div className="inner">
              <div className="circle">
                <p><i className="fa fa-question"></i></p>
              </div>
              <h3>What's in it for me?</h3>
              <p>You enable others to learn and develop; show them how, provide support and create opportunities; share knowledge and skills with others.</p>
            </div>
          </div>
        </div>
        <div className="qualities">
          <div className="inner">
            <h1>Our 5 Essential Leadership Qualities</h1>
            <p>Together we have identified 5 essential leadership qualities. We believe these 5 factors are the building blocks for every great leader in the States. Each module on this 9 month programme is built around a qualities</p>
          </div>
        </div>
        <div className="title-carousel">
          <div className="inner">
            <Carousel context="title" items={carouselItems} defineWidthClass="programme-width"/>
          </div>
        </div>
        <div className="blended-learning">
          <div className="inner">
            <h1>A Blended Learning Approach</h1>
          </div>
        </div>
        <div className="delivery-grid clearfix">
          <div className="col-sm-6 workshop">
            <div className="box-inner">
              <div className="icon">
                <i className="fa fa-users"></i>
              </div>
              <div className="text">
                <h5>Workshop</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labor.</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 coaching">
            <div className="box-inner">
              <div className="icon">
                <i className="fa fa-user"></i>
              </div>
              <div className="text">
                <h5>Coaching</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labor.</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 webinar">
            <div className="box-inner">
              <div className="icon">
                <i className="fa fa-laptop"></i>
              </div>
              <div className="text">
                <h5>Webinar</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labor.</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 development">
            <div className="box-inner">
              <div className="icon">
                <i className="fa fa-briefcase"></i>
              </div>
              <div className="text">
                <h5>Development Project</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labor.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="roadmap">
          <div className="inner">
            <h1>Your Development Roadmap</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
            <LearningJourneyWidget journeyModules={this.props.modules} smallWidget={this.props.profile === 'sm'}/>
          </div>
        </div>
        <div className="message-from">
          <div className="inner">
            <h1>A Message from the Executive Board</h1>
            <Video url="https://www.youtube.com/watch?v=HGdQUMzRVxA" />
          </div>
        </div>
      </div>
    );
  }
}

function mapProgrammeViewProps(state) {
  return {
    profile: state.width.profile,
    modules: state.learningJourney
  };
};
var mappedView = connect(mapProgrammeViewProps)(LeadershipProgrammeView);

export default mappedView;
