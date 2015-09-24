import React from 'react';

class Widget extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="resource-widget">
        
      </div>
    );
  }

}

Widget.propTypes = { resources: React.PropTypes.array, title: React.PropTypes.string };
export default Widget;
