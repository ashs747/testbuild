import React from 'react';
import PersonalLearningJourney from '../components/PersonalLearningJourney.jsx';
import {learningJourneyAction} from '../../redux/actions/learningJourneyActions';
export default class extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
    //console.log(this.props);
    this.props.dispatch(learningJourneyAction(1416, 1));
  }

  render() {
    console.log(this.props.learningJourneyModules);
    var learningJournies = this.props.learningJourneyModules.map((journeyModule, idx) => {
      return (
        <div>
          <h2>Module {idx + 1}</h2>
          <PersonalLearningJourney journeyModule={journeyModule} />
        </div>);
    });
    return (
      <div className="personal-learning-journey">
        {learningJournies}
      </div>
    );
  }
}
