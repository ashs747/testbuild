import React from 'react';
import {findDOMNode} from 'react-dom';
import imagesLoaded from 'imagesloaded';
var $ = require('jquery');

export default class ImageView extends React.Component {

  constructor() {
    super();
    this.preloadImage = this.preloadImage.bind(this);
    this.onImagePreloaded = this.onImagePreloaded.bind(this);
    this.setCalculationMethod = this.setCalculationMethod.bind(this);
    this.getNatural = this.getNatural.bind(this);
    this.calculateImageToBoxSize = this.calculateImageToBoxSize.bind(this);
    this.calculateBoxToImageSize = this.calculateBoxToImageSize.bind(this);
    this.calculatePosition = this.calculatePosition.bind(this);
    this.setSize = this.setSize.bind(this);
    this.state = {loading: false};
  }

  componentWillMount() {
    this.calculateSize = null;
    this.container = {
      width: null,
      height: null
    };
    this.image = {
      width: null,
      height: null,
      ratio: null
    };
    this.setCalculationMethod(this.props.layout);
    this.preloadImage(this.props.src).on('done', this.onImagePreloaded);
  }

  componentDidMount() {
    this.setSize();
    $(window).on("resize", this.setSize);
  }

  componentDidUpdate(prevProps, prevState) {
    this.setSize();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.layout != nextProps.layout) {
      this.setCalculationMethod(nextProps.layout);
    }

    if (this.props.src != nextProps.src) {
      this.preloadImage(nextProps.src).on('done', this.onImagePreloaded);
    }
  }

  componentWillUnmount() {
    $(window).off("resize", this.setSize);
    this.imagesLoaded.off('done', this.onImagePreloaded);
  }

  render() {
    let image;
    let style = Object.assign({}, this.props.style, {position: "relative", overflow: "hidden"});

    if (this.state.loading) {
      style.visibility = 'hidden';
    } else {
      style.visibility = 'visible';
      image = <img key={this.props.src} alt={this.props.alt} style={{position: "absolute"}} ref="image" src={this.props.src} />;
    }

    return (
      <div {...this.props} style={style} >
        {image}
      </div>
    );
  }

  preloadImage(src) {
    this.setState({loading: true});
    var tmpImg = new Image();
    tmpImg.src = src;

    this.imagesLoaded = imagesLoaded(tmpImg);
    return this.imagesLoaded;
  }

  onImagePreloaded(instance) {
    var natural = this.getNatural(instance.elements[0]);
    this.image.width = natural.width;
    this.image.height = natural.height;
    this.image.ratio = this.image.width / this.image.height;

    this.setState({
      loading: false
    });
  }

  setCalculationMethod(layout) {
    switch (layout) {
      case "image-to-box":
        this.calculateSize = this.calculateImageToBoxSize;
        break;
      case "box-to-image":
        this.calculateSize = this.calculateBoxToImageSize;
        break;
    }
  }

  getNatural(DOMelement) {
    var img = new Image();
    img.src = DOMelement.src;
    return {width: img.width, height: img.height};
  }

  calculateImageToBoxSize() {
    var newImageWidth = 0;
    var newImageHeight = 0;

    if (this.container.width / this.image.ratio > this.container.height) {
      newImageWidth = this.container.height * this.image.ratio;
      newImageHeight = this.container.height;
    } else {
      newImageWidth = this.container.width;
      newImageHeight = this.container.width / this.image.ratio;
    }

    return {
      width: newImageWidth,
      height: newImageHeight
    };
  }

  calculateBoxToImageSize() {
    var newImageWidth = 0;
    var newImageHeight = 0;

    if (this.container.width / this.image.ratio < this.container.height) {
      newImageWidth = this.container.height * this.image.ratio;
      newImageHeight = this.container.height;
    } else {
      newImageWidth = this.container.width;
      newImageHeight = this.container.width / this.image.ratio;
    }

    return {
      width: newImageWidth,
      height: newImageHeight
    };
  }

  calculatePosition(size) {
    return {
      left: (this.container.width / 2) - (size.width / 2),
      top: (this.container.height / 2) - (size.height / 2)
    };
  }

  setSize() {
    if (!this.refs.image) {
      return;
    }

    this.container.width = $(findDOMNode(this)).width();
    this.container.height = $(findDOMNode(this)).height();
    var size = this.calculateSize();
    if (!this.props.scaleUp) {
      if (size.width > this.image.width || size.height > this.image.height) {
        size.width = this.image.width;
        size.height = this.image.height;
      }
    }

    var position = this.calculatePosition(size);
    $(findDOMNode(this.refs.image)).css({
      width: size.width,
      height: size.height,
      top: position.top,
      left: position.left
    });
  }
}
ImageView.defaultProps = {
  layout: "image-to-box",
  animateWithTransition: false,
  style: {
    height: "80px",
    width: "80px",
    display: "inline-block"
  }
};
ImageView.propTypes = {
  src: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string,
  scaleUp: React.PropTypes.bool,
  style: React.PropTypes.object
};
