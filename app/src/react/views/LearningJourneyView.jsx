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
    let i = 0;
    let learningJournies = _.mapObject(this.props.modules, (module, key) => {
      i++;
      return (
        <div className="plj-table" key={key}>
          <h2>Module {i}</h2>
          <LearningJourneyTable journeyModule={module} />
        </div>
      );
    });
    return (
      <div className="personal-learning-journey">
        <div className="header">
          <div className="text">
            <h1>Your learning journey</h1>
            <h6>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h6>
          </div>
        </div>
        <div className="body">
          {learningJournies}
        </div>
      </div>
    );
  }
}

function maplearningJourneyViewProps(state) {
  return {
    modules: state.learningJourney
  };
}
let mappedLearningJourneyView = connect(maplearningJourneyViewProps)(LearningJourneyView);

export default mappedLearningJourneyView;
