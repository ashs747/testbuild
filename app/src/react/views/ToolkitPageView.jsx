import React from 'react';
import Markdown from 'react-remarkable';

class ToolkitPageView extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    //action to get toolkit content
  }

  render() {
    return (
      <div className="toolkit-page">
        <div className="header clearfix">
          <div className="header-icon"><i className={`fa fa-wrench`}></i></div>
          <h1>Linking actions to purpose and outcomes using SMART</h1>
          <a className="pdf">Download PDF</a>
        </div>
        <div className="body clearfix">
          <div className="left-bar">
            <h4>Toolkit Content</h4>
            <Markdown source="**Toolkit content goes here via markdown**" />
          </div>
          <div className="right-bar">
            <div className="hints-and-tips">
              <h3>Hints and Tips</h3>
              <div className="list">
                <Markdown source="**Toolkit content goes here via markdown**" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToolkitPageView;
