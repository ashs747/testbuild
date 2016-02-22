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
    this.displayModuleSubNav = this.displayModuleSubNav.bind(this);
    this.displayJourneySubNav = this.displayJourneySubNav.bind(this);
    this.state = {
      showMobileNav: false,
      displayModuleSubNav: false,
      displayJourneySubNav: false
    };
  }

  render() {
    let name = (this.props.user.forename) ? `${this.props.user.forename} ${this.props.user.surname}` : "";
    let moduleSubNav = (
      <ul>
        <li id="sub-nav-module" className="sub-nav">
          <div className="sub-nav-content clearfix">
            <ul className="modules">
              <a href="/#/module/1"><li><img src="assets/img/inspiring-connector.png"/><p>Inspiring Connector</p></li></a>
              <a href="/#/module/2"><li><img src="assets/img/ambassador-for-change.png"/><p>Ambassador for Change</p></li></a>
              <a href="/#/module/3"><li><img src="assets/img/agile-decision-maker.png"/><p>Agile Decision Maker</p></li></a>
              <a href="/#/module/4"><li><img src="assets/img/people-leader.png"/><p>People Leader</p></li></a>
              <a href="/#/module/5"><li><img src="assets/img/performance-driver.png"/><p>Performance Driver</p></li></a>
            </ul>
          </div>
        </li>
      </ul>
    );
    let journeySubNav = (
      <ul>
        <li id="sub-nav-journey" className="sub-nav">
          <div className="sub-nav-content clearfix">
            <ul className="modules">
              <a href="/#/programme"><li><i className="fa fa-circle"></i><p>Programme</p></li></a>
              <a href="/#/personal-learning-journey"><li><i className="fa fa-circle"></i><p>Learning Journey</p></li></a>
              <a><li><i className="fa fa-circle"></i><p>Learning Log</p></li></a>
            </ul>
          </div>
        </li>
      </ul>
    );

    let mobileModuleNav = (
      <div className="sub-nav">
        <a href="/#/module/1"><li onClick={this.toggleMobileNav}><img src="assets/img/inspiring-connector.png"/><p>Inspiring Connector</p></li></a>
        <a href="/#/module/2"><li onClick={this.toggleMobileNav}><img src="assets/img/ambassador-for-change.png"/><p>Ambassador for Change</p></li></a>
        <a href="/#/module/3"><li onClick={this.toggleMobileNav}><img src="assets/img/agile-decision-maker.png"/><p>Agile Decision Maker</p></li></a>
        <a href="/#/module/4"><li onClick={this.toggleMobileNav}><img src="assets/img/people-leader.png"/><p>People Leader</p></li></a>
        <a href="/#/module/5"><li onClick={this.toggleMobileNav}><img src="assets/img/performance-driver.png"/><p>Performance Driver</p></li></a>
      </div>
    );

    let mobileJourneyNav = (
      <div className="sub-nav">
        <a href="/#/programme"><li onClick={this.toggleMobileNav}><i className="fa fa-circle"></i><p>Programme</p></li></a>
        <a href="/#/personal-learning-journey"><li onClick={this.toggleMobileNav}><i className="fa fa-circle"></i><p>Learning Journey</p></li></a>
        <a><li onClick={this.toggleMobileNav}><i className="fa fa-circle"></i><p>Learning Log</p></li></a>
      </div>
    );

    let mobileNav = (this.state.showMobileNav) ? (
      <div className="mobile-nav">
        <ul>
            <LiAnchor action={this.toggleMobileNav} text="Home" url="/#/" icon="home" />
            <LiAnchor action={this.displayModuleSubNav} text="Modules" icon="cubes" className="my-learning" mobileSubNav={true} displaySubNav={this.state.displayModuleSubNav}/>
            {this.state.displayModuleSubNav ? mobileModuleNav : null}
            <LiAnchor action={this.displayJourneySubNav} text="My Journey" icon="pencil-square-o" className="my-learning" mobileSubNav={true} displaySubNav={this.state.displayJourneySubNav}/>
            {this.state.displayJourneySubNav ? mobileJourneyNav : null}
            <LiAnchor action={this.toggleMobileNav} text="My Cohort" url="/#/my-cohort" icon="users"/>
            <LiAnchor action={this.toggleMobileNav} text="Toolkit" url="/#/toolkits" icon="wrench"/>
            <LiAnchor action={this.toggleMobileNav} text="Help" url={this.props.supportUrl} icon="question-circle"/>
            <li className="cirrus-footer"><img src="assets/img/cirrus-logo.png" /></li>
        </ul>
      </div>
    ) : null;

    let mobileIcon = "fa fa-bars";

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
                    <p>Welcome <a href="/#/profile">{name}</a> | <a href={this.props.supportUrl}>Help</a> | <a href="/#/login">Logout</a></p>
                  </div>
                  <img className="cirrus-logo" src="assets/img/cirrus-logo-header.png" alt="cirrus" />
                </div>
              </div>
              <div className="nav-bottom-bar">
                <ul>
                  <LiAnchor text="Home" url="/#/" icon="home" />
                  <LiAnchor text="Modules" icon="cubes" className="sub-menu" subMenu="module" childList={moduleSubNav} />
                  <LiAnchor text="My Journey" icon="pencil-square-o" className="sub-menu" subMenu="journey" childList={journeySubNav} />
                  <LiAnchor text="My Cohort" url="/#/my-cohort" icon="users"/>
                  <LiAnchor text="Toolkit" url="/#/toolkits" icon="wrench"/>
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
      showMobileNav: !this.state.showMobileNav,
      displayModuleSubNav: false,
      displayJourneySubNav: false
    });
  }

  displayModuleSubNav() {
    this.setState({
      displayModuleSubNav: !this.state.displayModuleSubNav
    });
  }

  displayJourneySubNav() {
    this.setState({
      displayJourneySubNav: !this.state.displayJourneySubNav
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
