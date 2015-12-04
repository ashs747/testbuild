import React from 'react';
var profilePicUpdated = {type: 'PROFILE_PIC_UPDATED', payload: ''}; //TODO - serviceWork
var dispatch = () => {};

/*eslint-disable camelcase */

class UploadProfile extends React.Component {

  constructor() {
    super();
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onFileUploaded = this.onFileUploaded.bind(this);
  }

  componentDidMount() {
    this.uploader = new plupload.Uploader({
      browse_button: this.refs.uploadbtn.getDOMNode(),
      url: this.props.uploadURL,
      multi_selection: false,
      multipart_params: {'context': 'profile-picture'},
      runtimes: 'html5,flash',
      flash_swf_url: '/assets/flash/Moxie.swf',
      file_data_name: 'file',
      headers: {
        Authorization: `Bearer ${this.props.authToken}`
      }
    });

    this.uploader.init();
    this.uploader.bind('FilesAdded', this.onFilesAdded);
    // this.uploader.bind('UploadProgress', this.onProgress);
    this.uploader.bind('FileUploaded', this.onFileUploaded);
    this.uploader.bind('UploadComplete', this.onUploadComplete);
    this.uploader.bind('Error', this.onError);
  }

  render() {
    return (
      <div className="upload-profile">
        <div className="circle-image">
          <img src={this.props.pictureURL || "/assets/img/profile-placeholder.jpg"} alt="profile" />
        </div>
        <button className="btn" ref="uploadbtn">{this.props.buttonText}</button>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</p>
      </div>
    );
  }

  onFilesAdded(up, file) {
    this.uploader.start();
  }

  onFileUploaded(up, file, data) {
    let response = JSON.parse(data.response);
    dispatch(profilePicUpdated);
  }

}
/*eslint-enable camelcase */
export default UploadProfile;
