import React from 'react';
import LearningJourneyTable from '../components/LearningJourneyTable.jsx';
import {learningJourneyAction} from '../../redux/actions/learningJourneyActions';
import {moduleHubAction} from '../../redux/actions/moduleActions';
import _ from 'underscore';

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

    if (_.isUndefined(this.props.modules.contentTypeData)) {
      throw new Error('No module data present');
    }
    let moduleId = null;
    let moduleTitle = null;
    let aboutThisHub = null;
    if (this.props.modules.contentTypeData !== undefined) {
      var module = _.first(_.filter(this.props.modules.contentTypeData, function(data) {
        return data.id == this.props.params.module;
      }.bind(this)));
      if (module !== undefined) {
        moduleId = module.id;
        moduleTitle = module.title;
        aboutThisHub = module.aboutThisHub;
      }
    }

    return <div className="module-hub">

        <div className="heading grey-container">
          <div className="row">
            <div className="col-sm-2">
              <div className="module-icon">
              </div>
            </div>
            <div className="col-sm-10">
              <p>Module {moduleId}</p>
              <p>{moduleTitle}</p>
            </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-8">
          <div className="about-section grey-container">
            <h2>About this module</h2>
            <p>{aboutThisHub}</p>
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
