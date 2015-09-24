import React from 'react';
import Group from './Group.jsx';
import _ from 'underscore';

class Widget extends React.Component {

  constructor() {
    super();
    this.groupResources = this.groupResources.bind(this);
    this.createGroupsFromResources = this.createGroupsFromResources.bind(this);
    this.orderResources = this.orderResources.bind(this);
  }

  render() {
    let groupedResources = this.groupResources();
    let groups = this.createGroupsFromResources(groupedResources);
    let orderedResources = this.orderResources(groups);
    let columnedResources = this.columnResources(orderedResources);
    return (
      <div className="resource-widget">
        <div className="title">
          <h4>{this.props.title}</h4>
        </div>
        <div className="body">
          <div className="row">
            <div className="col-sm-12">
              {columnedResources}
            </div>
          </div>
        </div>
      </div>
    );
  }

  groupResources() {
    return _.groupBy(this.props.resources, (resource) => {
      let type = resource.type.typeSlug;
      if (type.indexOf("document-") > -1) {
        return "document";
      } else {
        return type;
      }
    });
  }

  createGroupsFromResources(widgets) {
    var groups = [];
    _.mapObject(widgets, (val, key) => {
      if (val.length > 0) {
        let title;
        switch (key) {
          case "video":
            title = "Videos"; break;
          case "external":
            title = "External links"; break;
          case "document":
            title = "Documents"; break;
          case "tool":
            title = "Tools"; break;
        }
        groups.push(<Group key={`group-widget-${key}`} title={title} resources={val} />);
      }
    });
    return groups;
  }

  orderResources(resources) {
    if (this.props.order) {
      if (this.props.order.length !== 4) {
        throw Error("If you are trying to order the resource groups, you must specify the exact order, i.e. all 4 columns");
      }
      let orderedResources = [];
      resources.forEach((resource) => {
        var newOrder = this.props.order.indexOf(resource.key.split("group-widget-")[1]);
        orderedResources[newOrder] = resource;
      });
      return orderedResources;
    }
    return resources;
  }

  columnResources(resources) {
    if (this.props.doubleColumn) {
      let resourceCounter = 0;
      let column1 = [];
      let column2 = [];
      for (var i in resources) {
        if (resourceCounter < this.props.resources.length / 2) {
          resourceCounter += resources[i].props.resources.length;
          column1.push(resources[i]);
        } else {
          column2.push(resources[i]);
        }
      }
      return (
        <div className="row">
          <div className="col-sm-6">{column1}</div>
          <div className="col-sm-6">{column2}</div>
        </div>
      );
    }
    return resources;
  }

}

Widget.propTypes = { resources: React.PropTypes.array, title: React.PropTypes.string };
export default Widget;
