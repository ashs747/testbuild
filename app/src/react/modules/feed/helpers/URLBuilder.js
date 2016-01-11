//URL Builder.
import React from 'react';
const isLooseMatchURL = /(\S+\.(com|net|org|edu|gov|uk)(\/\S+)?)/;
const hasPrefix = /\S+\:\/\//;

const URLBuilder = (pattern, i) => {
  var outPattern;
  if (isLooseMatchURL.test(pattern)) {
    if (!hasPrefix.test(pattern)) {
      return (<span key={i}><a href={"http://" + pattern} target="_new">{pattern}</a> </span>);
    }
    return (<span key={i}><a href={pattern} target="_new">{pattern}</a> </span>);
  }
  return pattern + ' ';
};

export default URLBuilder;
