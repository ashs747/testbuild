import React from 'react';
import LearningJourneyTable from '../components/LearningJourneyTable.jsx';
import {learningJourneyAction} from '../../redux/actions/learningJourneyActions';
import {moduleHubAction} from '../../redux/actions/moduleActions';

class ModuleView extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
    this.props.dispatch(learningJourneyAction(this.props.auth.currentUser, 1));
    this.props.dispatch(moduleHubAction('SOJ', 'module', 'resources.type'));
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
    var module = this.props.modules.contentTypeData._embedded ? this.props.modules.contentTypeData._embedded.content_type_data[0] : {title: 'ipsum', 'aboutThisHub': 'ipsum', id: 1};
    return <div className="module-hub">

        <div className="heading grey-container">
          <div className="row">
            <div className="col-sm-2">
              <div className="module-icon">
              </div>
            </div>
            <div className="col-sm-10">
              <p>Module {module.id}</p>
              <p>{module.title}</p>
            </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-8">
          <div className="about-section grey-container">
            <h2>About this module</h2>
            <p>{module.aboutThisHub}</p>
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
