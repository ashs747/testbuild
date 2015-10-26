import React from 'react/addons';
import LiAnchor from './LiAnchor.jsx';
import {logoutAction} from '../../redux/actions/authActions';

export default class Header extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  render() {
    var moduleList = (
      <ul>
        {
          this.props.modules.map((module, i) => {
            return <LiAnchor key={'modh' + module.id} url={"/modules/" + module.id} text={module.name} />;
          })
        }
      </ul>
      );

    return (<div className="navbar navbar-default">
      <div className="container-fluid">
        <img className="logo-left" />
        <ul className="navtop tabs">
          <LiAnchor text="My details" action="" url="/#/profile"/>
          <LiAnchor text="Need Help?" action="" url="/#/help"/>
          <LiAnchor text="Log Out" action="" url="/#/logout"/>
          <li>CirrusLogo</li>
        </ul>
        <ul className="navtop tabs">
          <LiAnchor text="Programme" action="" url="/#/programme"/>
          <LiAnchor text="Learning journey"url="/#/learning-journey" childList={moduleList}/>
          <LiAnchor text="Action Learning Zone" url="/#/action-learning-zone"/>
          <LiAnchor text="Learning Log" action="" url="/#/"/>
          <LiAnchor text="Toolkit" action="" url="/#/tools"/>
          <LiAnchor text="FAQs" action="" url="/#/faq"/>
          <LiAnchor text="Logout" action={this.logout} url="#"/>
        </ul>
      </div>
    </div>);
  }

  logout() {
    this.props.dispatch(logoutAction());
  }
}