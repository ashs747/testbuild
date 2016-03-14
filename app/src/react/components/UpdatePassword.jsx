const React = require('react');
const clearDetailFormErrors = require('../../redux/actions/usersActions').clearDetailFormErrors;

class UpdatePassword extends React.Component {

  constructor() {
    super();
    this.onPasswordSubmit = this.onPasswordSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.dispatch(clearDetailFormErrors());
  }

  render() {
    let passwordError = this.mapErrors(this.props.passwordError);
    let passwordLoading = this.props.passwordLoading ? <img src="assets/img/ajax-loader-red.gif" /> : "CHANGE PASSWORD";
    let passwordSuccess = this.props.passwordSuccess ? <div className="alert alert-success">Password saved</div> : null;
    return (
      <div className="details-panel password">
        <div className="panel-header">
          <h4>Change password</h4>
        </div>
        <div className="panel-inner">
          <form onSubmit={this.onPasswordSubmit}>
            <div className="panel-row clearfix">
              <label>New</label>
              <input required className="form-control" type="password" value={this.props.password} onChange={this.onChange.bind(this, "password")} />
            </div>
            <div className="panel-row clearfix">
              <label>Re-enter</label>
              <input required className="form-control" type="password" value={this.props.confirm} onChange={this.onChange.bind(this, "confirm")} />
            </div>
            <div className="panel-row clearfix">
              <button type="submit" className="btn">{passwordLoading}</button>
            </div>
          </form>
          {passwordError}
          {passwordSuccess}
        </div>
      </div>
    );
  }

  onChange(field, e) {
    e.preventDefault();
    this.props.updateUserDetails(field, e.target.value);
  }

  onPasswordSubmit(e) {
    e.preventDefault();
    this.props.onPasswordSave();
  }

  mapErrors(errObj) {
    if (!errObj || errObj.error.constructor !== Array) {
      return null;
    }
    return errObj.error.map((err, i) => <div key={`password-error-${i}`} className="alert alert-danger">{err}</div>)
  }

}

module.exports = UpdatePassword;
