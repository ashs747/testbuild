import React from 'react';

class MiniDataCaptureForm extends React.Component {

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  render() {
    let inputClasses = this.props.errorClasses || [];
    inputClasses.push('form-control');
    let inputClassText = inputClasses.join(',');
    var spinner = (this.props.loading ? <img src="assets/img/ajax-loader-trans.gif" /> : null);
    var error = this.mapError(this.props.err);
    return (
      <div className="mini-data-capture-form">
        <div className="form-inputs">
          <form>
            <input className={inputClassText} id="forename" type="text" placeholder="First Name" value={this.props.forename} onChange={this.onChange} disabled={this.props.loading} />
            <input className={inputClassText} id="surname" type="text" placeholder="Last Name" value={this.props.surname} onChange={this.onChange} disabled={this.props.loading}/>
            <input className={inputClassText} id="password" type="password" placeholder="Password" value={this.props.password} onChange={this.onChange} disabled={this.props.loading}/>
            <input className={inputClassText} id="passwordConfirm" type="password" placeholder="Confirm Password" value={this.props.passwordConfirm} onChange={this.onChange} disabled={this.props.loading}/>
          </form>
        </div>
        {error}
        {spinner}
      </div>
    );
  }

  onChange(e) {
    e.preventDefault();
    this.props.dispatch(this.props.updateAction(e.target.id, e.target.value));
  }

  mapError(errorObj) {
    if (!errorObj || !errorObj.error || errorObj.error.constructor !== Array) {
      return null;
    }
    return errorObj.error.map((err, i) => <div key={`on-boarding-erorr-${i}`} className="alert alert-danger">{err}</div>);
  }
}

export default MiniDataCaptureForm;
