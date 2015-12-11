import React from 'react';
import _ from 'underscore';
import imagesLoaded from 'imagesloaded';
import $ from 'jquery';
import CloudinaryImg from './CloudinaryImg.jsx';

export default class ImageGrid extends React.Component {

  constructor() {
    super();
    this.getOriginalDimensions = this.getOriginalDimensions.bind(this);
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
    if (rotation.length === 1) {
      let swapWH = (rotation[0].value) % 180;
      if (swapWH % 90 === 0) {
        let width, height;
        width = dimensions.height;
        height = dimensions.width;
        dimensions.aspect = (dimensions.width / dimensions.height);
        return {
          ...dimensions,
          width,
          height
        };
      }
    }
    return dimensions;
  }
}

ImageGrid.propTypes = {
  rowHeight: React.PropTypes.number,
  className: React.PropTypes.string
};
