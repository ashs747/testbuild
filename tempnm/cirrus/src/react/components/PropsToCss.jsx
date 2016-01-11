import React from 'react';

var StyleProperties = React.createClass({
  render() {
    var src = this.props.src || {};

    var styles = Object.keys(src)
      .filter(hasStyleAttributes, src)
      .map(getStyleDefinition, src)
      .join('\n');

    var markup = styles ? (<style dangerouslySetInnerHTML={{__html: styles}}></style>) : null;
    return markup;
  }
});

function hasStyleAttributes(styleName) {
  var self = this;
  return Object.keys(self[styleName]).length;
}

function getStyleDefinition(styleName) {
  var self = this,
    styleAttributes = getStyleAttributes(self[styleName]);
  return `${styleName} {${styleAttributes}}`;
}

function getStyleAttributes(attributes) {
  return Object.keys(attributes)
    .map(propertyName => {
      var value = attributes[propertyName];
      return `${propertyName}: ${value}`;
    })
    .join('; ');
}

export default StyleProperties;
