import React from 'react';
import config from '../../config';

class FileDownload extends React.Component {

  constructor() {
    super();
  }

  render() {
    var file = {...this.props.file};
    for (let i = 0; i < file.metadata.length; i += 1) {
      file[file.metadata[i].key] = file.metadata[i].value;
    }
    var ref = `${config.amazonBucket}${file.original_filename}`;
    return (
      <a href={ref} target="_blank">{this.props.buttonText}</a>
    );
  }

}

export default FileDownload;
