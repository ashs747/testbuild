import React from 'react';
import {addFile} from '../../../../redux/actions/feedActions';
import {dispatch} from '../../../../redux/store';
import config from '../../../../localConfig';
import cookie from 'cookie-cutter';
import store from '../../../../redux/store.js';
import {findDOMNode} from 'react-dom';

class UploadMedia extends React.Component {

  constructor() {
    super();
    this.onFileUploaded = this.onFileUploaded.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onError = this.onError.bind(this);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.plup = new window.plupload.Uploader({
      /* eslint-disable */
      browse_button: findDOMNode(this.refs.browse),
      url: `${config.api.url}api/upload`,
      multi_selection: false,
      runtimes: 'html5,flash',
      flash_swf_url: '/app/bower_components/plupload/js/Movie.swf',
      file_data_name: 'file',
      headers: {
        Authorization: `Bearer ${store.getState().auth.access_token}`
      }
      /* eslint-enable */
    });
    this.plup.init();
    //The function to fire when the file has been added to the queue
    this.plup.bind('FilesAdded', this.onFilesAdded);
    //The function to fire when a single file has been upload
    this.plup.bind('FileUploaded', this.onFileUploaded);
    //The function to fire when an error occurs
    this.plup.bind('Error', this.onError);
  }

  render() {
    let displayText = this.props.profile !== "sm" ? "Upload Photo/Video" : null;
    let icon = this.state.loading ? <img src="assets/img/ajax-loader1.gif" /> : <div><i className="fa fa-picture-o"></i> {displayText}</div>;
    return (
      <div className="upload-media-component">
        <a ref="browse" className="btn upload-media" href="javascript:void(0)">{icon}</a>
      </div>
    );
  }

  onFilesAdded(up, file) {
    this.plup.start();
    this.setState({loading: true});
  }

  onFileUploaded(up, file, data) {
    this.setState({loading: false});
    let response = JSON.parse(data.response);
    dispatch(addFile(response, this.props.feedId));
  }

  onError(up, args) {
    dispatch({'type': 'FEED_ADD_FILE', 'status': 'REJECTED', payload: {feedId: this.props.feedId}});
  }
}
UploadMedia.propTypes = {
  feedId: React.PropTypes.string.isRequired
};

export default UploadMedia;
