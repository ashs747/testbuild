import React from 'react';
import {findDOMNode} from 'ready-dom';

import ImageView from './ImageView.jsx';
var $ = require('jquery');

export default class MediaGallery extends React.Component {

  constructor() {
    super();
    this.getMedia = this.getMedia.bind(this);
    this.setIndex = this.setIndex.bind(this);
    this.increaseIndex = this.increaseIndex.bind(this);
    this.decreaseIndex = this.decreaseIndex.bind(this);
    this.resizeClickZone = this.resizeClickZone.bind(this);
    this.state = {
      index: 0,
      media: []
    };
  }

  componentWillMount() {
    var children = this.getMedia();
    var index = (this.props.index) ? this.props.index : 0;
    var displayNav = (this.props.displayNav) ? this.props.displayNav : false;
    this.setState({
      index: index,
      media: children,
      displayNav: displayNav
    });
  }

  componentDidMount() {
    if (this.props.displayNav) {
      $(findDOMNode(this)).find('.selected-media').css({
        bottom: `${this.props.thumbnailHeight}px`,
        top: 0,
        left: 0,
        right: 0,
        position: "absolute"
      });
    } else {
      $(findDOMNode(this)).find('.selected-media').css({
        bottom: 0,
        height: "100%"
      });
    }
    var height = $(findDOMNode(this)).height() / 2;
    var navigationHeight = this.props.thumbnailHeight;
    var offset = height;

    if (this.props.displayNav) {
      offset = offset + navigationHeight;
    }

    $(findDOMNode(this)).find('.navigation').css({
      height: `${this.props.thumbnailHeight}px`
    });

    this.resizeClickZone();
    setTimeout(this.resizeClickZone, 30);
    setTimeout(this.resizeClickZone, 500);
    $(window).on("resize", this.resizeClickZone);

    var thumbnailNavIsVisible = $(findDOMNode(this)).find('.navigation').is(':visible');
    this.setState({
      displayNav: thumbnailNavIsVisible
    });
  }

  componentDidUpdate(prevProps, prevState) {
    this.resizeClickZone();
  }

  componentWillUnmount() {
    $(window).off("resize", this.resizeClickZone);
  }

  render() {
    if (this.state.media.length === 0) {
      return <div className="media-gallery"/>;
    }
    var style = (this.props.style) ? (this.props.style) : {};
    if (style.position !== "absolute") {
      style.position = "relative";
    }
    var media = this.state.media.map((item, i) => {
      if (typeof item.media === "string") {
        return <ImageView key={`full${i}`} style={{height: "100%", width: "100%"}} src={item.media} layout="image-to-box" scaleUp={this.props.scaleUp} />;
      }
      return item.media;
    });

    var thumbStyle = {
      height: `${this.props.thumbnailHeight}px`,
      width: `${this.props.thumbnailHeight}px`,
      display: "inline-block"
    };

    var thumb = (this.props.displayNav) ? this.state.media.map((item, i) => {
      var src = (item.thumb) ? item.thumb : item.src;

      if (!src) {
        src = "http://broken";
      }

      return (
        <ImageView
        className={(i === this.state.index) ? "selected" : null}
        key={`thumb${i}`}
        style={thumbStyle}
        src={src}
        alt={`thumbnail${i}`}
        layout="box-to-image"
        onClick={this.setIndex.bind(null, i)}
        scaleUp={true}
        />
      );
    }) : null;

    if (media.length > 1) {
      var leftClick = (this.state.index !== 0 || this.props.cycle) ? (
        <div className="left-click click" ref="left" onClick={this.decreaseIndex}>
          <div style={{float: "left", position: "relative"}} className="left-arrow arrow"><span style={{color: "white"}}></span></div>
        </div>
      ) : null;

      var rightClick = (this.state.index !== media.length - 1 || this.props.cycle) ? (
        <div className="right-click click" ref="right" onClick={this.increaseIndex}>
          <div style={{float: "right", position: "relative"}} className="right-arrow arrow"><span style={{color: "white"}}></span></div>
        </div>
      ) : null;
    }
    var thumbNavigation = null;
    if (this.state.displayNav) {
      thumbNavigation = <div className="navigation" style={{right: 0, left: 0, bottom: 0, position: "absolute", height: "80px"}}>{thumb}</div>;
    }
    return (
      <div {...this.props} style={style} className="media-gallery">
        <div className="selected-media">
          {media[this.state.index]}
        </div>
          {leftClick}
          {rightClick}
          {thumbNavigation}
      </div>
    );
  }

  getMedia() {
    var children = [];

    React.Children.forEach(this.props.children, (item) => {
      var full = (item.props.src) ? item.props.src : item;
      var thumb = (item.props.thumb) ? item.props.thumb : item.props.src;
      children.push({media: full, thumb: thumb});
    });

    return children;
  }

  setIndex(i) {
    this.setState({
      index: i
    });
  }

  increaseIndex() {
    var newIndex = this.state.index + 1;

    if (newIndex === this.state.media.length) {
      if (this.props.cycle) {
        newIndex = 0;
      } else {
        newIndex--;
      }
    }

    this.setState({index: newIndex});
  }

  decreaseIndex() {
    var newIndex = this.state.index - 1;

    if (newIndex === -1) {
      if (this.props.cycle) {
        newIndex = this.state.media.length - 1;
      } else {
        newIndex++;
      }
    }

    this.setState({index: newIndex});
  }

  resizeClickZone() {
    var newHeight = $(findDOMNode(this)).height() - this.props.thumbnailHeight - 50;
    $(findDOMNode(this)).find('.click').height(newHeight);
  }

}

MediaGallery.propTypes = {
  index: React.PropTypes.number,
  displayNav: React.PropTypes.bool,
  thumbnailHeight: React.PropTypes.number,
  style: React.PropTypes.object,
  scaleUp: React.PropTypes.bool,
  cycle: React.PropTypes.bool
};
