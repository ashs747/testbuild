import React from 'react';

class ModuleView extends React.Component {

  constructor() {
    super();
  }

  render() {
    return <div>Module View. This is module: {this.props.params.module}</div>;
  }

}

export default ModuleView;
