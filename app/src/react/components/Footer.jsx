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
              <h3 className="semi-bold">Quick Links</h3>
              <ul className="list-one">
                <LiAnchor text="Programme" url="/#/programme"/>
                <LiAnchor text="Learning Journey" url="/#/personal-learning-journey"/>
                <LiAnchor text="My Cohort" url="/#/my-cohort"/>
              </ul>
              <ul className="list-two">
                <LiAnchor text="Learning Log" url="#"/>
                <LiAnchor text="Profile" url="/#/profile"/>
                <LiAnchor text="Toolkit" url="/#/toolkits"/>
              </ul>
              <ul className="list-three">
                <LiAnchor text="Need Help?" url={this.props.supportUrl}/>
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
    profile: state.width.profile,
    supportUrl: state.programme.supportUrl
  };
};

var linkedFooter = connect(mapFooterProps)(Footer);
export default linkedFooter;
