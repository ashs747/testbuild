import React from 'react';
import Video from './Video.jsx';
import $ from 'jquery';
import _ from 'underscore';
import imagesLoaded from 'imagesloaded';


class MediaGrid extends React.Component {

  constructor() {
    super();
    this.resizeImages = this.resizeImages.bind(this);
    this.renderMediaList = this.renderMediaList.bind(this);
    this.onMediaClick = this.onMediaClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.state = {
      medialist : [],
      index: 0
    };
  }

  componentWillMount() {
    this.renderMediaList(this.props.files);
  }

  componentDidMount() {
    var els = [];
    this.timer = null;

    $(React.findDOMNode(this)).children().each(function(item){
      els.push(item);
    });

    if (els.length > 0) {
      imagesLoaded(els, function(data){
        this.timer = setTimeout(this.resizeImages, 1000);
        $(window).on('resize', this.resizeImages);
      }.bind(this));
    }
  }

  componentWillReceiveProps(nextProps) {
    this.renderMediaList(nextProps.files);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    $(window).off('resize', this.resizeImages);
  }

  render() {
    let style = {
      display: (this.state.medialist.length > 0) ? 'block' : 'none'
    };
    return (
      <div className="media-grid" ref="media" style={style}>{this.state.medialist}</div>
    );
  }

    resizeImages() {
      $(React.findDOMNode(this)).collagePlus({
        'targetHeight' : this.props.height
      });
    }

  renderMediaList(files) {
    this.mediaGalleryList = [];

    this.medialist = files.map(function(media, i) {
      var thumbnail = _.where(media.variations, {variation: "medium"});
      var boundClick = this.onMediaClick.bind(this, i);

      var thumbnailUrl = (thumbnail.length > 0) ? thumbnail[0].reference : "/assets/img/thumb-default.png";

      if (media.mimeType.match('video.*')) {
        this.mediaGalleryList.push(<Video url={media.reference} key={"media-gallery-component" + i} autoPlay={false} color="#007075" thumb={thumbnailUrl} />);
      } else if (media.mimeType.match('image.*')) {
        this.mediaGalleryList.push(<img key={"media-gallery-component" + i} src={media.reference} thumb={thumbnailUrl} />);
      }

      return <img key={"media-gallery-component" + i} src={thumbnailUrl} className="media-thumbnail" id={i} onClick={boundClick} />

    }.bind(this));

    this.setState({
      medialist: this.medialist
    });
  }

  onMediaClick(index, event) {
    console.log("clicked media");
  }

  onCloseClick(event) {
    //$('iframe').hide(); // ie8 fix for removing embedded videos
    //PopUp.manager.removeAll();
  }
}

MediaGrid.defaultProps = {
  height: 200,
  files: []
};
MediaGrid.propTypes = {
  height: React.PropTypes.number,
  files: React.PropTypes.array.isRequired
};
export default MediaGrid;
