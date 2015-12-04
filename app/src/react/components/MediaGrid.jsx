import React from 'react';
import _ from 'underscore';
import ImageGrid from './ImageGrid.jsx';

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
        <ImageGrid className="media-grid" style={imageStyle}>{this.state.medialist.images}</ImageGrid>
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
      let thumbnail;
      let thumbnailUrl;
      file.mimeType = "image/jpeg";
      file.variations = [{
        reference: file.reference,
        variation: "medium"
      }];
      
      if (file.mimeType.match('image.*')) {
        var i = medialist.images.length;
        thumbnail = _.where(file.variations, {variation: "medium"});
        var boundClick = this.onMediaClick.bind(this, i);
        thumbnailUrl = (thumbnail.length > 0) ? thumbnail[0].reference : "/assets/img/thumb-default.png";

        this.mediaGalleryList.push(<img key={`file-gallery-component${i}`} src={file.reference} thumb={thumbnailUrl} />);
        medialist.images.push(<img className="file-thumbnail" key={`file-gallery-component${i}`} src={thumbnailUrl} id={i} onClick={boundClick} />);
      } else if (file.mimeType.match('video.*')) {
        thumbnail = _.where(file.variations, {variation: "small"});
        thumbnailUrl = (thumbnail.length > 0) ? thumbnail[0].reference : "/assets/img/thumb-default.png";
        medialist.videos.push(<Video url={file.reference} key={`video-component${i}`} autoPlay={false} color="#007075" thumb={thumbnailUrl} marginBottom={5} />);
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
