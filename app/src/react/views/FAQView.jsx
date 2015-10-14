import React from 'react';
import {connect} from 'react-redux';
import FAQPanel from '../components/FAQPanel.jsx';

class FAQView extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="faq">
        <div className="header">
          <div className="text">
            <h1>FAQs</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FAQPanel title="About the Programme" questions={[{title: "This is an example question", answer: "This is an example answer"}, {title: "This is another example question", answer: "This is an example answer"}]} />
            <FAQPanel title="Another Header" questions={[{title: "This is an example question", answer: "This is an example answer"}, {title: "This is another example question", answer: "This is an example answer"}]} />
        </div>
          <div className="col-md-6">
            <FAQPanel title="3rd Catagory" questions={[{title: "This is an example question", answer: "This is an example answer"}, {title: "This is another example question", answer: "This is an example answer"}]} />
            <FAQPanel title="4th Catagory" questions={[{title: "This is an example question", answer: "This is an example answer"}, {title: "This is another example question", answer: "This is an example answer"}]} />
          </div>
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
