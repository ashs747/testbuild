import React from 'react';
import {connect} from 'react-redux';
import {getActivityContent} from '../../redux/actions/contentActions';
import {dispatch} from '../../redux/store';
import LearningJourneyTable from '../modules/personalLearningJourney/LearningJourneyTable.jsx';
import ResourceWidget from '../modules/resource/Widget.jsx';
import TabStack from 'cirrus/react/components/TabStack';
import Markdown from 'react-remarkable';

class ActivityView extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    dispatch(getActivityContent(this.props.params.activity));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.activity !== this.props.params.activity) {
      dispatch(getActivityContent(this.props.params.activity));
    }
  }

  render() {
    if (!this.props.content) {
      return <div />;
    }
    let smallTable = (this.props.profile === "sm");
    let ljt = (this.props.content.journeyModule) ? <LearningJourneyTable journeyModule={this.props.content.journeyModule} smallTable={smallTable} /> : null;
    let resources = (
      <div>
        <ResourceWidget title="Pre-work" resources={this.props.content.preWork} />
        <ResourceWidget title="Resources" resources={this.props.content.resources} />
        <ResourceWidget title="Course notes and recordings" resources={this.props.content.courseNotes} />
      </div>
    );
    let overview = (
      <div className="overview">
        <h3>Your learning journey</h3>
        {ljt}
        <div className="overview-inner">
          <h3>Overview and objectives</h3>
          <Markdown source={this.props.content.content} />
        </div>
      </div>
    );
    let bodyContent = (() => {
      switch (this.props.profile) {
        case 'lg':
          return (
            <div className="main clearfix">
              <div className="col-sm-8 left-bar">
                {overview}
              </div>
              <div className="col-sm-4 right-bar">
                {resources}
              </div>
            </div>
          );
          break;
        default:
          let tab1 = (<div label="Overview" tabClass="tab-btn" key="tab1">{overview}</div>);
          let tab2 = (<div label="Resources" tabClass="tab-btn" key="tab2">{resources}</div>);
          let tabs = [tab1, tab2];
          return (
            <TabStack ref="activityTabs" className="activity-tabs" selectedIndex={0}>
              {tabs}
            </TabStack>
          );
          break;
      }
    })();

    return (
      <div className="activity-view">
        <div className="header clearfix">
          <div className="col-sm-2">
            <div className="icon">
              <span><i className={`fa fa-${this.props.content.icon}`}></i></span>
            </div>
          </div>
          <div className="col-sm-10">
            <h3>{this.props.content.journeyModule.name}</h3>
            <h1>{this.props.content.title}</h1>
          </div>
        </div>
        {bodyContent}
      </div>
    );
  }

}

function mapActivityViewProps(state) {
  return {
    profile: state.width.profile,
    content: state.content.activity ? state.content.activity : null
  };
};
let mappedActivityView = connect(mapActivityViewProps)(ActivityView);

export default mappedActivityView;
