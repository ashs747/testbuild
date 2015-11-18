import React from 'react';
import LearningJourneyTable from '../modules/personalLearningJourney/LearningJourneyTable.jsx';
import {learningJourneyAction} from '../../redux/actions/learningJourneyActions';
import Widget from '../modules/resource/Widget.jsx';
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
        <div key={key}>
          <h2>Module {i}</h2>
          <LearningJourneyTable journeyModule={module} />
        </div>
      );
    });
    return (
      <div className="personal-learning-journey">
        {learningJournies}
        <Widget />
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
