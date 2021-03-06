import React from 'react';
import {connect} from 'react-redux';
import store from '../../redux/store';
import FileDownload from '../components/FileDownload.jsx';
import CloudinaryImg from '../components/CloudinaryImg.jsx';
var dispatch = store.dispatch;

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
    return (
      <div className="toolkit-page">
        <div className="header">
          <div className="row">
            <div className="col-md-1 col-sm-2">
              <div className="header-icon">
                <CloudinaryImg file={toolkit.icon} />
              </div>
            </div>
            <div className="col-md-8 col-sm-10">
              <h2>{toolkit.title}</h2>
            </div>
            <div className="col-md-3 visible-lg visible-md">
              <div className="pdf">
                <FileDownload file={toolkit.pdfLink} buttonText="DOWNLOAD PDF"/>
              </div>
            </div>
          </div>
        </div>
        <div className="body">
          <div className="row">
            <div className="col-md-8 left-bar">
              <div className="content">
                <div dangerouslySetInnerHTML={{__html: toolkit.content}} />
              </div>
            </div>
            <div className="col-md-12 hidden-lg hidden-md second-pdf">
              <FileDownload file={toolkit.pdfLink} buttonText="DOWNLOAD PDF"/>
            </div>
            <div className="col-md-4 right-bar">
              <div className="hints-and-tips">
                <h4>Hints and Tips</h4>
                <div className="list">
                  <div dangerouslySetInnerHTML={{__html: toolkit.hints}}/>
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
      if (toolkit.slug === slug) {
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
