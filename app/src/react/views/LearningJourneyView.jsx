import React from 'react';
import LearningJourneyTable from '../modules/personalLearningJourney/LearningJourneyTable.jsx';
import {learningJourneyAction} from '../../redux/actions/learningJourneyActions';
import {connect} from 'react-redux';
import _ from 'underscore';

import {learningJourneyContent} from '../../content.js';

class LearningJourneyView extends React.Component {

  constructor() {
    super();
  }

  render() {
    let i = 1;
    let learningJourneyReactArray = [];

    for (let key in this.props.modules) {
      if (this.props.modules.hasOwnProperty(key)) {
        learningJourneyReactArray.push((
          <div className="plj-table" key={key}>
            <h4>Module {i}</h4>
            <LearningJourneyTable journeyModule={this.props.modules[key]} smallTable={this.props.width === "sm"} showIcon={this.props.width === "lg"} accessToken={this.props.accessToken} supportUrl={this.props.supportUrl}/>
          </div>
        ));
        i++;
      }
    }

    return (
      <div className="personal-learning-journey">
        <div className="header">
          <div className="text">
            <h2>Your learning journey</h2>
          </div>
        </div>
        <div className="body">
          {learningJourneyContent.body(this.props.supportUrl)}
          {learningJourneyReactArray}
        </div>
      </div>
    );
  }
}

function maplearningJourneyViewProps(state) {
  return {
    modules: state.learningJourney,
    width: state.width.profile,
    supportUrl: state.programme.supportUrl,
    accessToken: state.auth.access_token
  };
}
let mappedLearningJourneyView = connect(maplearningJourneyViewProps)(LearningJourneyView);

export default mappedLearningJourneyView;
