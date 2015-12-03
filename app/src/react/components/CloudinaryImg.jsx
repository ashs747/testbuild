import React from 'react';
/*eslint-disable camelcase */
class CloudinaryImg extends React.Component {
  constructor() {
    super();
  }

  render() {
    var metadata = this.props.file.metadata;
    var modStr;
    var file = this.props.file;
    if (file) {

      for (let i = 0; i < metadata.length; i += 1) {
        file[metadata[i].key] = metadata[i].value;
      }

      var outStr = this.props.secure ? file.secure_url : file.url;

      if (file.context === "profile-picture") {
        modStr = 'w_200,h_200,c_thumb,g_face/';
      }

      outStr = outStr.split('upload/').join(`upload/${modStr}`);

    } else {
      outStr = this.props.default;
      file = {};
      file.secure_url = outStr;
      file.url = outStr;
    }

    return (<a href={this.props.secure ? file.secure_url : file.url}><img src={outStr} alt={this.props.alt}/></a>);
  }
}

export default CloudinaryImg;
/*eslint-enable camelcase */