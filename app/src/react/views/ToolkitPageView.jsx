import React from 'react';
import Markdown from 'react-remarkable';
import {connect} from 'react-redux';
import {dispatch} from '../../redux/store';

class ToolkitPageView extends React.Component {

  constructor() {
    super();
  }

  render() {
    if (!this.props.toolkits) {
      return (<div />);
    }
    let toolkit = this.getToolkitFromUrlSlug(this.props.toolkits, this.props.params.toolkit);
    if (!toolkit) {
      return (<div />);
    }
    //TODO: Need the component that takes an s3 with metadata and spits out a url
    //let toolkitRef = (toolkit.pdfLink) ? toolkit.pdfLink.reference : null;
    let toolkitRef = "#";
    return (
      <div className="toolkit-page">
        <div className="header">
          <div className="row">
            <div className="col-md-1 col-sm-2">
              <div className="header-icon"><i className={`fa fa-${toolkit.icons}`}></i></div>
            </div>
            <div className="col-md-8 col-sm-10">
              <h1>{toolkit.title}</h1>
            </div>
            <div className="col-md-3 visible-lg visible-md">
              <div className="pdf">
                <a href={toolkitRef} target="_blank">Download PDF</a>
              </div>
            </div>
          </div>
        </div>
        <div className="body">
          <div className="row">
            <div className="col-md-9 left-bar">
              <h4>Toolkit Content</h4>
              <div className="content">
                <Markdown source={toolkit.content} />
              </div>
            </div>
            <div className="col-md-12 hidden-lg hidden-md second-pdf">
              <a href={toolkitRef} target="_blank">Download as PDF <i className="fa fa-chevron-right"></i></a>
            </div>
            <div className="col-md-3 right-bar">
              <div className="hints-and-tips">
                <h3>Hints and Tips</h3>
                <div className="list">
                  <Markdown source={toolkit.hints} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getToolkitFromUrlSlug(toolkits, slug) {
    let selectedToolkit = null;
    toolkits.forEach((toolkit) => {
      if (toolkit.slug == slug) {
        selectedToolkit = toolkit;
      }
    });
    return selectedToolkit;
  }
}

function mapToolkitContentProps(state) {
  return {
    toolkits: state.content.toolkits
  };
};
let mappedToolkitPageView = connect(mapToolkitContentProps)(ToolkitPageView);

export default mappedToolkitPageView;
