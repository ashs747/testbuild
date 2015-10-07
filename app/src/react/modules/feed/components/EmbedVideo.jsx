import React from 'react';
import {embedVideo} from '../../../../redux/actions/feedActions';
import {dispatch} from '../../../../redux/store';

class EmbedVideo extends React.Component {

  constructor() {
    super();
    this.showUrlField = this.showUrlField.bind(this);
    this.saveVideo = this.saveVideo.bind(this);
    this.state = {
      url: "",
      error: null,
      showUrlField: false
    };
  }

  render() {
    let urlField;
    if (this.state.showUrlField) {
      let error;
      if (this.state.error) {
        error = <span className="url-error">{this.state.error}</span>;
      }
      urlField = (
        <div className="url-field">
          <input ref="urlField" type="text" placeholder="Paste your url here" />
          <a className="btn" onClick={this.saveVideo}>Go</a>
          {error}
        </div>
      );
    }
    return (
      <div className="embed-video">
        <a className="btn embed-video" onClick={this.showUrlField}><i className="fa fa-video-camera"> Embed Youtube/Vimeo</i></a>
        {urlField}
      </div>
    );
  }

  showUrlField() {
    /* Shows the url field by setting the state value to true */
    this.setState({
      showUrlField: true
    });
  }

  checkUrl(url) {
    /* Uses a regExp to check if the url matches a youtube or vimeo format */
    let re = new RegExp("https?:\\/\\/(?:www.)?(m.)?(?:(vimeo).com\\/([0-9]+)|(youtube).com\\/watch\\?v=(.*)|(youtu).be\\/(.*))");
    if (url.match(re)) {
      return true;
    }
    return false;
  }

  urlValid() {
    /*
      Gets the url via refs, checks if a url exists, or if it is valid (though the checkUrl function)
      Then passes through to the saveVideo function
    */
    let error;
    let url = React.findDOMNode(this.refs.urlField).value;
    if (!url) {
      error = "No url provided";
    } else if (!this.checkUrl(url)) {
      error = "Invalid url";
    }
    if (error) {
      this.setState({error});
      return;
    }
    this.setState({error: null});
    this.saveVideo(url);
  }

  saveVideo(url) {
    /* Saves the video into app state against the message via a reducer */
    dispatch(embedVideo(this.props.feedId, url));
    this.setState({showUrlField: false});
  }

}

EmbedVideo.propTypes = {
  feedId: React.PropTypes.string.isRequired,
};

export default EmbedVideo;
