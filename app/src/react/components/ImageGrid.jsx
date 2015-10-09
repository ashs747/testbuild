import React from 'react';
import _ from 'underscore';
import imagesLoaded from 'imagesloaded';
import $ from 'jquery';

export default class ImageGrid extends React.Component {

  constructor() {
    super();
    this.getImages = this.getImages.bind(this);
    this.onImagesPreloaded = this.onImagesPreloaded.bind(this);
    this.resizeImage = this.resizeImage.bind(this);
    this.renderGrid = this.renderGrid.bind(this);
    this.resizeRows = this.resizeRows.bind(this);
    this.renderRows = this.renderRows.bind(this);

    this.state = {
      images: [],
      grid: [],
      loading: true
    };
  }

  componentWillMount() {
    var images = this.getImages(this.props.children);
    imagesLoaded(images).on('done', this.onImagesPreloaded);
  }

  componentWillUnmount() {
    $(window).off('resize', this.renderGrid);
  }

  render() {
    var grid = (!this.state.loading) ? this.state.grid.map((row, i) => {
      var gridRow = row.images.map((image, i) =>
        <img src={image.src} key={i} width={image.width} height={image.height} {...image.props} />
      );
      return <div key={i} className="grid-row">{gridRow}</div>;
    }) : null;

    return (
      <div className={this.props.className}>
        {grid}
      </div>
    );
  }

  getImages(elements) {
    return elements.map(element => {
      if (!element) {
        return false;
      }
      var img = new Image();
      img.src = element.props.src;
      img.props = element.props;
      return img;
    });
  }

  onImagesPreloaded(images) {
    this.setState({
      images: images.elements
    });

    this.renderGrid();
    $(window).on('resize', this.renderGrid);
  }

  resizeImage(image) {
    image.width = Math.ceil(image.width / image.height * this.props.rowHeight);
    image.height = this.props.rowHeight;
    return image;
  }

  renderGrid() {
    var containerWidth = $(React.findDOMNode(this)).width();

    var rows = this.renderRows(this.state.images, containerWidth);
    var grid = this.resizeRows(rows, containerWidth);

    this.setState({
      grid: grid,
      loading: false
    });
  }

  renderRows(images, containerWidth) {
    var rows = [];

    _.each(images, (element) => {
      var image = this.resizeImage(element);
      var rowIndex = rows.length - 1;

      if (rowIndex < 0 || (image.width + rows[rowIndex].width) > containerWidth) {
        rows.push({
          width: 0,
          images: []
        });
        rowIndex++;
      }

      rows[rowIndex].width += image.width;
      console.log(`row ${rowIndex}, image width: ${image.width}, current row width: ${rows[rowIndex].width}`);
      rows[rowIndex].images.push(image);

    });

    return rows;
  }

  resizeRows(rows, containerWidth) {
    return rows.map((row) => {
      var percentIncrease = containerWidth / row.width;
      console.log(containerWidth, row.width);
      row.images = row.images.map((image) => {
        image.width = Math.floor(image.width * percentIncrease);
        image.height = Math.floor(image.height * percentIncrease);
        return image;
      });
      return row;
    });
  }
}
ImageGrid.defaultProps = {
  rowHeight: 100
};
ImageGrid.propTypes = {
  rowHeight: React.PropTypes.number,
  className: React.PropTypes.string
};
