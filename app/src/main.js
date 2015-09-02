require('shivie8');
require('es5-shim-sham');
require('console-shim');

var config = require('cirrus/dist/config').merge(require('./config')).merge(require('./localConfig'));
var App = require('./react/components/App.jsx');
var React = require('react');
var xdomain = require('xdomain').xdomain;
var slaves = {};

slaves[config.api.url] = "/proxy.html";
xdomain.slaves(slaves);
xdomain.debug = false;

React.render(React.createElement(App), document.getElementById('app'));
