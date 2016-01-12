import React from 'react';

class CloudinaryImg extends React.Component {
  constructor() {
    super();
  }

  render() {
    var metadata = [];

    if (this.props.file) {
      metadata = this.props.file.metadata;
    }

    var imgParams = [];
    var modStr = '';
    var file = this.props.file;

    if (file && file.context === "embed") {
      return (
        <a href={this.props.secure ? file.secure_url : file.url}>
          <img style={this.props.style} src={this.props.defaultImg} alt={this.props.alt}/>
        </a>
      );
    }

    if (file && file.metadata) {
      /*eslint-disable camelcase */
      for (let i = 0; i < metadata.length; i += 1) {
        file[metadata[i].key] = metadata[i].value;
      }

      var outStr = (this.props.secure ? file.secure_url : file.url) || '';

      if (file.context) {
        //defaults
        switch (file.context) {
          case "profile-picture":
            modStr = 'w_200,h_200,c_thumb,g_face/';
            break;
        }
      }

      if (file.rotate || this.props.rotate) {
        if (!this.props.rotate) {
          imgParams.push(`a_${file.rotate},${imgParams}`);
        } else {
          let calculateRotate = (file.rotate + this.props.rotate) % 360;
          imgParams.push(`a_${calculateRotate}`);
        }
      }

      for (let key in this.props) {
        if (this.props.hasOwnProperty(key) && !!key) {
          switch (key) {
            case 'width':
              imgParams.push(`w_${this.props[key]}`);
              break;
            case 'height':
              imgParams.push(`h_${this.props[key]}`);
              break;
            case 'crop':
              imgParams.push(`c_${this.props[key]}`);
          }
        }
      }
      modStr = modStr || `${imgParams.join(',')}/`;
      outStr = outStr.split('upload/').join(`upload/${modStr}`);
    } else {
      // format a default
      outStr = this.props.defaultImg || '';
      file = {};
      file.secure_url = outStr;
      file.url = outStr;
    }
    /*eslint-enable camelcase */
    var outputImageWithAnchor = (<a href={this.props.secure ? file.secure_url : file.url}>
      <img style={this.props.style} src={outStr} alt={this.props.alt}/>
    </a>);

    return (this.props.outputTextOnly) ? outStr : outputImageWithAnchor;
  }
}

export default CloudinaryImg;
