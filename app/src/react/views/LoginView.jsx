import React from 'react';
import Button from 'cirrus/react/components/Button';
import {authAction, logoutAction} from '../../redux/actions/authActions';
import config from 'cirrus/configs/appConfig';
import MediaGrid from '../components/MediaGrid.jsx';

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
    let images = [{
      reference: 'http://ww1.prweb.com/prfiles/2014/04/10/11752526/gI_134971_best-image-web-hosting.png',
      mimeType: 'image/jpeg',
      variations: [{
        reference: 'http://ww1.prweb.com/prfiles/2014/04/10/11752526/gI_134971_best-image-web-hosting.png',
        mimeType: 'image/jpeg',
        variation: 'medium'
      }]
    }, {
      reference: 'http://ww1.prweb.com/prfiles/2014/04/10/11752526/gI_134971_best-image-web-hosting.png',
      mimeType: 'image/jpeg',
      variations: [{
        reference: 'http://ww1.prweb.com/prfiles/2014/04/10/11752526/gI_134971_best-image-web-hosting.png',
        mimeType: 'image/jpeg',
        variation: 'medium'
      }]
    }, {
      reference: 'http://ww1.prweb.com/prfiles/2014/04/10/11752526/gI_134971_best-image-web-hosting.png',
      mimeType: 'image/jpeg',
      variations: [{
        reference: 'http://ww1.prweb.com/prfiles/2014/04/10/11752526/gI_134971_best-image-web-hosting.png',
        mimeType: 'image/jpeg',
        variation: 'medium'
      }]
    }];
    return (
      <div className="login">
        <div className="login-box">
          <MediaGrid files={images} />
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
