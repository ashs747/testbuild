import React from 'react';
import CloudinaryImg from './CloudinaryImg.jsx';
import store from '../../redux/store';
import config from '../../localConfig';
import {newProfilePic} from '../../redux/actions/usersActions';
var dispatch = store.dispatch;

/*eslint-disable camelcase */
class UploadProfile extends React.Component {

  constructor() {
    super();
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onFileUploaded = this.onFileUploaded.bind(this);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.plup = new window.plupload.Uploader({
      /* eslint-disable */
      browse_button: this.refs.uploadButton,
      url: `${config.api.url}api/upload`,
      multi_selection: false,
      multipart_params: {'context': 'profile-picture'},
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

    let loading = (this.state.loading || this.props.profilePicPending) ? <img src="assets/img/ajax-loader-red.gif" /> : this.props.buttonText;
    let content = this.props.width === "sm" ? (
      <div className="row">
        <div className="col-xs-6">
          <div className="circle-image">
            <CloudinaryImg file={this.props.profilePic} defaultImg="assets/img/profile-placeholder.jpg"/>
          </div>
          <button className="btn" ref="uploadButton">{loading}</button>
        </div>
        <div className="col-xs-6">
          <p>Don’t be shy! Please add a profile picture to help people in your Cohort recognize you when you send messages and collaborate. If you’re on a mobile device you can use your camera to take one now.</p>
        </div>
      </div>
    ) : (
      <div>
        <div className="circle-image">
          <CloudinaryImg file={this.props.profilePic} defaultImg="assets/img/profile-placeholder.jpg"/>
        </div>
        <button className="btn" ref="uploadButton">{loading}</button>
        <p>Don’t be shy! Please add a profile picture to help people in your Cohort recognize you when you send messages and collaborate. If you’re on a mobile device you can use your camera to take one now.</p>
      </div>
    );
    return (
      <div className="upload-profile">
        {content}
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
    dispatch(newProfilePic(response.file));
  }

  onError(up, args) {
  }
}
/*eslint-enable camelcase */
export default UploadProfile;
