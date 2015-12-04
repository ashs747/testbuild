import "babel-polyfill";
import store from './redux/store';
import {Provider} from 'react-redux';
import appConfig from 'cirrus/configs/appConfig';
import config from './config';
import localConfig from './localConfig';
appConfig.merge(config).merge(localConfig);

import App from './react/App.jsx';
import React from 'react';

var slaves = {};

React.render(
  React.createElement(Provider, {store: store}, () => {
    return React.createElement(App, null);
  }
), document.getElementById('app'));
