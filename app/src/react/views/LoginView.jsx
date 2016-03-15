import React from 'react';
import Button from '../legacy/Button.jsx';
import {authAction, logoutAction, recoverPassword, hideRecoverPassword} from '../../redux/actions/authActions';
import config from '../../config.js';
import {connect} from 'react-redux';

class LoginView extends React.Component {

  constructor() {
    super();
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.showRecoverPassword = this.showRecoverPassword.bind(this);
    this.showLoginForm = this.showLoginForm.bind(this);
    this.onRecoverPassword = this.onRecoverPassword.bind(this);
    this.state = {
      email: '',
      password: '',
      content: "login"
    };
  }

  componentWillMount() {
    this.props.dispatch(logoutAction());
  }
  render() {
    let loginText = (this.props.loading) ? <img src="assets/img/ajax-loader.gif" /> : "LOG IN";
    let recoverText = (this.props.loading) ? <img src="assets/img/ajax-loader.gif" /> : "RECOVER PASSWORD";
    let error = (this.props.error) ? this.mapError(this.props.error) : null;
    let success = (this.props.sentRecoveryEmailSuccess) ? (
      <div className="alert alert-success">
        <p>Email sent. Please check your inbox</p>
      </div>
    ) : null;
    var loginForm = (
      <div className="login-form">
        <form onSubmit={this.onLoginSubmit}>
          <input id="email" reqruied type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.changeHandler.bind(this, 'email')}/>
          <input id="password" required type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.changeHandler.bind(this, 'password')}/>
          <Button id="submit" className="btn btn-block" type="submit">{loginText}</Button>
        </form>
        {error}
        <div className="links">
          <p className="bookmark">Remember to bookmark this page so you can view it later.</p>
          <a onClick={this.showRecoverPassword}>Forgotten Password?</a>
          <a href="http://support.leadership.gov.je/support/home" target="_blank">Need help?</a>
        </div>
      </div>
    );

    var recoverForm = (
      <div className="recover-form">
        <form onSubmit={this.onRecoverPassword}>
          <p>Please enter the email address associated with your account below.</p>
          <input id="email" reqruied type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.changeHandler.bind(this, 'email')}/>
          <Button id="submit" className="btn btn-block" type="submit">{recoverText}</Button>
          {success}
          <div className="links">
            <a onClick={this.showLoginForm}>Back</a>
          </div>
      </form>
      </div>
    );

    let content = (() => {
      switch (this.state.content) {
        case "recover":
          return recoverForm;
          break;
        case "login":
          return loginForm;
          break;
      }
    })();
    return (
      <div className="wrapper">
        <div className="login-wrapper">
          <div className="login">
            <div className="logo">
              <img src="assets/img/programme-logo.png" alt="logo" />
            </div>
            <div className="form">
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }

  mapError(error) {
    let message = "There was an unexpected server error. Please contact Cirrus support";
    if (error.message && error.message.includes("Bad Request")) {
      message = "Invalid Login Details";
    }
    return (
      <div className="error alert alert-danger">{message}</div>
    );
  }

  showRecoverPassword() {
    this.setState({content: "recover"});
  }

  showLoginForm() {
    this.props.dispatch(hideRecoverPassword());
    this.setState({content: "login"});
  }

  onRecoverPassword(e) {
    e.preventDefault();
    this.props.dispatch(recoverPassword(this.state.email));
  }

  onLoginSubmit(e) {
    e.preventDefault();
    this.props.dispatch(authAction(this.state.email, this.state.password, config.appSlug));
  }

  changeHandler(field, event) {
    this.setState({
      [field]: event.target.value
    });
  }
}

export default LoginView;
