import React from 'react';
import LiAnchor from './LiAnchor.jsx';
import {logoutAction} from '../../redux/actions/authActions';
import {connect} from 'react-redux';
import CloudinaryImg from './CloudinaryImg.jsx';

class Header extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
    this.toggleMobileNav = this.toggleMobileNav.bind(this);
    this.displaySubNav = this.displaySubNav.bind(this);
    this.state = {
      showMobileNav: false,
      displaySubNav: false
    };
  }

  render() {
    let name = (this.props.user.forename) ? `${this.props.user.forename} ${this.props.user.surname}` : "";
    let subnav = (
      <ul>
        <li className="sub-nav">
          <div className="sub-nav-content clearfix">
            <div className="col-sm-6">
              <ul className="modules">
                <a href="/#/module/1"><li><img src="assets/img/inspiring-connector.png"/><p>Module 1</p></li></a>
                <a href="/#/module/2"><li><img src="assets/img/ambassador-for-change.png"/><p>Module 2</p></li></a>
                <a href="/#/module/3"><li><img src="assets/img/agile-decision-maker.png"/><p>Module 3</p></li></a>
                <a href="/#/module/4"><li><img src="assets/img/people-leader.png"/><p>Module 4</p></li></a>
                <a href="/#/module/5"><li><img src="assets/img/performance-driver.png"/><p>Module 5</p></li></a>
              </ul>
            </div>
            <div className="col-sm-6">
              <ul className="other-links">
                <a href="/#/programme"><li><i className="fa fa-circle"></i><p>Programme</p></li></a>
                <a href="/#/personal-learning-journey"><li><i className="fa fa-circle"></i><p>Learning Journey</p></li></a>
                <li><i className="fa fa-circle"></i><p>Learning Log</p></li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    );

    let mobileSubNav = (
      <div>
        <a href="/#/module/1"><li><img src="assets/img/inspiring-connector.png"/><p>Module 1</p></li></a>
        <a href="/#/module/2"><li><img src="assets/img/ambassador-for-change.png"/><p>Module 2</p></li></a>
        <a href="/#/module/3"><li><img src="assets/img/agile-decision-maker.png"/><p>Module 3</p></li></a>
        <a href="/#/module/4"><li><img src="assets/img/people-leader.png"/><p>Module 4</p></li></a>
        <a href="/#/module/5"><li><img src="assets/img/performance-driver.png"/><p>Module 5</p></li></a>
        <a href="/#/programme"><li><i className="fa fa-circle"></i><p>Programme</p></li></a>
        <a href="/#/personal-learning-journey"><li><i className="fa fa-circle"></i><p>Learning Journey</p></li></a>
        <li><i className="fa fa-circle"></i><p>Learning Log</p></li>
      </div>
    );

    let mobileNav = (this.state.showMobileNav) ? (
      <div className="mobile-nav">
        <ul>
            <LiAnchor action={this.toggleMobileNav} text="Home" url="/#/" icon="home" />
            <LiAnchor action={this.displaySubNav} text="My Learning" icon="users"/>
            {this.state.displaySubNav ? mobileSubNav : null}
            <LiAnchor action={this.toggleMobileNav} text="My Team" url="/#/action-learning-zone" icon="users"/>
            <LiAnchor action={this.toggleMobileNav} text="Toolkit" url="/#/toolkits" icon="wrench"/>
            <LiAnchor action={this.toggleMobileNav} text="Help" url={this.props.supportUrl} icon="question-circle"/>
            <li className="cirrus-footer"><img src="assets/img/cirrus-logo.png" /></li>
        </ul>
      </div>
    ) : null;

    let mobileIcon = "fa fa-bars";
    if (this.state.showMobileNav) {
      mobileIcon += " fa-rotate-90";
    }

    let headerContent = (() => {
      switch (this.props.profile) {
        case "sm":
          return (
            <div className="small-nav">
              <div className="top-small-nav clearfix">
                <div className="programme-logo">
                  <img src="assets/img/programme-logo.png" />
                </div>
                <div onClick={this.toggleMobileNav} className="nav-icon"><i className={mobileIcon}></i></div>
              </div>
              {mobileNav}
            </div>
          );
          break;
        default:
          return (
            <div className="full-nav">
              <div className="top-nav-bar clearfix">
                <a href="/#/">
                  <img className="programme-logo" src="assets/img/programme-logo.png" alt="logo" />
                </a>
                <div className="header-right">
                  <div className="links clearfix">
                    <div className="profile-pic">
                      <CloudinaryImg file={this.props.user.profilePic} defaultImg="assets/img/profile-placeholder.jpg" />
                    </div>
                    <p>Welcome <a href="/#/profile">{name}</a> | <a href="/#/login">Logout</a></p>
                  </div>
                  <img className="cirrus-logo" src="assets/img/cirrus-logo-header.png" alt="cirrus" />
                </div>
              </div>
              <div className="nav-bottom-bar">
                <ul>
                  <LiAnchor text="Home" url="/#/" icon="home" />
                  <LiAnchor text="My Learning" icon="pencil-square-o" className="sub-menu" childList={subnav} />
                  <LiAnchor text="My Team" url="/#/action-learning-zone" icon="users"/>
                  <LiAnchor text="Toolkit" url="/#/toolkits" icon="wrench"/>
                  <LiAnchor text="Help" url={this.props.supportUrl} icon="question-circle"/>
                </ul>
              </div>
            </div>
          );
          break;
      }
    })();

    return (
      <div className="header">
        {headerContent}
      </div>
    );
  }

  logout() {
    this.props.dispatch(logoutAction());
  }

  toggleMobileNav() {
    this.setState({
      showMobileNav: !this.state.showMobileNav
    });
  }

  displaySubNav() {
    this.setState({
      displaySubNav: !this.state.displaySubNav
    });
  }
}

function mapHeaderProps(state) {
  return {
    profile: state.width.profile,
    supportUrl: state.programme.supportUrl,
    user: state.user
  };
};

var linkedHeader = connect(mapHeaderProps)(Header);
export default linkedHeader;
