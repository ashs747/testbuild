import React from 'react';
import Markdown from 'react-remarkable';
import {connect} from 'react-redux';
import {getToolkitContentFromSlug} from '../../redux/actions/contentActions';
import {dispatch} from '../../redux/store';

class ToolkitPageView extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
    dispatch(getToolkitContentFromSlug('test-toolkit'));
  }

  render() {
    return (
      <div className="toolkit-page">
        <div className="header">
          <div className="row">
            <div className="col-md-1 col-sm-2">
              <div className="header-icon"><i className={`fa fa-wrench`}></i></div>
            </div>
            <div className="col-md-8 col-sm-10">
              <h1>Linking actions to purpose and outcomes using SMART</h1>
            </div>
            <div className="col-md-3 visible-lg visible-md">
              <div className="pdf">
                <a>Download PDF</a>
              </div>
            </div>
          </div>
        </div>
        <div className="body">
          <div className="row">
            <div className="col-md-9 left-bar">
              <h4>Toolkit Content</h4>
              <div className="content">
                <Markdown source={this.props.toolkitContent.content} />
              </div>
            </div>
            <div className="col-md-12 hidden-lg hidden-md second-pdf">
              <a>Download as PDF <i className="fa fa-chevron-right"></i></a>
            </div>
            <div className="col-md-3 right-bar">
              <div className="hints-and-tips">
                <h3>Hints and Tips</h3>
                <div className="list">
                  <Markdown source={this.props.toolkitContent.hints} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapToolkitContentProps(state) {
  return {
    toolkitContent: state.content.toolkitContent ? state.content.toolkitContent : {}
  };
};
let mappedToolkitPageView = connect(mapToolkitContentProps)(ToolkitPageView);

export default mappedToolkitPageView;
