import React from 'react';
import {dispatch} from '../../redux/store';
import TabStack from 'cirrus/react/components/TabStack';
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
    profilePic: state.user.profilePic
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
          <h5>Your learning journey</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <LearningJourneyWidget journeyModules={this.props.modules} smallWidget={this.props.profile === 'sm'}/>
          <h6><a href="/#/personal-learning-journey">VIEW DETAILED LEARNING JOURNEY</a><i className="fa fa-chevron-right"></i></h6>
        </div>
        <div className="grid-links">
          <div className="col-sm-6 grid-panel featured">
            <div className="inner">
              <h5>Featured tools</h5>
              <Carousel context="tools" items={carouselItems} hideArrows={true} defineWidthClass="col-xs-10 col-xs-offset-1" />
            </div>
          </div>
          <div className="col-sm-6 grid-panel programme">
            <div className="inner">
              <h5>Programme</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nisl diam, tincidunt venenatis ante aliquam, vestibulum feugiat lectus. Curabitur ac.</p>
              <div className="find-out-more">
                <h6><a href="/#/programme">FIND OUT MORE</a></h6>
              </div>
            </div>
          </div>
          <div className="col-sm-6 grid-panel help">
            <div className="inner">
              <h5>Need help?</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nisl diam, tincidunt venenatis ante aliquam, vestibulum feugiat lectus. Curabitur ac.</p>
              <div className="find-out-more">
                <h6><a href={this.props.supportUrl}>FIND OUT MORE</a></h6>
              </div>
            </div>
          </div>
          <div className="col-sm-6 grid-panel log">
            <div className="inner">
              <h5>Your learning log</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nisl diam, tincidunt venenatis ante aliquam, vestibulum feugiat lectus. Curabitur ac.</p>
              <div className="find-out-more-red">
                <h6><a href="#">FIND OUT MORE</a></h6>
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
              <p>Join the discussion, collaborate with people in your group</p>
              <div className="go-to-alz">
                <a href="/#/action-learning-zone">GO TO ACTION LEARNING ZONE</a>
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
