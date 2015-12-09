import React from 'react';
import Display from './Display.jsx';

class Group extends React.Component {

  constructor() {
    super();
  }

  render() {
    let resources = this.props.resources.map((resource) => {
      let ref = "#";
      if (resource.file) {
        //Put more sorting logic in here to interpolate references uploaded to s3
        if (resource.file.reference) {
          ref = resource.file.reference;
        }
      }
      return <Display key={`res-${ref}`} title={resource.name} reference={ref} icon={resource.type.icon} />;
    });
    let title = this.props.title ? <h4>{this.props.title}</h4> : null;
    return (
      <div className="resource-group">
        {title}
        {resources}
      </div>
    );
  }
}

Group.propTypes = { resources: React.PropTypes.array, title: React.PropTypes.string };
export default Group;
