import React from 'react';
import {dispatch} from '../../redux/store';
import TabStack from 'cirrus/react/components/TabStack';
import {connect} from 'react-redux';
import moment from 'moment-timezone';
import LearningJourneyWidget from '../modules/personalLearningJourney/LearningJourneyWidget.jsx';
import Carousel from '../components/Carousel.jsx';
import Store from '../../redux/store';
import FeedWidget from '../modules/feed/Widget.jsx';
import {fetchLatestFeedMessages} from '../../redux/actions/feedActions';
var feedID;

function mapHomeFeedProps(state) {
  return {
    context: 'programme',
    feeds: state.feeds,
    profile: "sm",
    showComments: true,
    showEmbedVideo: true
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
    let modules = [{
      name: "Module 1 - Lorem ipsum dolor sit amet",
      startDate: moment('2015-09-01'),
      endDate: moment('2015-10-01'),
      activities: []
    }, {
      name: "Module 2 - Lorem ipsum dolor sit amet",
      startDate: moment('2015-10-01'),
      endDate: moment('2015-11-01'),
      activities: []
    }, {
      name: "Module 3 - Lorem ipsum dolor sit amet",
      startDate: moment('2015-11-01'),
      endDate: moment('2015-12-01'),
      activities: []
    }, {
      name: "Module 4 - Lorem ipsum dolor sit amet",
      startDate: moment('2015-12-01'),
      endDate: moment('2016-01-01'),
      activities: []
    }, {
      name: "Module 5 - Lorem ipsum dolor sit amet",
      startDate: moment('2016-01-01'),
      endDate: moment('2016-02-01'),
      activities: []
    }];

    let learningJourney = (
      <div className="home-learning">
        <div className="learning-journey">
          <h5>Your learning journey</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <LearningJourneyWidget journeyModules={modules} smallWidget={this.props.profile === 'sm'}/>
          <h6>VIEW DETAILED LEARNING JOURNEY <i className="fa fa-chevron-right"></i></h6>
        </div>
        <div className="grid-links">
          <div className="col-sm-6 grid-panel featured">
            <div className="inner">
              <h5>Featured tools</h5>
              <Carousel items={carouselItems} hideArrows={true} defineWidthClass="col-xs-10 col-xs-offset-1" />
            </div>
          </div>
          <div className="col-sm-6 grid-panel programme">
            <div className="inner">
              <h5>Programme</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nisl diam, tincidunt venenatis ante aliquam, vestibulum feugiat lectus. Curabitur ac.</p>
              <div className="find-out-more">
                <h6>FIND OUT MORE</h6>
              </div>
            </div>
          </div>
          <div className="col-sm-6 grid-panel help">
            <div className="inner">
              <h5>Need help?</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nisl diam, tincidunt venenatis ante aliquam, vestibulum feugiat lectus. Curabitur ac.</p>
              <div className="find-out-more">
                <h6>FIND OUT MORE</h6>
              </div>
            </div>
          </div>
          <div className="col-sm-6 grid-panel log">
            <div className="inner">
              <h5>Your learning log</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nisl diam, tincidunt venenatis ante aliquam, vestibulum feugiat lectus. Curabitur ac.</p>
              <div className="find-out-more-red">
                <h6>FIND OUT MORE</h6>
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
          let tab2 = (<div label="Feed" tabClass="tab-btn" key="tab2"><HomeFeed /></div>);
          let tabs = [tab1, tab2];
          return (
            <TabStack ref="homeTabs" className="home-tabs" selectedIndex={0}>
              {tabs}
            </TabStack>
          );
          break;
      }
    })();
    return (
      <div className="home">
        <div className="header">
          <div className="inner">
            <img src="assets/img/profile-placeholder.jpg" />
            <h1>Welcome back John</h1>
            <p>Join the discussion, collaborate with people in your group</p>
            <div className="go-to-alz">
              <p>GO TO ACTION LEARNING ZONE</p>
            </div>
          </div>
        </div>
        {bodyContent}
      </div>
    );
  }

}

function mapHomeProps(state) {
  return {
    profile: state.width.profile,
  };
};

let mappedHomeView = connect(mapHomeProps)(HomeView);
export default mappedHomeView;
