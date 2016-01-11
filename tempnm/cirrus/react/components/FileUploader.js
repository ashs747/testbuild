'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var FileUploader = _react2['default'].createClass({
  displayName: 'FileUploader',

  propTypes: {
    uploadURL: _react2['default'].PropTypes.string.isRequired,
    onFilesAdded: _react2['default'].PropTypes.func,
    onProgress: _react2['default'].PropTypes.func,
    onError: _react2['default'].PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      multiSelect: true
    };
  },

  componentDidMount: function componentDidMount() {
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
    this.uploader.bind('Init', function (c) {
      //console.log(c.runtime);
    });

    (0, _jquery2['default'])(window).on('resize', this.onResize);
  },

  render: function render() {
    var label = this.props.children ? this.props.children : 'Browse Files';
    var loading = this.props.loading;
    var loader = 'green',
        className;

    //content = label;

    if (loading) {
      this.uploader.disableBrowse();
      className = "laoding";
    } else if (this.uploader) {
      this.uploader.disableBrowse(false);
    }

    return _react2['default'].createElement(
      'a',
      { href: 'javascript:void(0)', className: className },
      label
    );
  },

  upload: function upload() {
    this.uploader.start();
  },

  onFilesAdded: function onFilesAdded(up, files) {
    if (this.props.onFilesAdded) {
      this.props.onFilesAdded(files);
    }
  },

  onProgress: function onProgress(up, file) {
    if (this.props.onProgress) {
      this.props.onProgress(file);
    }
  },

  onFileUploaded: function onFileUploaded(up, file, data) {
    data.response = JSON.parse(data.response);
    if (this.props.onFileUploaded) {
      this.props.onFileUploaded(file, data);
    }
  },

  onUploadComplete: function onUploadComplete(up, files) {
    if (this.props.onUploadComplete) {
      this.props.onUploadComplete(files);
    }
  },

  onError: function onError(up, err) {
    if (this.props.onUploadError) {
      this.props.onUploadError(up, err);
    }
  },

  onResize: function onResize() {
    this.uploader.refresh();
  }
});

exports['default'] = FileUploader;
module.exports = exports['default'];