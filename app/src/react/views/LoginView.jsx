import React from 'react';
import Button from 'cirrus/react/components/Button';
import {authAction, logoutAction} from '../../redux/actions/authActions';
import config from 'cirrus/configs/appConfig';

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
          <p>Logo Here</p>
          <form onSubmit={this.onLoginSubmit}>
            <input id="email" type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.changeHandler.bind(this, 'email')}/>
            <input id="password" type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.changeHandler.bind(this, 'password')}/>
            <Button id="submit" className="btn btn-block" type="submit">Log in</Button>
          </form>
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
