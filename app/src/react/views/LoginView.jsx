import React from 'react';
import Button from 'cirrus/react/components/Button';
import {authAction, logoutAction} from '../../redux/actions/authActions';
import config from 'cirrus/configs/appConfig';
import {connect} from 'react-redux';
import {dispatch} from '../../redux/store';

class LoginView extends React.Component {

  constructor() {
    super();
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.showRecoverPassword = this.showRecoverPassword.bind(this);
    this.showLoginForm = this.showLoginForm.bind(this);
    this.state = {
      email: '',
      password: '',
      content: "login"
    };
  }

  render() {
    let loginText = (this.props.loading) ? <img src="assets/img/ajax-loader.gif" /> : "Log in";
    let recoverText = (this.props.loading) ? <img src="assets/img/ajax-loader.gif" /> : "Recover Password";
    let error = (this.props.error) ? this.mapError(this.props.error) : null;

    var loginForm = (
      <div className="login-form">
        <form onSubmit={this.onLoginSubmit}>
          <input id="email" reqruied type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.changeHandler.bind(this, 'email')}/>
          <input id="password" required type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.changeHandler.bind(this, 'password')}/>
          <Button id="submit" className="btn btn-block" type="submit">{loginText}</Button>
        </form>
        {error}
        <div className="links">
          <a onClick={this.showRecoverPassword}>Forgotten Password?</a>
          <a href="javascript:void(0)">Need help?</a>
        </div>
      </div>
    );
    var recoverForm = (
      <div className="recover-form">
        <form onSubmit={this.onRecoverPassword}>
          <p>Please enter the email address associated with your account below.</p>
          <input id="email" reqruied type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.changeHandler.bind(this, 'email')}/>
          <Button id="submit" className="btn btn-block" type="submit">{recoverText}</Button>
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
    if (error.message.includes("Bad Request")) {
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
    this.setState({content: "login"});
  }

  onRecoverPassword(e) {
    //dispatch email here
    //dispatch()
    e.preventDefault();
  }

  onLoginSubmit(e) {
    e.preventDefault();
    dispatch(authAction(this.state.email, this.state.password, config.appSlug));
  }

  changeHandler(field, event) {
    this.setState({
      [field]: event.target.value
    });
  }
}

export default LoginView;
