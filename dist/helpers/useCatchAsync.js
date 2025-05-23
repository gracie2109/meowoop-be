"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCatchAsync = void 0;
var _httpException = require("../types/httpException.type");
var useCatchAsync = exports.useCatchAsync = function useCatchAsync(fn) {
  return function (req, res, next) {
    return Promise.resolve(fn(req, res, next))["catch"](function (error) {
      var httpException = new _httpException.HttpException(error);
      return res.status(httpException.statusCode).json(httpException);
    });
  };
};