import React from 'react';
import Button from 'cirrus/react/components/Button';
import {authAction, logoutAction} from '../../redux/actions/authActions';
import config from 'cirrus/configs/appConfig';
import UploadMedia from '../modules/feed/components/UploadMedia.jsx';

class LoginView extends React.Component {

  constructor() {
    super();
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  componentWillMount() {
    this.props.dispatch(logoutAction());
  }

  render() {
    return (
      <div className="login">
        <div className="login-box">
          <UploadMedia feedId="testTwo" />
        </div>
      </div>
    );
  }

  onLoginSubmit(e) {
    e.preventDefault();
    this.props.dispatch(authAction(this.state.email, this.state.password, config.appSlug));
  }

  changeHandler(field, event) {
    this.setState({
      [field]: event.target.value
    });
  }

}

export default LoginView;
