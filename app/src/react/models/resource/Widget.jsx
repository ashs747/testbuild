import React from 'react';
import Group from './Group.jsx';
import _ from 'underscore';
import data from './resourceStubData.json';

class Widget extends React.Component {

  constructor() {
    super();
    this.groupResources = this.groupResources.bind(this);
    this.createGroupsFromResources = this.createGroupsFromResources.bind(this);
  }

  render() {
    let groupedResources = this.groupResources();
    let widgets = this.createGroupsFromResources(groupedResources);
    return (
      <div className="resource-widget">
        <div className="title">
          <h4>{this.props.title}</h4>
        </div>
        <div className="body">
          {widgets}
        </div>
      </div>
    );
  }

  groupResources() {
    return _.groupBy(this.props.resources, (resource) => {
      let type = resource.type.typeSlug;
      if (type.startsWith("document-")) {
        return "document";
      } else {
        return type;
      }
    });
  }

  createGroupsFromResources(widgets) {
    return [
      <Group key="group-widget-videos" title="Videos" resources={widgets.video} />,
      <Group key="group-widget-documents" title="Documents" resources={widgets.document} />,
      <Group key="group-widget-tools" title="Tools" resources={widgets.tools} />,
      <Group key="group-widget-links" title="External Links" resources={widgets.external} />
    ];
  }

}

Widget.defaultProps = { resources: data, title: "Resources" };
Widget.propTypes = { resources: React.PropTypes.array, title: React.PropTypes.string };
export default Widget;
