import React from 'react';

class EmbedVideo extends React.Component {

  constructor() {
    super();
  }

  render() {
    let formattedUrl;

    if (this.props.url.indexOf("vimeo") > -1) {
      formattedUrl = this.formatVimeoUrl(this.props.url, this.props.colour, this.props.autoplay);
    }
    if (this.props.url.indexOf("youtu") > -1) {
      formattedUrl = this.formatYoutubeUrl(this.props.url, this.props.autoplay);
    }

    return (
      <div className="embed-video">
        <iframe style={{top: 0, bottom: 0, left: 0, right: 0, zIndex:1}}  width="100%" height="100%" src={formattedUrl} frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen ></iframe>
      </div>
    );
  }

  formatVimeoUrl(url, colour, autoplay) {
    let token = url.split("/");
    let newUrl = `//player.vimeo.com/video/${token[3]}?title=0&portrait=0&byline=0`;

    if (colour) {
      let urlColour = colour.split("#");
      newUrl += `&color=${urlColour[1]}`;
    }

    if (autoplay) {
      newUrl += "&autoplay=1";
    }

    return newUrl;
  }

  formatYoutubeUrl(url, autoplay) {
    let token = this.youtubeParser(url);
    let newUrl = `https://www.youtube.com/embed/${token}?wmode=transparent`;

    if (autoplay) {
      newUrl += "&rel=0&autoplay=1";
    }
    return newUrl;
  }

  youtubeParser(url) {
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    let match = url.match(regExp);
    if (match && match[7].length == 11) {
      return match[7];
    } else {
      return;
    }
  }

}
EmbedVideo.propTypes = {
  url: React.PropTypes.string.isRequired,
  colour: React.PropTypes.string,
  autoplay: React.PropTypes.bool
};
export default EmbedVideo;
