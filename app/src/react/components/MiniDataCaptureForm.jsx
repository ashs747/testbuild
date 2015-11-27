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
    
    return (
      <div className="mini-data-capture-form">
        <div className="form-inputs">
          <form>
            <input className={inputClassText} id="forename" type="text" placeholder="First Name" value={this.props.forename} onChange={this.onChange}/>
            <input className={inputClassText} id="surname" type="text" placeholder="Last Name" value={this.props.surname} onChange={this.onChange}/>
            <input className={inputClassText} id="phone" type="text" placeholder="Phone Number" value={this.props.phone} onChange={this.onChange}/>
            <input className={inputClassText} id="password" type="password" placeholder="Password" value={this.props.password} onChange={this.onChange}/>
            <input className={inputClassText} id="passwordConfirm" type="password" placeholder="Confirm Password" value={this.props.passwordConfirm} onChange={this.onChange}/>
          </form>
        </div>
      </div>
    );
  }

  onChange(e) {
    e.preventDefault();
    this.props.dispatch(this.props.updateAction(e.target.id, e.target.value));
  }
}

export default MiniDataCaptureForm;
