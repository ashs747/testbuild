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
      name: "Inspiring Connector",
      icon: <img src="assets/img/inspiring-connector.png" alt="module icon" />,
      copy: "You act with integrity and build trust to build honest and robust relationships. You communicate with gravitas and impact with the customer in mind always."
    }, {
      name: "Ambassador for Change",
      icon: <img src="assets/img/ambassador-for-change.png" alt="module icon" />,
      copy: "You represent and drive change for a better public service,  You enable others to build confidence and resilience even when surrounded with challenges."
    }, {
      name: "Agile Decision Maker",
      icon: <img src="assets/img/agile-decision-maker.png" alt="module icon" />,
      copy: "You make sound decisions with awareness of the impact on the organisation and customer. You take accountability and responsibility of your decisions."
    }, {
      name: "People Leader",
      icon: <img src="assets/img/people-leader.png" alt="module icon" />,
      copy: "You you understand drive achievement through collaboration. You create the best culture possible to serve the public in the best way."
    }, {
      name: "Performance Driver",
      icon: <img src="assets/img/performance-driver.png" alt="module icon" />,
      copy: "You focus on outcomes and take responsibility for how you and your team deliver. You stretch and challenges yourself and others to drive great service."
    }];

    let values = [{
      name: "Customer Focus",
      icon: <img src="assets/img/customer-focus-white.png" alt="values icon" />,
      copy: "We never forget that we are here to serve the public and we develop services to meet their needs efficiently and provide value for money."
    }, {
      name: "Constantly Improving",
      icon: <img src="assets/img/contantly-improving-white.png" alt="values icon" />,
      copy: "We aim to be better, challenging habits and learning from mistakes."
    }, {
      name: "Better Together",
      icon: <img src="assets/img/better-together-white.png" alt="values icon" />,
      copy: "We work across boundaries and departments to deliver a better future for Jersey."
    }, {
      name: "Always Respectful",
      icon: <img src="assets/img/always-respectful-white.png" alt="values icon" />,
      copy: "We care about people as individuals and always treat them with respect."
    }, {
      name: "We Deliver",
      icon: <img src="assets/img/we-always-deliver-white.png" alt="values icon" />,
      copy: "We take responsibility, act responsibly and always do what we say."
    }];

    return (
      <div className="leadership-programme">
        <div className="intro">
          <div className="inner">
            <h1>Your Leadership Programme</h1>
            <p>As an organisation, we are facing unprecedented change and need to rethink the way we provide public service to our customers across the Island. We cannot do this with the same mindset and approaches we have used in the past and it now time for us to develop and enhance the skills and confidence to lead our organisation in a new way. The Managers to Leaders programme is our collective step towards this vision.</p>
          </div>
        </div>
        <div className="our-values">
          <div className="inner">
            <h1>Powered by our Values</h1>
            <p>Our values are key to the way we act towards each other and how we interact with our customers every day.</p>
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
              <p>We have spent time with managers and leaders across States of Jersey to understand the challenges you are facing in your roles and what skills gaps there are. The programme is designed specifically to address these.</p>
            </div>
          </div>
          <div className="col-sm-6 right-column">
            <div className="inner">
              <div className="circle">
                <p><i className="fa fa-question"></i></p>
              </div>
              <h3>What's in it for me?</h3>
              <p>A 9 month blended development programme comprising a range of learning activities including 1 to 1 coaching. It’s a unique opportunity to develop and build your leadership skills as well as network with your peers.</p>
            </div>
          </div>
        </div>
        <div className="qualities">
          <div className="inner">
            <h1>Our 5 Essential Leadership Qualities</h1>
            <p>Each module is based around a leadership principle which is designed to build your confidence and ability to deliver the highest quality public service.</p>
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
            <p>We have put together a blended programme which is made up of workshops, webinars, coaching and a live business challenge.</p>
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
                <p>These face-to-face workshops will be highly experiential with lots of hands on activities and opportunities for practice as well as time for discussion and reflection with your fellow participants.</p>
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
                <p>These one-to-one telephone sessions provide you with the opportunity to work through  any challenges or areas that you would benefit from a more detailed discussion with a coach.</p>
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
                <p>These 90 minute ‘virtual classroom’ sessions are hosted online so you will have flexibility to join the webinar from a location to suit you. The webinars are all highly participatory and interactive.</p>
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
            <LearningJourneyWidget journeyModules={this.props.modules} smallWidget={this.props.profile === 'sm'}/>
          </div>
        </div>
        <div className="message-from">
          <div className="inner">
            <h1>A Message from the Executive Board</h1>
            <Video url="https://vimeo.com/150919913/" />
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
