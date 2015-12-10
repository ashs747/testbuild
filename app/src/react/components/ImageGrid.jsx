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
    this.$refToComponent.off('resize', (e) => {
      this.setState({rowWidth: this.$refToComponent.width()});
    });
  }
  componentDidMount() {
    this.$refToComponent = $(React.findDOMNode(this));
    this.$refToComponent.on('resize', (e) => {
      this.setState({rowWidth: this.$refToComponent.width()});
    });
    this.setState({rowWidth: $(React.findDOMNode(this)).width()});
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
    var rowWidth = this.state.rowWidth || 300;

    const buildRowsToGrid = (files, width) => {
      let grid = [];
      let j = 0;
      let row = [];
      for (let i = 0; i < files.length; i++) {
        row[j] = (row[j] instanceof Array) ? row[j] : [];
        let file = files[i];
        let remainingWidth = width;
        if (row[j].length > 0) {
          remainingWidth = row[j].reduce((prev, cur) => {
            return prev - cur.dispWidth;
          }, width);
        }
        file.oDimensions = this.getOriginalDimensions(file);
        if (row[j].length === 0) {
          let maxTargetInRow = (width > 321) ? 3 : 2;
          file.dispWidth = Math.ceil(width / maxTargetInRow);
          file.dispHeight = Math.ceil(file.dispWidth * file.oDimensions.aspect);
          row[j].push(file); // first file in row
        } else {
          
          file.dispHeight = Math.ceil(row[j][0].dispHeight);
          file.dispWidth = Math.ceil(file.dispHeight * file.oDimensions.aspect);
       
          if (remainingWidth >= file.dispWidth) {
            row[j].push(file);
          } else {
            //make the last file fill the space
            row[j][(row[j].length - 1)].dispWidth += remainingWidth;
            row[j][(row[j].length - 1)].cropMode = 'fill';
            grid.push(row[j]);
            j += 1;
            row[j] = [];
            row[j].push(file);
          }
        }
      } // end for
      return row;
    };

    let grid = buildRowsToGrid(this.props.files, rowWidth);

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
        return <CloudinaryImg file={file} width={file.dispWidth} height={file.dispHeight} crop="fill" />;
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
    let rotation = file.metadata.filter((meta) => {
      return (meta.key === 'rotate'); 
    });
    dimensions.aspect = (dimensions.width / dimensions.height);
    if (rotation.length === 1 ) {
      let swapWH = (rotation[0].value) % 180;
      if (swapWH % 90 === 0) {
        let width, height;
        width = dimensions.height;
        height = dimensions.width;
        dimensions.aspect = (dimensions.width / dimensions.height);
        return {...dimensions,
          width,
          height}
      }
    }
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
