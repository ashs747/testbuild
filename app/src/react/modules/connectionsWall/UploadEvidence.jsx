import React from 'react';
import ImageView from '../../components/ImageView.jsx';
import config from '../../../localConfig';
import store from '../../../redux/store.js';
import {findDOMNode} from 'react-dom';
import {updateWallPostEvidence} from '../../../redux/actions/wallActions';
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
    let imageStyle = {
      height: "100%",
      width: "100%",
      display: "inline-block"
    };
    let image = "http://res.cloudinary.com/strata/image/upload/v1467881930/connections-wall-click-to-add_rwb3sl.png";
    if (post.tempEvidence) {
      image = post.tempEvidence.url;
      if (post.tempEvidence.type === "video") {
        //PLACEHOLDER
        image = "http://res.cloudinary.com/strata/image/upload/v1467881930/connections-wall-click-to-add_rwb3sl.png";
      }
    }
    if (this.state.loading) {
      image = "assets/img/ring.svg";
      imageStyle.backgroundColor = '#4C6172';
    }
    let component = <ImageView src={image} layout="box-to-image" style={imageStyle} />;
    return (
      <a ref="browse" href="javascript:void(0)">{component}</a>
    );
  }

  onFilesAdded() {
    this.plup.start();
    this.setState({loading: true});
  }

  onFileUploaded(up, file, data) {
    let response = JSON.parse(data.response);
    this.setState({loading: false});
    dispatch(updateWallPostEvidence(this.props.wallId, this.props.postId, response));
  }

  onError(a, b, c) {
    this.setState({loading: false});
    //ERROR HANDLING
    console.log(arguments);
    //dispatch({'type': 'FEED_ADD_FILE', 'status': 'REJECTED', payload: {feedId: this.props.feedId}});
  }

}

export default UploadEvidence;
