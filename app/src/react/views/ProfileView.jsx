import React from 'react';
import FullDataCaptureForm from '../components/FullDataCaptureForm.jsx';
import UploadProfile from '../components/UploadProfile.jsx';
import {connect} from 'react-redux';

function mapCaptureFormProps(state) {
  return {
    title: "Mr",
    forename: "Matthew",
    surname: "Tsinontas",
    telephone: "07805063052",
    jobTitle: "Web Developer",
    businessArea: "Digital",
    skype: "matthew.tsinontas",
    timezone: "Europe/London"
    //action: updateUserObject
  };
};
var MappedDataCaptureForm = connect(mapCaptureFormProps)(FullDataCaptureForm);

class ProfileView extends React.Component {

  constructor() {
    super();
  }
  //Just a dummy implementation to display to Paul, will refactor into proper classes in my next branch!
  //Just keeping the pull request small for ya son ;)
  render() {
    return (
      <div className="profile">
        <div className="header">
          <div className="header-text">
            <h1>My profile</h1>
            <h6>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.</h6>
          </div>
        </div>
        <div className="main">
          <div className="main-inner clearfix">
            <div className="col-sm-4">
              <UploadProfile />
              <div className="details-panel">
                <div className="panel-header">
                  <h3>My information</h3>
                </div>
                <div className="panel-inner">
                  <h5>Leadership Programme Name 2nd line if needed</h5>
                  <p>Cohort: 1 Team: 2</p>
                  <p>Organisation: Organisation name</p>
                  <p><b>name@email.co.uk</b></p>
                  <p className="small-text">If these details are incorrect please contact <a href="mailto:">email@email.com <i className="fa fa-chevron-right"></i></a></p>
                </div>
              </div>
            </div>
            <div className="col-sm-7 col-sm-offset-1">
              <MappedDataCaptureForm />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default ProfileView;
