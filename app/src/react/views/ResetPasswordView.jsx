import React from 'react';
import {connect} from 'react-redux';
import {updatePassword, logoutAction, finishedRecoverPassword, fetchInitialUserData} from '../../redux/actions/authActions';

class ResetPasswordView extends React.Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.finishedRecoverPassword = this.finishedRecoverPassword.bind(this);
    this.state = {
      password: "",
      confirmPassword: "",
      passwordsDontMatchError: false
    };
  }

  componentWillMount() {
    var token = this.props.params.userToken;
    var dispatch = this.props.dispatch;
    dispatch(fetchInitialUserData(token));
  }

  render() {
    let passwordsDontMatchError = (this.state.passwordsDontMatchError) ? (
      <div className="alert alert-danger">
        <p>Your passwords don't match, please check your spelling and try again</p>
      </div>
    ) : null;
    let serverError = (this.props.serverError) ? (
      <div className="alert alert-danger">
        <p>There has been an error on the server, please contact Cirrus support</p>
      </div>
    ) : null;
    let btnText = (this.props.loading) ? <img src="assets/img/ajax-loader.gif"/> : "SAVE";
    let content = (!this.props.success) ? (
      <div className="form">
        <div className="recover-password">
          <p style={{textAlign: "center"}}>Please enter a new password below</p>
          <form onSubmit={this.onSubmit} >
            <input required className="form-control" id="password" type="password" placeholder="Password" value={this.state.password} onChange={this.onChange.bind(this, "password")}/>
            <input required className="form-control" id="confirmPassword" type="password" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.onChange.bind(this, "confirmPassword")}/>
            <button type="submit" className="btn btn-block submit" style={{color: "white"}}>{btnText}</button>
          </form>
        </div>
        {passwordsDontMatchError}
        {serverError}
      </div>
    ) : (
      <div className="form">
        <div className="recover-password">
          <p>Please click <a onClick={this.finishedRecoverPassword} href="/#/login">here</a> to return to the login screen</p>
        </div>
      </div>
    );
    return (
      <div className="wrapper">
        <div className="login-wrapper">
          <div className="login">
            <div className="logo">
              <img src="assets/img/programme-logo.png" alt="logo" />
            </div>
            {content}
          </div>
        </div>
      </div>
    );
  }

  finishedRecoverPassword() {
    this.props.dispatch(logoutAction());
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      this.setState({passwordsDontMatchError: false});
      this.props.dispatch(updatePassword(this.state.password, this.state.confirmPassword));
    } else {
      this.setState({passwordsDontMatchError: true});
    }
  }

  onChange(field, e) {
    this.setState({
      [field]: e.target.value
    });
  }

}

function mapResetPasswordFormProps(state) {
  return {
    loading: state.auth.waitingForRecoverPassword,
    success: state.auth.recoverPasswordSuccess,
    serverError: state.auth.authError
  };
}
let mappedResetPasswordView = connect(mapResetPasswordFormProps)(ResetPasswordView);
export default mappedResetPasswordView;