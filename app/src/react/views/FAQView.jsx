import React from 'react';
import {connect} from 'react-redux';

class FAQView extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="faq">
        <div className="header">
          <h1>FAQs</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        </div>
      </div>
    );
  }

}

function mapFAQProps(state) {
  return {
    profile: state.width.profile
  };
};
var mappedFAQView = connect(mapFAQProps)(FAQView);

export default mappedFAQView;
