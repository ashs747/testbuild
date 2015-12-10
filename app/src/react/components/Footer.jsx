import React from 'react';
import LiAnchor from './LiAnchor.jsx';
import {connect} from 'react-redux';

class Footer extends React.Component {
  constructor() {
    super();
  }
  render() {
    let content = (() => {
      switch (this.props.profile) {
        case 'sm':
          return (
            <div className="footer padding"><img src="assets/img/cirrus-logo.png" /></div>
          );
          break;
        default:
          return (
            <div className="footer clearfix full">
              <h3>Quick Links</h3>
              <ul className="list-one">
                <LiAnchor text="Programme" url="/#/programme"/>
                <LiAnchor text="Learning Journey" url="/#/personal-learning-journey"/>
                <LiAnchor text="Action Learning Zone" url="/#/action-learning-zone"/>
              </ul>
              <ul className="list-two">
                <LiAnchor text="Learning Log" url="#"/>
                <LiAnchor text="Profile" url="/#/profile"/>
                <LiAnchor text="Toolkit" url="/#/toolkits"/>
              </ul>
              <ul className="list-three">
                <LiAnchor text="Need Help?" url="/#/help"/>
                <LiAnchor text="Log Out" url="/#/login"/>
              </ul>
              <img src="assets/img/cirrus-logo.png" />
            </div>
          );
          break;
      }
    })();
    return content;
  }
}

function mapFooterProps(state) {
  return {
    profile: state.width.profile
  };
};

var linkedFooter = connect(mapFooterProps)(Footer);
export default linkedFooter;
