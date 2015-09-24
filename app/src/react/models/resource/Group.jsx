import React from 'react';
import Display from './Display.jsx';

class Group extends React.Component {

  constructor() {
    super();
  }

  render() {
    let resources = this.props.resources.map((resource, i) => {
      return <Display key={`resource-${i}`} title={resource.title} reference={resource.reference} icon={resource.type.icon} />;
    });
    return (
      <div className="resource-group">
        <h4>{this.props.title}</h4>
        {resources}
      </div>
    );
  }
}

Group.propTypes = { resources: React.PropTypes.array, title: React.PropTypes.string };
export default Group;
