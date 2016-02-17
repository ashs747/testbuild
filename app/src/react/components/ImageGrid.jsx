import React from 'react';
import {findDOMNode} from 'react-dom';
import _ from 'underscore';
import $ from 'jquery';
import CloudinaryImg from './CloudinaryImg.jsx';

export default class ImageGrid extends React.Component {

  constructor() {
    super();
    this.getOriginalDimensions = this.getOriginalDimensions.bind(this);
    this.state = {
      images: [],
      grid: [],
      rowWidth: 298
    };
  }

  componentWillUnmount() {
    this.$refToComponent.off('resize', (e) => {
      this.setState({rowWidth: Math.floor(this.$refToComponent.width() - 5)});
    });
  }
  componentDidMount() {
    this.$refToComponent = $(findDOMNode(this));
    this.$refToComponent.on('resize', (e) => {
      this.setState({rowWidth: Math.floor(this.$refToComponent.width() - 5)});
    });
    this.setState({rowWidth: Math.floor(this.$refToComponent.width() - 5)});
  }
  render() {
    if (this.state.rowWidth <= 100) {
      return (<div/>);
    } else {
      var rowWidth = this.state.rowWidth || 300;

      const buildRowsToGrid = (files, width) => {
        let grid = [];
        let j = 0;
        let row = [];
        let maxTargetInRow;
        files = files.map(file => {
          file.oDimensions = this.getOriginalDimensions(file);
          return file;
        }).sort((a, b) => {
          return a.oDimensions.aspect - b.oDimensions.aspect;
        });

        for (let i = 0; i < files.length; i++) {
          row[j] = (row[j] instanceof Array) ? row[j] : [];
          let file = files[i];
          let remainingWidth = width;
          if (row[j].length > 0) {
            remainingWidth = row[j].reduce((prev, cur) => {
              return Math.floor(prev - cur.dispWidth);
            }, width);
          }
          if (row[j].length === 0) {
            maxTargetInRow = (width > 321 && files.length > 2) ? 4 : 3;
            if (files.length === 1 && file.oDimensions.aspect >= 1) {
              file.dispWidth = width;
            } else {
              file.dispWidth = Math.floor(width / maxTargetInRow);
            }
            file.dispHeight = Math.floor(file.dispWidth / file.oDimensions.aspect);
            row[j].push(file); // first file in row
          } else {
            file.dispHeight = Math.floor(row[j][0].dispHeight);
            file.dispWidth = Math.floor(file.dispHeight * file.oDimensions.aspect);

            if (remainingWidth >= file.dispWidth) {
              row[j].push(file);
            } else {
              //make the last file fill the space
              row[j][(row[j].length - 1)].dispWidth += remainingWidth;
              row[j][(row[j].length - 1)].cropMode = 'fill';
              grid.push(row[j]);
              j += 1;
              row[j] = [];
              // If its the last file,
              if (i === (files.length - 1)) {
                file.dispWidth = width;
                file.dispHeight = Math.ceil(file.dispHeight * file.oDimensions.aspect);
              }
              row[j].push(file);
            }
            //was the last pushed file the last file?
            if (i === (files.length - 1)) {
              let totalFreeWidthLeftInRow = row[j].reduce((prev, cur) => {
                if (row[j].indexOf(cur) < row[j].length) {
                  return Math.floor(prev - cur.dispWidth);
                }
                return prev;
              }, width);
              file.dispWidth = (totalFreeWidthLeftInRow + file.dispWidth) || width;
              file.cropMode = 'fill';
            }
          }
        } // end for
        return row;
      };
      let grid = buildRowsToGrid(this.props.files, rowWidth);

      var cloudinaryGrid = grid.map((row, i) => {
        let rowObj = row.map((file, j) => {
          return <CloudinaryImg file={file} key={`${j}${i}${file.etag ? file.etag : ''}`} width={file.dispWidth} height={file.dispHeight} crop="fill" />;
        });
        return (<div key={i} className={`image-row holds-${rowObj.length}-img`}>
          {rowObj}
          </div>);
      });

      return (
        <div className={this.props.className}>
          {cloudinaryGrid}
        </div>
      );
    }
  }

  getOriginalDimensions(file) {
    var dimensions = {};
    file.metadata.forEach((meta) => {
      if (meta.key === "height" || meta.key === "width") {
        dimensions[meta.key] = meta.value;
      }
    });

    let rotation = file.metadata.filter((meta) => {
      return (meta.key === 'rotate')
    });

    dimensions.aspect = (dimensions.width / dimensions.height);
    if (rotation.length === 1) {
      let swapWH = (rotation[0].value) % 180;
      if (swapWH % 90 === 0) {
        let width, height;
        width = dimensions.height;
        height = dimensions.width;
        dimensions.aspect = (width / height);
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
