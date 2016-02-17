import React from 'react';
import FullDataCaptureForm from '../components/FullDataCaptureForm.jsx';
import UploadProfile from '../components/UploadProfile.jsx';
import UpdatePassword from '../components/UpdatePassword.jsx';
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
    email: user.email,
    cohort: state.cohort,
    telephone: user.properties ? user.properties.phone : "",
    jobTitle: user.properties ? user.properties.jobTitle : "",
    businessArea: user.properties ? user.properties.businessArea : "",
    skype: user.properties ? user.properties.skype : "",
    timezone: user.timezone,
    detailsLoading: user.detailsLoading,
    detailsSuccess: user.detailsSuccess,
    detailsError: user.detailsError,
    updateUserDetails: ((field, value) => {
      dispatch(updateUserObject(field, value));
    }),
    onDetailsSave: (() => {
      dispatch(saveUserProfile());
    })
  };
};
var MappedDataCaptureForm = connect(mapCaptureFormProps)(FullDataCaptureForm);

function mapUpdatePasswordProps(state) {
  var user = state.user;
  return {
    password: user.password,
    confirm: user.confirm,
    passwordLoading: user.passwordLoading,
    passwordSuccess: user.passwordSuccess,
    passwordError: user.passwordError,
    updateUserDetails: ((field, value) => {
      dispatch(updateUserObject(field, value));
    }),
    onPasswordSave: (() => {
      dispatch(saveUserPassword());
    })
  }
}
var MappedUpdatePassword = connect(mapUpdatePasswordProps)(UpdatePassword);

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
            <h2>My Profile</h2>
          </div>
        </div>
        <div className="main">
          <div className="main-inner clearfix">
            <div className="col-sm-7">
              <MappedDataCaptureForm />
            </div>
            <div className="col-sm-5">
              <div className="details-panel">
                <div className="panel-header">
                  <h4>Profile picture</h4>
                </div>
                <div className="panel-inner">
                  <MappedUploadProfile />
                </div>
              </div>
              <MappedUpdatePassword />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapProfileView(state) {
  return {
    profilePic: state.user.profilePic
  };
}
let mappedProfileView = connect(mapProfileView)(ProfileView);
export default mappedProfileView;
