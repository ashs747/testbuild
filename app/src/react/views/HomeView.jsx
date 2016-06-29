import React from 'react';
import dispatch from '../../redux/store';
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
import HomePageTwoUpPanel from '../components/HomePageTwoUpPanel.jsx';

var feedID;
var store = dispatch.store;

import {homeContent} from '../../content.js'

function mapHomeFeedProps(state) {
  return {
    context: 'programme',
    feeds: state.feeds,
    profile: "sm",
    showComments: true,
    showEmbedVideo: true,
    profilePic: state.user.profilePic,
    title: "Programme feed",
    subTitle: homeContent.messageFeed
  };
};

class HomeView extends React.Component {
  constructor() {
    super();
    this.HomeFeed = connect(mapHomeFeedProps)(FeedWidget);
  }

  render() {
    let featuredToolkits = (this.props.toolkits) ? this.props.toolkits.filter(toolkit => toolkit.featured) : [];
    let carouselItems = featuredToolkits.map(toolkit => {
      return {
        icon: <CloudinaryImg file={toolkit.icon} disableAnchor={true}/>,
        copy: <a href={`/#/toolkit/${toolkit.slug}`}>{toolkit.title}</a>
      };
    });

    let learningJourney = (
      <div className="home-learning">
        <div className="learning-journey">
          <h4 className="semi-bold">{homeContent.learningJourneyHeader}</h4>
          {homeContent.learningJourney}
          <LearningJourneyWidget journeyModules={this.props.modules} smallWidget={this.props.profile === 'sm'}/>
          <h6 className="red-link"><a href="/#/personal-learning-journey">VIEW DETAILED LEARNING JOURNEY ></a></h6>
        </div>

       <div className="grid-links">
          <HomePageTwoUpPanel
            titleText = "Featured tools"
            backgroundClass = "featured">

            <Carousel context="tools" items={carouselItems} hideArrows={true} defineWidthClass="col-xs-10 col-xs-offset-1" />
          </HomePageTwoUpPanel>
          
          <HomePageTwoUpPanel
            centerVertical = {true}
            titleText = "Your leadership programme"
            bodyText = "We've designed this programme all around you."
            buttonLink = "/#/programme"
            buttonText = "FIND OUT MORE"
            buttonClass = "find-out-more"
            backgroundClass = "tile-1-background"
          />
          
          <HomePageTwoUpPanel
            centerVertical = {true}
            titleText = "Need Help"
            bodyText = "Contact the programme support team.
                        We’re here to help."
            buttonLink = "/#/programme"
            buttonText = "FIND OUT MORE"
            buttonClass = "find-out-more"
            backgroundClass = "tile-2-background"
           />
             
          <HomePageTwoUpPanel
            titleText = "Virtual Ashridge"
            backgroundClass = "log"
            bodyText = "Please select a link below to access your customised Virtual Ashridge learning materials."
            topImage = {<img src="assets/img/hult-logo.png" alt="Virtual Ashridge" />}
            >
             <div className="col-sm-6">
                <a href="http://mbcurl.me/12T1J">Education users ></a>
              </div>
              <div className="col-sm-6">
                <a href="https://tinyurl.com/kpqsx5e">Everyone else ></a>
              </div>
            </HomePageTwoUpPanel>

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
          <div className="header-page home-banner">
            <div className="inner">
              <a href="/#/profile">
                <CloudinaryImg file={this.props.user.profilePic} defaultImg="assets/img/profile-placeholder.jpg" disableAnchor={true} />
              </a>
              <h1>Welcome back {this.props.user.forename}</h1>
              <p className="semi-bold">{homeContent.headerSubText}</p>
              <div className="go-to-alz">
                <a href="/#/my-cohort"><h6><b>GO TO MY COHORT</b></h6></a>
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
    supportUrl: state.programme.supportUrl,
    toolkits: state.content.toolkits
  };
};

let mappedHomeView = connect(mapHomeProps)(HomeView);
export default mappedHomeView;
