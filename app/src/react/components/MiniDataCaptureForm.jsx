import React from 'react';

class MiniDataCaptureForm extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="mini-data-capture-form clearfix">
        <div className="upload-image">
          Upload image component goes here
        </div>
        <div className="form-inputs">
          <form>
            <input className="form-control" type="text" placeholder="First Name" value={this.props.forename} onChange={this.onChange.bind(this, "forename")}/>
            <input className="form-control" type="text" placeholder="Last Name" value={this.props.surname} onChange={this.onChange.bind(this, "surname")}/>
            <input className="form-control" type="text" placeholder="Phone Number" value={this.props.telephone} onChange={this.onChange.bind(this, "telephone")}/>
            <input className="form-control" type="password" placeholder="Password" value={this.props.password} onChange={this.onChange.bind(this, "password")}/>
            <input className="form-control" type="password" placeholder="Confirm Password" value="" onChange={this.onChange.bind(this, "confirm")}/>
          </form>
        </div>
      </div>
    );
  }

  onChange(field, e) {
    e.preventDefault();
    //this.props.dispatch(this.props.action(field, e.target.value));
  }

}

export default MiniDataCaptureForm;
