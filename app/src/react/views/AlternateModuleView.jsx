import React from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';
import ResourceWidget from '../modules/resource/Widget.jsx';
import Top10Widget from '../modules/connectionsWall/Top10Widget.jsx';
import TabStack from '../legacy/TabStack.jsx';
import LearningJourneyTable from '../modules/personalLearningJourney/LearningJourneyTable.jsx';
import Carousel from '../components/Carousel.jsx';

class AlternateModuleView extends React.Component {

  constructor() {
    super();
  }

  render() {
    let module = this.getModuleFromRouteId(this.props.modules, this.props.params.module);
    if (!module) {
      return <div />;
    }

    const wallObject = this.getWallObject(this.props.walls, module.activities[Object.keys(module.activities)[0]].id);

    let ljt = <LearningJourneyTable journeyModule={module} smallTable={this.props.profile === "sm"} accessToken={this.props.accessToken} supportUrl={this.props.supportUrl}/>;
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
            <span className="module-title">Your steps...</span>
          </div>
          <div className="module-content">
            <span className="module-title">More information</span>
            <div dangerouslySetInnerHTML={{__html: module.content}}/>
          </div>
        </div>
      </div>
    );
    let connectionsWidget = (
      <div>
        <Top10Widget wall={wallObject}/>
        <a href="">
          <img className="connections-wall-image" href="" src=""/>
        </a>
      </div>
    )
    let bodyContent = (() => {
      switch (this.props.profile) {
        case 'lg':
          return (
            <div className="main clearfix">
              <div className="col-sm-8 left-bar">
                {leftbar}
              </div>
              <div className="col-sm-4 right-bar">
                {connectionsWidget}
                <ResourceWidget title="Resources" resources={[]}/>
              </div>
            </div>
          );
          break;
        default:
          let tab1 = (<div label="Overview" tabClass="tab-btn" key="tab1">{leftbar}</div>);
          let tab2 = (<div label="Connections Wall" tabClass="tab-btn" key="tab2">{connectionsWidget}</div>);
          let tab3 = (<div label="Resources" tabClass="tab-btn" key="tab3"><ResourceWidget title="Resources" resources={[]}/></div>);
          let tabs = [tab1, tab2, tab3];
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
        <div className="header-top clearfix" style={{backgroundImage: `url("assets/img/banner-${moduleSlug}.jpg")`}}>
          <div className="icon">
            {icon}
          </div>
          <h4>Module {this.props.params.module}</h4>
          <h2>{module.name}</h2>
        </div>
        {bodyContent}
      </div>
    );
  }

  getWallObject(walls, moduleId) {
    let wallObject = null;
    for (let wall in walls) {
      if (walls.hasOwnProperty(wall)) {
        if (walls[wall].activityId === moduleId) {
          wallObject = walls[wall];
        }
      }
    }
    return wallObject;
  }

  getModuleFromRouteId(modules, moduleNumber) {
    let module = null;
    _.mapObject(modules, (mod, key) => {
      if (mod.moduleNumber === parseInt(moduleNumber, 10)) {
        module = mod;
      }
    });
    return module;
  }
}

function mapModuleProps(state) {
  return {
    walls: state.wall,
    modules: state.learningJourney,
    profile: state.width.profile,
    accessToken: state.auth.access_token,
    supportUrl: state.programme.supportUrl
  };
}

let mappedAlternateModuleView = connect(mapModuleProps)(AlternateModuleView);

export default mappedAlternateModuleView;
