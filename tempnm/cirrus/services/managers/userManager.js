"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ajaxRestUser = require('../ajax/rest/user');

var _ajaxRestUser2 = _interopRequireDefault(_ajaxRestUser);

exports["default"] = {

  getUserById: function getUserById(userId) {
    if (!userId) {
      throw new Error("Invalid arguments: getUserById() requires a userId, " + arguments + " given");
    }
    return _ajaxRestUser2["default"].get(userId, {
      embed: "labels"
    });
  },

  getUsersByCohort: function getUsersByCohort(labelId) {
    if (!labelId) {
      throw new Error("Invalid arguments: getUsersByCohort() requires a labelId, " + arguments + " given");
    }
    return _ajaxRestUser2["default"].get({
      embed: "labels,files",
      query: [{
        field: "labels.id",
        type: "eq",
        value: labelId
      }]
    });
  }
};
module.exports = exports["default"];