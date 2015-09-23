import React from 'react';
import LearningJourneyTable from '../components/LearningJourneyTable.jsx';
import {learningJourneyAction} from '../../redux/actions/learningJourneyActions';

class ModuleView extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
    this.props.dispatch(learningJourneyAction(this.props.auth.currentUser, 1));
  }

  render() {
    var learningJournies = this.props.learningJourney.learningJourneyModules.map((journeyModule, i) => {
      if (journeyModule.id == this.props.params.module) {
        return (
          <div key={i}>
            <h2>Module {i + 1}</h2>
            <LearningJourneyTable journeyModule={journeyModule} />
          </div>);
      }
    });
    return <div className="module-hub">

        <div className="heading grey-container">
          <div className="row">
            <div className="col-sm-2">
              <div className="module-icon">
              </div>
            </div>
            <div className="col-sm-10">
              <p>Module 3</p>
              <p>Brave Decision Maker</p>
            </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-8">
          <div className="about-section grey-container">
            <h2>About this module</h2>
            <p>Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Sed posuere consectetur est at lobortis. Maecenas faucibus mollis interdum.Donec sed odio dui. Donec id elit non mi porta gravida at eget metus. Nulla vitae elit libero, a pharetra augue. Donec ullamcorper nulla non metus auctor ue ornare sem lacinia quam venenatis vestibulum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
          </div>
          <h2>Learning Journey</h2>
        <div className="personal-learning-journey">
          {learningJournies}
        </div>
        <div className="resources-section grey-container">
          RESOURCES SECTION WILL BE GOING IN HERE
        </div>
        </div>
        <div className="col-sm-4">
          <div className="programme-feed grey-container">
          <h2>Programme Feed</h2>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default ModuleView;
