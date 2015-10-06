import React from 'react';

class EmbedVideo extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="embed-video">
        <a ref="browse" className="btn embed-video" href="javascript:void(0)"><i className="fa fa-video-camera"> Embed Youtube/Vimeo</i></a>
      </div>
    );
  }

}

EmbedVideo.propTypes = {

};

export default EmbedVideo;
