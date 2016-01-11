import React from 'react';
import $ from 'jquery';
import imagesLoaded from 'imagesloaded';

var Loader = React.createClass({
  getInitialState: function() {
    return {
      loading: true,
      style: {}
    };
  },

  componentWillMount: function() {
    this.image = {
      width: null,
      height: null
    };

    var tmpImg = new Image();
    tmpImg.src = this.props.image;

    imagesLoaded(tmpImg, this.onImageLoaded);
  },

  render: function() {
    var image = null;

    if (!this.state.loading) {
      image = <img ref="image" style={this.state.style} src={this.props.image} alt="loader" />;
    }

    return (
      <div {...this.props} style={{position: 'relative', minHeight: this.state.style.height}}>
        {image}
      </div>
    );
  },

  onImageLoaded: function(instance) {
    this.image.width = instance.elements[0].naturalWidth;
    this.image.height = instance.elements[0].naturalHeight;

    if (this.isMounted()) {
      this.setState({
        loading: false,
        style: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: this.image.width || 'auto',
          height: this.image.height || 'auto',
          marginLeft: -(this.image.width / 2) || 'auto',
          marginTop: -(this.image.height / 2) || 'auto'
        }
      });
    }
  }
});

export default Loader;
