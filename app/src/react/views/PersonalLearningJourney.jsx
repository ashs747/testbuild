import React from 'react';
import PersonalLearningJourney from '../components/PersonalLearningJourney.jsx';

export default class extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="personal-learning-journey">
        <PersonalLearningJourney />
      </div>
    );
  }
}
