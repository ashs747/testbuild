import React from 'react';
import ImageView from '../../components/ImageView.jsx';
import Video from '../../components/Video.jsx';
import config from '../../../localConfig';
import store from '../../../redux/store.js';
import {findDOMNode} from 'react-dom';
import {updateWallPostEvidence, updateInfoBox, removeInfoBox} from '../../../redux/actions/wallActions';
var dispatch = store.dispatch;

class UploadEvidence extends React.Component {

  constructor() {
    super();
    this.onFileUploaded = this.onFileUploaded.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onError = this.onError.bind(this);
    this.state = {
      loading: false
    }
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
    const post = this.props.post;
    let video = false;
    let imageStyle = {
      height: "100%",
      width: "100%",
      display: "inline-block"
    };
    let image = "http://res.cloudinary.com/strata/image/upload/v1467881930/connections-wall-click-to-add_rwb3sl.png";

    //If we have temp evidence, set the image url as the image url
    if (post.tempEvidence) {
      image = post.tempEvidence.url;
    }

    //If the app is in loading state, show spinner and set background colour
    if (this.state.loading) {
      image = "assets/img/ring.svg";
      imageStyle.backgroundColor = '#4C6172';
    }

    //Setting up the component
    let component = <ImageView src={image} layout="box-to-image" style={imageStyle} />;

    //If the temp evidence is a video, set it to a video player instead of image view
    if (post.tempEvidence && post.tempEvidence.type === "video") {
      component = <Video url={post.tempEvidence.url} colour="#ea3592" />
    }

    //If we don't have temp evidence, we want to wrap the placeholder image in the uploader
    if (!post.tempEvidence) {
      component = <a ref="browse" href="javascript:void(0)">{component}</a>;
    }

    return component;
  }

  onFilesAdded() {
    this.plup.start();
    this.setState({loading: true});
    dispatch(removeInfoBox(this.props.wallId, this.props.post.id));
  }

  onFileUploaded(up, file, data) {
    let response = JSON.parse(data.response);
    this.setState({loading: false});
    var isVideo = this.isVideo(response);
    if (isVideo) {
      dispatch(updateInfoBox(this.props.wallId, this.props.post.id, 'video-processing', 'info'));
    }
    dispatch(updateWallPostEvidence(this.props.wallId, this.props.post.id, response));
  }

  onError() {
    this.setState({loading: false});
    dispatch(updateInfoBox(this.props.wallId, this.props.post.id, 'error', 'danger'));
  }

  isVideo(file) {
    var fileObj = file.file;
    return (fileObj && fileObj.reference && fileObj.reference === "vimeo");
  }

}

export default UploadEvidence;
