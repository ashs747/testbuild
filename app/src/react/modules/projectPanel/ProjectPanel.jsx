import React from 'react';
import ProjectStep from './ProjectStep.jsx';

class ProjectPanel extends React.Component {

  constructor() {
    super();
  }

  render() {
    let steps = this.props.steps.length > 0 ? this.mapSteps(this.props.steps) : null;
    return (
      <div className="project-panel">
        {steps}
      </div>
    );
  }

  mapSteps(steps) {
    let mappedSteps = steps.map(step =>
      <ProjectStep key={step.id} title={`Step ${step.number} - ${step.title}`} content={step.content} image={step.image} />
    );
    return mappedSteps;
  }

}
ProjectPanel.defaultProps = {
  steps: []
};
ProjectPanel.propTypes = {
  steps: React.PropTypes.array.isRequired
};
export default ProjectPanel;
