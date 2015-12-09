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
    
    var modStr = [];
    var file = this.props.file;
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
            modStr = 'w_200,h_200,c_thumb,g_face,';
            break;
        }
      }

      if (file.rotate || this.props.rotate) {
        if (!this.props.rotate) {
          modStr = `a_${file.rotate},${modStr}`;
        } else {
          let calculateRotate = (file.rotate + this.props.rotate) % 360;
          modStr = `a_${calculateRotate}`;
        }
      }

      for (let key in this.props) {
        if (this.props.hasOwnProperty(key)) {
          switch (key) {
            case 'width':
              modStr.push(`w_${this.props[key]}`);
              break;
            case 'height':
              modStr.push(`h_${this.props[key]}`);
              break;
            case 'crop':
              modStr.push(`c_${this.props[key]}`);
          }
        }
      }

      if (modStr) {
        modStr = `${modStr}/`;
      }

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
      <img src={outStr} alt={this.props.alt}/>
    </a>);

    return (this.props.outputTextOnly) ? outStr : outputImageWithAnchor;
  }
}

export default CloudinaryImg;

