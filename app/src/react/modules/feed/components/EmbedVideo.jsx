import React from 'react';
import {embedVideoAction} from '../../../../redux/actions/feedActions';
import {dispatch} from '../../../../redux/store';

class EmbedVideo extends React.Component {

  constructor() {
    super();
    this.toggleUrlField = this.toggleUrlField.bind(this);
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
          <a className="btn go" onClick={this.saveVideo}>GO</a>
          {error}
        </div>
      );
    }
    let displayText = this.props.profile !== "sm" ? "Embed Youtube/Vimeo" : null;
    return (
      <div className="embed-video">
        <a className="btn embed-video-button" onClick={this.toggleUrlField}><i className="fa fa-video-camera"></i> {displayText}</a>
        {urlField}
      </div>
    );
  }

  toggleUrlField() {
    /* Shows the url field by setting the state value to true */
    this.setState({
      showUrlField: !this.state.showUrlField
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

  saveVideo() {
    /* Saves the video into app state against the message via a reducer */
    dispatch(embedVideoAction(this.props.feedId, React.findDOMNode(this.refs.urlField).value));
    this.setState({showUrlField: false});
  }

}

EmbedVideo.propTypes = {
  feedId: React.PropTypes.string.isRequired,
};

export default EmbedVideo;
