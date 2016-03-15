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
      confirmPassword: ""
    };
  }

  componentWillMount() {
    var token = this.props.params.userToken;
    var dispatch = this.props.dispatch;
    dispatch(fetchInitialUserData(token));
  }

  render() {
    let serverError = this.mapError(this.props.error);
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
    this.props.dispatch(updatePassword(this.state.password, this.state.confirmPassword));
  }

  onChange(field, e) {
    this.setState({
      [field]: e.target.value
    });
  }

  mapError(errorObj) {
    if (!errorObj || !errorObj.error || errorObj.error.constructor !== Array) {
      return null;
    }
    return errorObj.error.map((err, i) => <div key={`on-boarding-erorr-${i}`} className="alert alert-danger">{err}</div>);
  }

}

function mapResetPasswordFormProps(state) {
  return {
    loading: state.auth.waitingForRecoverPassword,
    success: state.auth.recoverPasswordSuccess,
    error: state.auth.authError
  };
}
let mappedResetPasswordView = connect(mapResetPasswordFormProps)(ResetPasswordView);
export default mappedResetPasswordView;
