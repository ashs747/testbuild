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
    dispatch(getToolkitContentFromSlug(this.props.params.toolkit));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.toolkit !== nextProps.params.toolkit) {
      dispatch(getToolkitContentFromSlug(this.props.params.toolkit));
    }
  }

  render() {
    return (
      <div className="toolkit-page">
        <div className="header">
          <div className="row">
            <div className="col-md-1 col-sm-2">
              <div className="header-icon"><i className={`fa fa-${this.props.toolkitContent.icon}`}></i></div>
            </div>
            <div className="col-md-8 col-sm-10">
              <h1>{this.props.toolkitContent.title}</h1>
            </div>
            <div className="col-md-3 visible-lg visible-md">
              <div className="pdf">
                <a href={this.props.toolkitContent.pdfLink} target="_blank">Download PDF</a>
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
              <a href={this.props.toolkitContent.pdfLink} target="_blank">Download as PDF <i className="fa fa-chevron-right"></i></a>
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
