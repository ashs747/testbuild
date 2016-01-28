import React from 'react';
import LiAnchor from './LiAnchor.jsx';
import {logoutAction} from '../../redux/actions/authActions';
import {connect} from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
    this.toggleMobileNav = this.toggleMobileNav.bind(this);
    this.state = {
      showMobileNav: false
    };
  }

  render() {
    let logo = (
      <div className="header-logo">
        <img src="assets/img/programme-logo.png" />
      </div>
    );

    let subNav = (

    );

    let navIcons = (
      <div className="tabbed-nav">
        <ul>
          <LiAnchor text="Home" url="/#/" icon="home" />
          <LiAnchor text="My Learning" subMenu={subNav} icon="pencil-square-o"/>
          <LiAnchor text="My Team" url="/#/action-learning-zone" icon="users"/>
          <LiAnchor text="Toolkit" url="/#/toolkit" icon="wrench"/>
          <LiAnchor text="Help" url={this.props.supportUrl} icon="question-circle"/>
        </ul>
      </div>
    );

    let mobileNav = (this.state.showMobileNav) ? (
      <div className="mobile-nav">
        <ul>
          <LiAnchor text="Home" action={this.toggleMobileNav} url="/#/home"/>
          <LiAnchor text="Programme" action={this.toggleMobileNav} url="/#/programme"/>
          <LiAnchor text="Learning Journey" action={this.toggleMobileNav} url="/#/personal-learning-journey"/>
          <LiAnchor text="Action Learning Zone" action={this.toggleMobileNav} url="/#/action-learning-zone"/>
          <LiAnchor text="Toolkit" action={this.toggleMobileNav} url="/#/toolkits"/>
          <LiAnchor text="Profile" action={this.toggleMobileNav} url="/#/profile"/>
          <LiAnchor text="Need Help?" action={this.toggleMobileNav} url={this.props.supportUrl}/>
          <LiAnchor text="Logout" action={this.logout} url="/#/login"/>
        </ul>
      </div>
    ) : null;

    let headerContent = (() => {
      switch (this.props.profile) {
        case "lg":
        case "mg":
          return (
            <div className="full-nav">
              <div className="top-nav-bar">
                <img src="assets/img/programme-logo.png" alt="logo" />
                <div className="header-right">
                  <img src={user.profilePic} alt="profile" />
                  <p>Welcome <a href="/#/profile">{`${user.forename} ${user.surname}`}</a> | <a href="/#/login">Logout</a></p>
                  <img src="assets/img/cirrus-logo.png" alt="cirrus" />
                </div>
              </div>
              <div className="nav-bottom-bar">
                {navIcons}
              </div>
            </div>
          );
          break;
        case "sm":
          return (
            <div className="small-nav">
              <div className="top-logo">
                <img src="assets/img/programme-logo.png" />
              </div>
              <div className="dark-blue clearfix">
                <img src="assets/img/cirrus-logo.png" />
                <div onClick={this.toggleMobileNav} className="nav-icon"><i className="fa fa-bars"></i></div>
              </div>
              {mobileNav}
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
