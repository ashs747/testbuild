import React from 'react';

/*eslint-disable camelcase */

class UploadProfile extends React.Component {

  constructor() {
    super();
    this.addProfile = this.addProfile.bind(this);
    this.onFileUploaded = this.onFileUploaded.bind(this);
  }

  componentDidMount() {
    this.uploader = new plupload.Uploader({
      browse_button: this.refs.uploadbtn.getDOMNode(),
      url: this.props.uploadURL,
      multi_selection: false,
      runtimes: 'html5,flash',
      flash_swf_url: '/assets/flash/Moxie.swf',
      file_data_name: 'file'
    });

    this.uploader.init();
    this.uploader.bind('FilesAdded', this.addProfile);
    // this.uploader.bind('UploadProgress', this.onProgress);
    this.uploader.bind('FileUploaded', this.onFileUploaded);
    this.uploader.bind('UploadComplete', this.onUploadComplete);
    this.uploader.bind('Error', this.onError);
    this.uploader.bind('Init', function(c) {
      console.log(c.runtime);
    });
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

  onFileUploaded() {
    // dispatch a 'fetch data' call
  }

  addProfile(e) {
    if (this.props.dispatchUpload) {
      e.preventDefault();
      this.props.dispatchUpload();
    }
    // console.log("Uploading image");
  }

}
/*eslint-enable camelcase */
export default UploadProfile;
