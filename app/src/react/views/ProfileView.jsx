import React from 'react';
import FullDataCaptureForm from '../components/FullDataCaptureForm.jsx';
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
  //Just a dummy implementation to display to Paul, will refactor into proper classes in my next branch!
  //Just keeping the pull request small for ya son ;)
  render() {
    return (
      <div className="clearfix" style={{padding: "20px"}}>
        <div style={{float: "right", width: "50%", padding: "20px"}}>
          <MappedDataCaptureForm />
        </div>
      </div>
    );
  }

}

export default ProfileView;
