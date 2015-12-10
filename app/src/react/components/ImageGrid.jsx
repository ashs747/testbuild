import React from 'react';
import _ from 'underscore';
import imagesLoaded from 'imagesloaded';
import $ from 'jquery';
import CloudinaryImg from './CloudinaryImg.jsx';

export default class ImageGrid extends React.Component {

  constructor() {
    super();
    this.getOriginalDimensions = this.getOriginalDimensions.bind(this);
    // this.onImagesPreloaded = this.onImagesPreloaded.bind(this);
    // this.resizeImage = this.resizeImage.bind(this);
    // this.renderGrid = this.renderGrid.bind(this);
    // this.resizeRows = this.resizeRows.bind(this);
    // this.renderRows = this.renderRows.bind(this);

    this.state = {
      images: [],
      grid: [],
      rowWidth: 100
    };
  }

  componentWillMount() {
  }

  componentWillUnmount() {
   // $(window).off('resize', this.renderGrid);
  }
  componentDidMount() {
    let w = $(React.findDOMNode(this)).width();
    this.setState({rowWidth: w});
  }
  render() {
    // var grid = (!this.state.loading) ? this.state.grid.map((row, i) => {
    //   var gridRow = row.images.map((image, i) => {
    //     console.log('row build', image);
    //     return image;
    //   }
    //   );
    //   return <div key={i} className="grid-row">{gridRow}</div>;
    // }) : null;
    var grid = [];
    var rowWidth = this.state.rowWidth || 300;

    const buildRowsToGrid = (files, width) => {
      let row = [];
      let thisRowHeight;

      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let remainingWidth = width;

        if (row.length > 0) {
          remainingWidth = row.reduce((prev, cur) => {
            return prev - cur;
          }, width);
          thisRowHeight = row[0].dispHeight;
        }

        file.oDimensions = this.getOriginalDimensions(file);
        
        if (row.length === 0) {
          file.dispWidth = Math.ceil(width / 3);
          file.dispHeight = file.oDimensions.aspect * file.dispWidth;
        } else {
          file.dispHeight = thisRowHeight;
          file.dispWidth = file.dispHeight * file.oDimensions.aspect;
        }
        
        if (file.dispWidth < remainingWidth) {
          console.log('Adding to row', remainingWidth);
          console.log('items in row', row.length);
          row.push(file);
        } else {
          grid.push([...row]);
          console.log('adding row to grid', grid);
        }
      }
    };

    buildRowsToGrid(this.props.files, rowWidth);
    console.log(grid);
    // this.props.files.forEach((file) => {
    //   let dimensions = this.getOriginalDimensions(file);
    //   switch (true) {
    //     case (dimensions.aspect < 1):
    //       imgBucket.portrait.push(file);
    //       break;
          
    //     case (dimensions.aspect > 1):
    //       imgBucket.landscape.push(file);
    //       break;
    //     default:
    //       imgBucket.squ.push(file);
    //       break;
    //   }
    // });

    // portraitImagesResized = [];
    // for (let i = 0; i < imgBucket.portrait.length(); i++) {
    //   portraitImagesResized.push(<CloudinaryImg file={img} width={rowWidth}/>);
    // }
    var cloudinaryGrid = grid.map((row) => {
      let rowObj = row.map((file) => {
        return <CloudinaryImg file={file} width={file.dispWidth} height={file.dispHeight} />;
      });
      return (<div className="imageRow">
        {rowObj}
        </div>);
    });
    
    return (
      <div className={this.props.className}>
        {cloudinaryGrid}
      </div>
    );
  }

  getOriginalDimensions(file) {
    var dimensions = {};
    file.metadata.forEach((meta) => {
      if (meta.key === "height" || meta.key === "width") {
        dimensions[meta.key] = meta.value;
      }
    });
    
    dimensions.aspect = Math.ceil(dimensions.width / dimensions.height);
    return dimensions;
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
    var rows = this.renderRows(this.props.files, containerWidth);
    var grid = this.resizeRows(rows, containerWidth);

    this.setState({
      grid: grid,
      loading: false
    });
  }

  renderRows(images, containerWidth) {
    var rows = [];

    _.each(images, (imgFile) => {
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
      rows[rowIndex].images.push(image);

    });

    return rows;
  }

  resizeRows(rows, containerWidth) {
    return rows.map((row) => {
      var percentIncrease = containerWidth / row.width;
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
