import React from 'react';

class FullDataCaptureForm extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="full-data-capture-form">
        <div className="details-panel">
          <div className="panel-header">
            <h3>My details</h3>
          </div>
          <div className="panel-inner">
            <form onSubmit={this.onDetailsSubmit}>
              <div className="panel-row clearfix">
                <label>Title</label>
                <select className="form-control" value={this.props.title} onChange={this.onChange.bind(this, "title")}>
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
                <input className="form-control" value={this.props.jobTitle} onChange={this.onChange.bind(this, "jobTitle")} />
              </div>
              <div className="panel-row clearfix">
                <label>Business area</label>
                <input className="form-control" value={this.props.businessArea} onChange={this.onChange.bind(this, "businessArea")} />
              </div>
              <div className="panel-row clearfix">
                <label>Telephone</label>
                <input className="form-control" value={this.props.telephone} onChange={this.onChange.bind(this, "telephone")} />
              </div>
              <div className="panel-row clearfix">
                <label>Skype</label>
                <input className="form-control" value={this.props.skype} onChange={this.onChange.bind(this, "skype")} />
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
                <button type="submit" className="btn">SAVE</button>
              </div>
            </form>
          </div>
        </div>
        <div className="details-panel">
          <div className="panel-header">
            <h3>Password</h3>
          </div>
          <div className="panel-inner">
            <form onSubmit={this.onPasswordSubmit}>
              <div className="panel-row clearfix">
                <label>Password</label>
                <input className="form-control" type="password" value={this.props.password} onChange={this.onChange.bind(this, "password")} />
              </div>
              <div className="panel-row clearfix">
                <label>Confirm</label>
                <input className="form-control" type="password" value="" onChange={this.onChange.bind(this, "confirm")} />
              </div>
              <div className="panel-row clearfix">
                <button type="submit" className="btn">CHANGE PASSWORD</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  onChange(field, e) {
    e.preventDefault();
    //this.props.updateUserDetails(field, e.target.value);
  }

  onDetailsSubmit(e) {
    e.preventDefault();
    //this.props.onDetailsSave(field, e.target.value);
  }

  onPasswordSubmit(e) {
    e.preventDefault();
    //this.props.onPasswordSave(field, e.target.value);
  }

}

export default FullDataCaptureForm;
