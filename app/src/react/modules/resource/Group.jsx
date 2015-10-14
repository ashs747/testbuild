import React from 'react';
import Display from './Display.jsx';

class Group extends React.Component {

  constructor() {
    super();
  }

  render() {
    let resources = this.props.resources.map((resource) => {
      return <Display key={`res-${resource.reference}`} title={resource.title} reference={resource.reference} icon={resource.type.icon} />;
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
