import React from 'react';

class UploadMedia extends React.Component {

  constructor() {
    super();
    this.onFilesAdded = this.onFilesAdded.bind(this);
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
    this.plup.bind('FileUploaded', this.onUploaded);
    //The function to fire when an error occurs
    this.plup.bind('Error', this.onError);
  }

  render() {
    return (
      <div className="upload-media">
        <a ref="browse" href="javascript:void(0)">Browse Files</a>
      </div>
    );
  }

  onFilesAdded(up, file) {
    this.plup.start();
    console.log("File added", up, file);
  }

  onUploaded(up, file, data) {
    console.log((data.response));

    //let fileRef =
    //messageUploadAction(fileRef, status = SUCCESS)
  }

  onError(up, args) {
    //Error handling logic needs to go here, reducer time?
    console.log('Error', args);
    //messageUploadAction(fileRef, status = FAIL)
  }

}

export default UploadMedia;
