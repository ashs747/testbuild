import React from 'react/addons';
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
    let tabbedNav = (
      <div className="tabbed-nav">
        <ul>
          <LiAnchor text="Profile" action="" url="/#/profile"/>
          <LiAnchor text="Need Help?" action="" url={this.props.supportUrl}/>
          <LiAnchor text="Log Out" action="" url="/#/login"/>
          <img src="assets/img/cirrus-logo.png" />
        </ul>
      </div>
    );
    let navButtons = (
      <div className="nav-buttons clearfix">
        <ul>
          <LiAnchor text="Home" action="" url="/#/home"/>
          <LiAnchor text="Programme" action="" url="/#/programme"/>
          <LiAnchor text="Learning Journey" action="" url="/#/personal-learning-journey"/>
          <LiAnchor text="Action Learning Zone" url="/#/action-learning-zone"/>
          <LiAnchor text="Learning Log" action=""/>
          <LiAnchor text="Toolkit" action="" url="/#/toolkits"/>
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
          return (
            <div className="row">
              <div className="col-md-4">
                {logo}
              </div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-12">
                    {tabbedNav}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    {navButtons}
                  </div>
                </div>
              </div>
            </div>
          );
          break;
        case "md":
          return (
            <div className="container-fluid">
              <div className="row">
                <div className="col-xs-5">
                  {logo}
                </div>
                <div className="col-xs-7">
                  {tabbedNav}
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  {navButtons}
                </div>
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
    supportUrl: state.programme.supportUrl
  };
};

var linkedHeader = connect(mapHeaderProps)(Header);
export default linkedHeader;
