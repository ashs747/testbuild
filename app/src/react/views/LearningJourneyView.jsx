import React from 'react';
import LearningJourneyTable from '../components/LearningJourneyTable.jsx';
import {learningJourneyAction} from '../../redux/actions/learningJourneyActions';
export default class extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
    this.props.dispatch(learningJourneyAction(1416, 1));
  }

  render() {
    var learningJournies = this.props.learningJourney.learningJourneyModules.map((journeyModule, i) => {
      return (
        <div>
          <h2>
            Module {i + 1}
          </h2>
          <LearningJourneyTable journeyModule={journeyModule} key={i} />
        </div>);
    });
    return (
      <div className="personal-learning-journey">
        {learningJournies}
      </div>
    );
  }
}
