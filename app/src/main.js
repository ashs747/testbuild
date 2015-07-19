require('shivie8');
require('es5-shim-sham');
alert("ur joookin!");
var config = require('./config');
var xdomain = require('xdomain').xdomain;
var slaves = {};
slaves[config.api.url] = "/proxy.html";
xdomain.slaves(slaves);
xdomain.debug = false;

var React = require('react');
var Router = require('react-router-ie8');
var Routes = require('./react/Routes');

Router.run(Routes, Router.HashLocation, function(Root) {
  React.render(React.createElement(Root), document.getElementById('app'));
});
