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
      copy: "Leaders should be engaging, great communicators and listeners, authentic and open, and respectful to others."
    }, {
      name: "Ambassador for Change",
      icon: <img src="assets/img/ambassador-for-change.png" alt="module icon" />,
      copy: "Leaders should advocate change, be resilient and agile, drive continuous improvement, be courageous and bold."
    }, {
      name: "Agile Decision Maker",
      icon: <img src="assets/img/agile-decision-maker.png" alt="module icon" />,
      copy: "Leaders should do things for the right reasons, empower others to make independent decisions and be accountable."
    }, {
      name: "People Leader",
      icon: <img src="assets/img/people-leader.png" alt="module icon" />,
      copy: "Leaders should motivate and support others, nurture talent, and be aware of their own strengths and areas needing development."
    }, {
      name: "Performance Driver",
      icon: <img src="assets/img/performance-driver.png" alt="module icon" />,
      copy: "Leaders should be focused on outcomes, effective and efficient, work smarter not harder, and set and deliver ambitious goals for themselves and others."
    }];

    let values = [{
      name: "Customer Focus",
      icon: <img src="assets/img/customer-focus-white.png" alt="values icon" />,
      copy: "We should never forget that we are here to serve the public, develop services to meet their needs efficiently, and provide value for money."
    }, {
      name: "Constantly Improving",
      icon: <img src="assets/img/contantly-improving-white.png" alt="values icon" />,
      copy: "We should always aim to be better, challenge habits and learn from mistakes."
    }, {
      name: "Better Together",
      icon: <img src="assets/img/better-together-white.png" alt="values icon" />,
      copy: "We work across boundaries and departments to deliver a better future for Jersey."
    }, {
      name: "Always Respectful",
      icon: <img src="assets/img/always-respectful-white.png" alt="values icon" />,
      copy: "We should care about people as individuals and always treat them with respect."
    }, {
      name: "We Deliver",
      icon: <img src="assets/img/we-always-deliver-white.png" alt="values icon" />,
      copy: "We should take responsibility, act responsibly and always do what we say."
    }];

    return (
      <div className="leadership-programme">
        <div className="intro">
          <div className="inner">
            <h1>Your leadership programme</h1>
            <p>As an organisation, we are facing unprecedented change and need to rethink the way we provide public service to our customers across the Island. We cannot do this with the same mindset and approaches we have used in the past and it is now time for us to develop and enhance the skills and confidence to lead our organisation in a different way. The Managers to Leaders programme is our collective step towards this vision.</p>
          </div>
        </div>
        <div className="our-values">
          <div className="inner">
            <h1>Powered by our values</h1>
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
              <p>We have spent time with leaders and managers across States of Jersey to understand the challenges you are facing in your roles and what skills gaps there are. The programme is designed specifically to address these.</p>
            </div>
          </div>
          <div className="col-sm-6 right-column">
            <div className="inner">
              <div className="circle">
                <p><i className="fa fa-question"></i></p>
              </div>
              <h3>What's in it for me?</h3>
              <p>A 9-month blended development programme comprising a range of learning activities including one-to-one coaching. It’s a unique opportunity to develop and build your leadership skills as well as network with your peers.</p>
            </div>
          </div>
        </div>
        <div className="qualities">
          <div className="inner">
            <h1>Our 5 essential Leadership Qualities</h1>
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
            <h1>A blended learning approach</h1>
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
                <p>These face-to-face workshops will be highly experiential with lots of hands on activities and opportunities for practice, as well as time for discussion and reflection with your fellow participants.</p>
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
                <p>These one-to-one confidential telephone sessions provide you with the opportunity to work through any challenges in a detailed discussion with your coach.</p>
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
                <p>These 90-minute ‘virtual classroom’ sessions are hosted online so you will have flexibility to join the webinar from a location to suit you. The webinars are all highly participatory and interactive.</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 development">
            <div className="box-inner">
              <div className="icon">
                <i className="fa fa-briefcase"></i>
              </div>
              <div className="text">
                <h5>Action Learning</h5>
                <p>Action Learning is a useful approach to support the transfer of learning from the classroom to the workplace, applying insights to real work challenges.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="roadmap">
          <div className="inner">
            <h1>Your development roadmap</h1>
            <LearningJourneyWidget journeyModules={this.props.modules} smallWidget={this.props.profile === 'sm'}/>
          </div>
        </div>
        <div className="message-from">
          <div className="inner">
            <h1>A message from the Corporate Management Board</h1>
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
