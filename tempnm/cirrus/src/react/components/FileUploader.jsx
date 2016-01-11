import React from 'react';
import $ from 'jquery';

var FileUploader = React.createClass({
  propTypes: {
    uploadURL: React.PropTypes.string.isRequired,
    onFilesAdded: React.PropTypes.func,
    onProgress: React.PropTypes.func,
    onError: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      multiSelect: true
    };
  },

  componentDidMount: function() {
    /*eslint-disable camelcase */
    this.uploader = new plupload.Uploader({
      browse_button: this.getDOMNode(),
      url: this.props.uploadURL,
      multi_selection: this.props.multiSelect,
      runtimes: 'html5,flash',
      flash_swf_url: '/assets/flash/Moxie.swf',
      file_data_name: 'file'
    });
    /*eslint-enable camelcase */

    this.uploader.init();

    this.uploader.bind('FilesAdded', this.onFilesAdded);
    this.uploader.bind('UploadProgress', this.onProgress);
    this.uploader.bind('FileUploaded', this.onFileUploaded);
    this.uploader.bind('UploadComplete', this.onUploadComplete);
    this.uploader.bind('Error', this.onError);
    this.uploader.bind('Init', function(c) {
      //console.log(c.runtime);
    });

    $(window).on('resize', this.onResize);

  },

  render: function() {
    var label = this.props.children ? this.props.children : 'Browse Files';
    var loading = this.props.loading;
    var loader = 'green', className;

    //content = label;

    if (loading) {
      this.uploader.disableBrowse();
      className = "laoding";
    } else if (this.uploader) {
      this.uploader.disableBrowse(false);
    }

    return (
      <a href="javascript:void(0)" className={className}>{label}</a>
    );
  },

  upload: function() {
    this.uploader.start();
  },

  onFilesAdded: function(up, files) {
    if (this.props.onFilesAdded) {
      this.props.onFilesAdded(files);
    }
  },

  onProgress: function(up, file) {
    if (this.props.onProgress) {
      this.props.onProgress(file);
    }
  },

  onFileUploaded: function(up, file, data) {
    data.response = JSON.parse(data.response);
    if (this.props.onFileUploaded) {
      this.props.onFileUploaded(file, data);
    }
  },

  onUploadComplete: function(up, files) {
    if (this.props.onUploadComplete) {
      this.props.onUploadComplete(files);
    }
  },

  onError: function(up, err) {
    if (this.props.onUploadError) {
      this.props.onUploadError(up, err);
    }
  },

  onResize: function() {
    this.uploader.refresh();
  }
});

export default FileUploader;
