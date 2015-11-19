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
      name: "Quality Title",
      icon: "shield",
      copy: "You enable others to learn and develop; show them how, provide support and create opportunities; share knowledge and skills with others."
    }, {
      name: "Quality Title 2",
      icon: "shield",
      copy: "You enable others to learn and develop; show them how, provide support and create opportunities; share knowledge and skills with others."
    }, {
      name: "Quality Title 2",
      icon: "shield",
      copy: "You enable others to learn and develop; show them how, provide support and create opportunities; share knowledge and skills with others."
    }];

    let values = [{
      name: "Value",
      icon: "heart",
      copy: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
    }, {
      name: "Value",
      icon: "heart",
      copy: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
    }, {
      name: "Value",
      icon: "heart",
      copy: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
    }];

    return (
      <div className="leadership-programme">
        <div className="intro">
          <div className="inner">
            <h1>Introduction to programme</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
              esse.</p>
          </div>
        </div>
        <div className="our-values">
          <div className="inner">
            <h1>What's in it for me?</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
          </div>
        </div>
        <div className="value-carousel">
          <div className="inner">
            <Carousel context="values" items={values} />
          </div>
        </div>
        <div className="double-column clearfix">
          <div className="col-sm-6 left-column">
            <div className="inner">
              <div className="circle">
                <p><i className="fa fa-paint-brush"></i></p>
              </div>
              <h3>Designed just for you</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex dolor in reprehenderit.</p>
            </div>
          </div>
          <div className="col-sm-6 right-column">
            <div className="inner">
              <div className="circle">
                <p><i className="fa fa-question"></i></p>
              </div>
              <h3>What's in it for me?</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex dolor in reprehenderit.</p>
            </div>
          </div>
        </div>
        <div className="qualities">
          <div className="inner">
            <h1>Introduce leadership qualities</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
          </div>
        </div>
        <div className="title-carousel">
          <div className="inner">
            <Carousel context="title" items={carouselItems} />
          </div>
        </div>
        <div className="blended-learning">
          <div className="inner">
            <h1>A blended learning approach</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
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
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
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
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
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
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
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
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="roadmap">
          <div className="inner">
            <h1>Roadmap with programme structure</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
            <LearningJourneyWidget journeyModules={this.props.modules} smallWidget={this.props.profile === 'sm'}/>
          </div>
        </div>
        <div className="message-from">
          <div className="inner">
            <h1>A message from the executive board</h1>
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
