import React from 'react';
import LearningJourneyTable from '../components/LearningJourneyTable.jsx';
import {learningJourneyAction} from '../../redux/actions/learningJourneyActions';

class LearningJourneyView extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
    this.props.dispatch(learningJourneyAction(1244, 1));
  }

  render() {
    var learningJournies = this.props.learningJourney.learningJourneyModules.map((journeyModule, i) => {
      return (
        <div key={i}>
          <h2>Module {i + 1}</h2>
          <LearningJourneyTable journeyModule={journeyModule} />
        </div>);
    });
    return (
      <div className="personal-learning-journey">
        {learningJournies}
      </div>
    );
  }
}

export default LearningJourneyView;