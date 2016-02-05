import React from 'react';
import FullDataCaptureForm from '../components/FullDataCaptureForm.jsx';
import UploadProfile from '../components/UploadProfile.jsx';
import {connect} from 'react-redux';
import store from '../../redux/store';
import {updateUserObject, saveUserProfile, saveUserPassword} from '../../redux/actions/usersActions';
var dispatch = store.dispatch;

function mapCaptureFormProps(state) {
  var user = state.user;
  return {
    title: user.title,
    forename: user.forename,
    surname: user.surname,
    telephone: user.properties ? user.properties.phone : "",
    jobTitle: user.properties ? user.properties.jobTitle : "",
    businessArea: user.properties ? user.properties.businessArea : "",
    skype: user.properties ? user.properties.skype : "",
    timezone: user.timezone,
    password: user.password,
    confirm: user.confirm,
    detailsLoading: user.detailsLoading,
    detailsSuccess: user.detailsSuccess,
    detailsError: user.detailsError,
    passwordLoading: user.passwordLoading,
    passwordSuccess: user.passwordSuccess,
    passwordError: user.passwordError,
    updateUserDetails: ((field, value) => {
      dispatch(updateUserObject(field, value));
    }),
    onDetailsSave: (() => {
      dispatch(saveUserProfile());
    }),
    onPasswordSave: (() => {
      dispatch(saveUserPassword());
    })
  };
};
var MappedDataCaptureForm = connect(mapCaptureFormProps)(FullDataCaptureForm);

function mapUploadProfileProps(state) {
  return {
    buttonText: "UPLOAD / CHANGE",
    profilePic: state.user.profilePic,
    profilePicPending: state.user.profilePending
  };
}
var MappedUploadProfile = connect(mapUploadProfileProps)(UploadProfile);

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
              <MappedUploadProfile />
              <div className="details-panel">
                <div className="panel-header">
                  <h4>My information</h4>
                </div>
                <div className="panel-inner">
                  <h5>Managers to Leaders Leadership Programme</h5>
                  <p>{this.props.cohort.name}</p>
                  <p>Organisation: States of Jersey</p>
                  <p><b>{this.props.userEmail}</b></p>
                  <p className="small-text">If these details are incorrect please contact <a href="mailto:">EMAIL HERE ></a></p>
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
