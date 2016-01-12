import React from 'react';
import {clearDetailFormErrors} from '../../redux/actions/usersActions';

class FullDataCaptureForm extends React.Component {

  constructor() {
    super();
    this.onDetailsSubmit = this.onDetailsSubmit.bind(this);
    this.onPasswordSubmit = this.onPasswordSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.dispatch(clearDetailFormErrors());
  }

  render() {
    let detailsError = this.props.detailsError ? <div className="alert alert-danger">There was an error saving your details, please refresh the page and try again or contact Cirrus support if the error persists</div> : null;
    let detailsLoading = this.props.detailsLoading ? <img src="assets/img/ajax-loader-red.gif" /> : "SAVE";
    let detailsSuccess = this.props.detailsSuccess ? <div className="alert alert-success">Details saved</div> : null;
    let passwordError = this.props.passwordError ? <div className="alert alert-danger">ERROR</div> : null;
    let passwordLoading = this.props.passwordLoading ? <img src="assets/img/ajax-loader-red.gif" /> : "CHANGE PASSWORD";
    let passwordSuccess = this.props.passwordSuccess ? <div className="alert alert-success">Password saved</div> : null;
    return (
      <div className="full-data-capture-form">
        <div className="details-panel details">
          <div className="panel-header">
            <h4>My details</h4>
          </div>
          <div className="panel-inner">
            <form onSubmit={this.onDetailsSubmit}>
              <div className="panel-row clearfix">
                <label>Title</label>
                <select className="form-control" value={this.props.title} onChange={this.onChange.bind(this, "title")}>
                  <option value="">- Please Select -</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                  <option value="Ms">Ms</option>
                </select>
              </div>
              <div className="panel-row clearfix">
                <label>First name</label>
                <input className="form-control" value={this.props.forename} onChange={this.onChange.bind(this, "forename")} />
              </div>
              <div className="panel-row clearfix">
                <label>Last name</label>
                <input className="form-control" value={this.props.surname} onChange={this.onChange.bind(this, "surname")} />
              </div>
              <div className="panel-row clearfix">
                <label>Job Title</label>
                <input className="form-control" value={this.props.jobTitle} onChange={this.onChange.bind(this, "properties.jobTitle")} />
              </div>
              <div className="panel-row clearfix">
                <label>Business area</label>
                <input className="form-control" value={this.props.businessArea} onChange={this.onChange.bind(this, "properties.businessArea")} />
              </div>
              <div className="panel-row clearfix">
                <label>Telephone</label>
                <input className="form-control" value={this.props.telephone} onChange={this.onChange.bind(this, "properties.phone")} />
              </div>
              <div className="panel-row clearfix">
                <label>Skype</label>
                <input className="form-control" value={this.props.skype} onChange={this.onChange.bind(this, "properties.skype")} />
              </div>
              <div className="panel-row clearfix">
                <label>Timezone</label>
                <select className="form-control" value={this.props.timezone} onChange={this.onChange.bind(this, "timezone")}>
                  <option value="">- Please Select -</option>
                  <option value="Europe/London">GMT/BST</option>
                  <option value="Asia/Singapore">SGT</option>
                  <option value="Australia/Melbourne">AEST</option>
                  <option value="Asia/Tokyo">JST</option>
                  <option value="Asia/Kolkata">IST</option>
                  <option value="Asia/Dubai">GST</option>
                </select>
              </div>
              <div className="panel-row clearfix">
                <button type="submit" className="btn">{detailsLoading}</button>
              </div>
            </form>
            {detailsError}
            {detailsSuccess}
          </div>
        </div>
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
      </div>
    );
  }

  onChange(field, e) {
    e.preventDefault();
    this.props.updateUserDetails(field, e.target.value);
  }

  onDetailsSubmit(e) {
    e.preventDefault();
    this.props.onDetailsSave();
  }

  onPasswordSubmit(e) {
    e.preventDefault();
    this.props.onPasswordSave();
  }

}

export default FullDataCaptureForm;
