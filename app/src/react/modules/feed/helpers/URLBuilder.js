//URL Builder.
import React from 'react';
const isLooseMatchURL = /(\S+\.(com|net|org|edu|gov|uk)(\/\S+)?)/;
const hasPrefix = /\S+\:\/\//;

const URLBuilder = (pattern) => {
  var outPattern;
  if (isLooseMatchURL.test(pattern)) {
    if (!hasPrefix.test(pattern)) {
      return (<span><a href={"http://" + pattern} target="_new">{pattern}</a> </span>);
    }
    return (<span><a href={pattern} target="_new">{pattern}</a> </span>);
  }
  return pattern + ' ';
};

export default URLBuilder;