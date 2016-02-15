import React from 'react';
import Display from './Display.jsx';

class Group extends React.Component {

  constructor() {
    super();
  }

  render() {
    let resources = this.props.resources.map((resource) => {
      let ref = "#";
      if (resource.file && resource.file.metadata) {
        var meta = resource.file.metadata;
        for (var i = 0; i < meta.length; i++) {
          if (meta[i].key === "url") {
            ref = meta[i].value;
          }
        }
      }
      return <Display key={`res-${ref}`} title={resource.name} reference={ref} icon={resource.type.icon} />;
    });
    let title = this.props.title ? <h5>{this.props.title}</h5> : null;
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
