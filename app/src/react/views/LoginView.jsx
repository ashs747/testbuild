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
    this.state = {
      email: '',
      password: ''
    };
  }

  componentWillMount() {
    dispatch(logoutAction());
  }

  render() {
    let loginText = (this.props.loading) ? <img src="assets/img/ajax-loader.gif" /> : "Log in";
    let error = (this.props.error) ? this.mapError(this.props.error) : null;
    return (
      <div className="wrapper">
        <div className="login-wrapper">
          <div className="login">
            <div className="logo">
              <img src="assets/img/programme-logo.png" alt="logo" />
            </div>
            <div className="form">
              <form onSubmit={this.onLoginSubmit}>
                <input id="email" reqruied type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.changeHandler.bind(this, 'email')}/>
                <input id="password" required type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.changeHandler.bind(this, 'password')}/>
                <Button id="submit" className="btn btn-block" type="submit">{loginText}</Button>
              </form>
              {error}
              <div className="links">
                <a href="javascript:void(0)">Forgotten Password?</a>
                <a href="javascript:void(0)">Need help?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  mapError(error) {
    let message = "";
    switch (error.code) {
      case 401:
        message = "Invalid login details";
        break;
      default:
        message = "There was an unexpecter error, please contact Cirrus support";
        break;
    }
    return (
      <div className="error alert alert-danger">{message}</div>
    );
  }s

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

function mapLoginProps(state) {
  return {
    error: state.auth.error,
    loading: state.auth.waitingForLogin
  };
};

var mappedLoginView = connect(mapLoginProps)(LoginView);

export default mappedLoginView;
