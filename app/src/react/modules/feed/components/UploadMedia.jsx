import React from 'react';
import {addFile} from '../../../../redux/actions/feedActions';
import {dispatch} from '../../../../redux/store';

class UploadMedia extends React.Component {

  constructor() {
    super();
    this.onFileUploaded = this.onFileUploaded.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onError = this.onError.bind(this);
  }

  componentDidMount() {
    this.plup = new window.plupload.Uploader({
      /* eslint-disable */
      browse_button: React.findDOMNode(this.refs.browse),
      url: 'http://localhost:8888/upload',
      multi_selection: false,
      runtimes: 'html5,flash',
      flash_swf_url: '/app/bower_components/plupload/js/Movie.swf',
      file_data_name: 'file'
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
    return (
      <div className="upload-media">
        <a ref="browse" className="btn upload-media" href="javascript:void(0)"><i className="fa fa-picture-o"> Upload Media/Video</i></a>
      </div>
    );
  }

  onFilesAdded(up, file) {
    this.plup.start();
  }

  onFileUploaded(up, file, data) {
    let response = JSON.parse(data.response);
    dispatch(addFile(response, {medium: {width: 400}}, this.props.feedId));
  }

  onError(up, args) {
    dispatch({'type': 'FEED_ADD_FILE', 'status': 'REJECTED', payload: {feedId: this.props.feedId}});
  }
}
UploadMedia.propTypes = {
  feedId: React.PropTypes.string.isRequired
};

export default UploadMedia;
