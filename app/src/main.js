require('shivie8');
require('es5-shim-sham');

var config = require('cirrus').config.merge(require('./config')).merge(require('./localConfig'));
var xdomain = require('xdomain').xdomain;
var slaves = {};
slaves[config.api.url] = "/proxy.html";
xdomain.slaves(slaves);
xdomain.debug = false;

var React = require('react');
var Router = require('react-router-ie8');
var Routes = require('./react/Routes.jsx');

Router.run(Routes, Router.HashLocation, function(Root) {
  React.render(React.createElement(Root), document.getElementById('app'));
});
