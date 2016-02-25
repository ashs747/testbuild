import React from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';
import FeedWidget from '../modules/feed/Widget.jsx';
import TabStack from '../legacy/TabStack.jsx';
import LearningJourneyTable from '../modules/personalLearningJourney/LearningJourneyTable.jsx';
import Carousel from '../components/Carousel.jsx';
import Markdown from 'react-remarkable';

function mapHomeFeedProps(state) {
  return {
    context: 'programme',
    feeds: state.feeds,
    profile: "sm",
    showComments: true,
    showEmbedVideo: true,
    profilePic: state.user.profilePic,
    title: "Programme feed",
    subTitle: "Everyone on the programme can view, post or comment here. We’ll post links and videos to enrich your development and share news about the leadership programme."
  };
};

class ModuleView extends React.Component {

  constructor() {
    super();
    this.HomeFeed = connect(mapHomeFeedProps)(FeedWidget);
  }

  render() {
    let module = this.getModuleFromRouteId(this.props.modules, this.props.params.module);
    if (!module) {
      return <div />;
    }
    let ljt = <LearningJourneyTable journeyModule={module} smallTable={this.props.profile === "sm"} accessToken={this.props.accessToken} />;
    let items = module.files.map(file => {
      var reference = '#';
      if (file && file.metadata) {
        file.metadata.forEach(meta => {
          if (meta.key === "url") {
            reference = meta.value;
          }
        });
      }
      return {
        backgroundImage: reference
      };
    });
    let moduleSlug = module.name.replace(/\s+/g, '-').toLowerCase();
    let icon = <img src={`assets/img/${moduleSlug}.png`} alt="module icon" />;
    let carousel = <Carousel context={`module-${module.id}`} items={items} defineWidthClass="col-xs-8 col-xs-offset-2"/>;
    let leftbar = (
      <div>
        <div className="module-carousel">
          {carousel}
        </div>
        <div className="left-content">
          {ljt}
          <div className="module-content">
            <h2>{module.name}</h2>
            <Markdown source={module.content} options={{html: true}}/>
          </div>
        </div>
      </div>
    );
    let bodyContent = (() => {
      switch (this.props.profile) {
        case 'lg':
          return (
            <div className="main clearfix">
              <div className="col-sm-8 left-bar">
                {leftbar}
              </div>
              <div className="col-sm-4 right-bar">
                <this.HomeFeed />
              </div>
            </div>
          );
          break;
        default:
          let tab1 = (<div label="Overview" tabClass="tab-btn" key="tab1">{leftbar}</div>);
          let tab2 = (<div label="Feed" tabClass="tab-btn" key="tab2"><this.HomeFeed /></div>);
          let tabs = [tab1, tab2];
          return (
            <TabStack ref="moduleTabs" className="module-tabs" selectedIndex={0}>
              {tabs}
            </TabStack>
          );
          break;
      }
    })();
    return (
      <div className="module-view">
        <div className="header-top clearfix">
          <div className="col-sm-2">
            <div className="icon">
              {icon}
            </div>
          </div>
          <div className="col-sm-10">
            <h2>{`Module ${this.props.params.module} - ${module.name}`}</h2>
          </div>
        </div>
        {bodyContent}
      </div>
    );
  }

  getModuleFromRouteId(modules, moduleID) {
    let module = null;
    _.mapObject(modules, (mod, key) => {
      if (mod.moduleId === parseInt(moduleID, 10)) {
        module = mod;
      }
    });
    return module;
  }
}

function mapModuleProps(state) {
  return {
    modules: state.learningJourney,
    profile: state.width.profile,
    accessToken: state.auth.access_token
  };
}

let mappedModuleView = connect(mapModuleProps)(ModuleView);

export default mappedModuleView;
