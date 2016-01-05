import React from 'react';
import FullDataCaptureForm from '../components/FullDataCaptureForm.jsx';
import UploadProfile from '../components/UploadProfile.jsx';
import {connect} from 'react-redux';

function mapCaptureFormProps(state) {
  return {
    title: "",
    forename: "",
    surname: "",
    telephone: "",
    jobTitle: "",
    businessArea: "",
    skype: "",
    timezone: ""
    //action: updateUserObject
  };
};
var MappedDataCaptureForm = connect(mapCaptureFormProps)(FullDataCaptureForm);

class ProfileView extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="profile">
        <div className="header">
          <div className="header-text">
            <h2>My profile</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.</p>
          </div>
        </div>
        <div className="main">
          <div className="main-inner clearfix">
            <div className="col-md-4 col-sm-5">
              <UploadProfile buttonText="UPLOAD / CHANGE" profilePic={this.props.profilePic} />
              <div className="details-panel">
                <div className="panel-header">
                  <h4>My information</h4>
                </div>
                <div className="panel-inner">
                  <h5>Managers to Leaders Leadership Programme</h5>
                  <p>{this.props.cohort.name}</p>
                  <p>Organisation: States of Jersey</p>
                  <p><b>{this.props.userEmail}</b></p>
                  <p className="small-text">If these details are incorrect please contact <a href="mailto:">email@email.com <i className="fa fa-chevron-right"></i></a></p>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-lg-offset-1 col-md-8 col-sm-7">
              <MappedDataCaptureForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapProfileView(state) {
  return {
    profilePic: state.user.profilePic,
    userEmail: state.user.email,
    cohort: state.cohort,
  };
}
let mappedProfileView = connect(mapProfileView)(ProfileView);
export default mappedProfileView;
