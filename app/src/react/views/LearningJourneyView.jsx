import React from 'react';
import LearningJourneyTable from '../modules/personalLearningJourney/LearningJourneyTable.jsx';
import {learningJourneyAction} from '../../redux/actions/learningJourneyActions';
import {connect} from 'react-redux';
import _ from 'underscore';

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
            <LearningJourneyTable journeyModule={this.props.modules[key]} smallTable={this.props.width === "sm"} showIcon={this.props.width === "lg"}/>
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
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
          </div>
        </div>
        <div className="body">
          {learningJourneyReactArray}
        </div>
      </div>
    );
  }
}

function maplearningJourneyViewProps(state) {
  return {
    modules: state.learningJourney,
    width: state.width.profile
  };
}
let mappedLearningJourneyView = connect(maplearningJourneyViewProps)(LearningJourneyView);

export default mappedLearningJourneyView;
