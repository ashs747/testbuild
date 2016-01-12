import React from 'react';
import _ from 'lodash';
import ImageGrid from './ImageGrid.jsx';
import CloudinaryImg from './CloudinaryImg.jsx';
import Video from './Video.jsx';

export default class MediaGrid extends React.Component {

  constructor() {
    super();
    this.renderMediaList = this.renderMediaList.bind(this);
    this.onMediaClick = this.onMediaClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.state = {
      mediaList: {}
    };
  }

  componentWillMount() {
    this.renderMediaList(this.props.files);
  }

  componentWillReceiveProps(nextProps) {
    this.renderMediaList(nextProps.files);
  }

  render() {
    let videoStyle = {
      display: (this.state.medialist.videos.length > 0) ? 'block' : 'none'
    };
    let imageStyle = {
      display: (this.state.medialist.images.length > 0) ? 'block' : 'none'
    };

    return (
      <div>
        <div className="videos-grid" style={videoStyle}>{this.state.medialist.videos}</div>
        <ImageGrid className="media-grid" style={imageStyle} files={this.state.medialist.images} />
      </div>
    );
  }

  renderMediaList(files) {
    this.mediaGalleryList = [];

    var medialist = {
      images: [],
      videos: []
    };

    _.each(files, file => {
      if (file.reference === "cloudinary") {
        var i = medialist.images.length;
        var boundClick = this.onMediaClick.bind(this, i);
        this.mediaGalleryList.push(file);
        medialist.images.push(file);
      } else if (file.reference === "vimeo" || file.reference === "youtube") {
        let url = _.findWhere(file.metadata, {key: "url"});
        medialist.videos.push(<Video url={url.value} key={`video-component${file.id}`} autoPlay={false} color="#007075"/>);
      }
    });

    this.setState({medialist});
  }

  onMediaClick(index, event) {
    /*
    this.mediaGallery = <div className="media-gallery-popup" key={"media-gallery-popup"}>
    <a className="close-popup" onClick={this.onCloseClick}>Close</a>
    <MediaGallery displayNav={true} thumbnailHeight={80} cycle={true} index={index} scaleUp={false} style={{backgroundColor: "black", height: '100%', width: '100%'}}>{this.mediaGalleryList}</MediaGallery>
    </div>

    PopUp.manager.create(
      this.mediaGallery,
      null,
      {
        modal: true,
        closeOnOverlayClick: true,
        position: {
          left: '4%',
          top: '5%',
          right: '4%',
          bottom: '5%'
        }
      }
    );
    */
  }

  onCloseClick(event) {
    // $('iframe').hide(); // ie8 fix for removing embedded videos
    // PopUp.manager.removeAll();
  }

}
MediaGrid.defaultProps = {
  files: []
};
MediaGrid.propTypes = {
  files: React.PropTypes.array.isRequired
};
