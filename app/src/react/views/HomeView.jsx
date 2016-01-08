import React from 'react';
import {dispatch} from '../../redux/store';
import TabStack from '../legacy/TabStack.jsx';
import {connect} from 'react-redux';
import moment from 'moment-timezone';
import LearningJourneyWidget from '../modules/personalLearningJourney/LearningJourneyWidget.jsx';
import Carousel from '../components/Carousel.jsx';
import CloudinaryImg from '../components/CloudinaryImg.jsx';
import Store from '../../redux/store';
import FeedWidget from '../modules/feed/Widget.jsx';
import {fetchLatestFeedMessages} from '../../redux/actions/feedActions';
import _ from 'underscore';
var feedID;

function mapHomeFeedProps(state) {
  return {
    context: 'programme',
    feeds: state.feeds,
    profile: "sm",
    showComments: true,
    showEmbedVideo: true,
    profilePic: state.user.profilePic,
    title: "Programme Feed"
  };
};

class HomeView extends React.Component {
  constructor() {
    super();
    this.HomeFeed = connect(mapHomeFeedProps)(FeedWidget);
  }

  render() {

    let carouselItems = [{
      icon: "",
      copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }, {
      icon: "",
      copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }, {
      icon: "",
      copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }, {
      icon: "",
      copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }];

    let learningJourney = (
      <div className="home-learning">
        <div className="learning-journey">
          <h4 className="semi-bold">Your learning journey</h4>
          <p>Keep track of your progress as you go through the programme. Click on any of the modules for more detail of the workshops, webinars, coaching and projects in each. You can also see a timetable of all the events in programme <u><b>here ></b></u>.</p>
          <LearningJourneyWidget journeyModules={this.props.modules} smallWidget={this.props.profile === 'sm'}/>
          <h6 className="red-link"><u><b><a href="/#/personal-learning-journey">VIEW DETAILED LEARNING JOURNEY ></a></b></u></h6>
        </div>
        <div className="grid-links">
          <div className="col-sm-6 grid-panel featured">
            <div className="inner">
              <h4 className="semi-bold">Featured tools</h4>
              <Carousel context="tools" items={carouselItems} hideArrows={true} defineWidthClass="col-xs-10 col-xs-offset-1" />
            </div>
          </div>
          <div className="col-sm-6 grid-panel programme">
            <div className="inner">
              <h4><b>Your leadership programme</b></h4>
              <p className="semi-bold">We've designed this programme all around you.</p>
              <div className="find-out-more">
                <h6><b><a href="/#/programme">FIND OUT MORE</a></b></h6>
              </div>
            </div>
          </div>
          <div className="col-sm-6 grid-panel help">
            <div className="inner">
              <h4><b>Need help?</b></h4>
              <p className="semi-bold">View knowledge base articles or contact the programme support team.<br />We’re here to help.</p>
              <div className="find-out-more">
                <h6><b><a href={this.props.supportUrl}>FIND OUT MORE</a></b></h6>
              </div>
            </div>
          </div>
          <div className="col-sm-6 grid-panel log">
            <div className="inner">
              <h4 className="semi-bold">Your learning log</h4>
              <p>Use this to reflect on your own progress and with your line manager in your PDP.</p>
              <div className="find-out-more-red">
                <h6><b><a href="#">FIND OUT MORE</a></b></h6>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
    let bodyContent = (() => {
      switch (this.props.profile) {
        case 'lg':
          return (
            <div className="row">
              <div className="col-sm-8 left-bar">
                {learningJourney}
              </div>
              <div className="col-sm-4 right-bar">
                <this.HomeFeed />
              </div>
            </div>
          );
          break;
        default:
          let tab1 = (<div label="Learning Journey" tabClass="tab-btn" key="tab1">{learningJourney}</div>);
          let tab2 = (<div label="Feed" tabClass="tab-btn" key="tab2"><this.HomeFeed /></div>);
          let tabs = [tab1, tab2];
          return (
            <TabStack ref="homeTabs" className="home-tabs" selectedIndex={0}>
              {tabs}
            </TabStack>
          );
          break;
      }
    })();
    if (this.props.user) {
      return (
        <div className="home">
          <div className="header-page">
            <div className="inner">
              <CloudinaryImg file={this.props.user.profilePic} defaultImg="assets/img/profile-placeholder.jpg"/>
              <h1>Welcome back {this.props.user.forename}</h1>
              <p className="semi-bold">Join the discussion, collaborate with people in your group</p>
              <div className="go-to-alz">
                <a href="/#/action-learning-zone"><h6><b>GO TO ACTION LEARNING ZONE</b></h6></a>
              </div>
            </div>
          </div>
          {bodyContent}
        </div>
      );
    }
    return <div/>;
  }

}

function mapHomeProps(state) {
  return {
    profile: state.width.profile,
    modules: state.learningJourney,
    user: state.user,
    supportUrl: state.programme.supportUrl
  };
};

let mappedHomeView = connect(mapHomeProps)(HomeView);
export default mappedHomeView;
