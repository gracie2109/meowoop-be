"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("dotenv/config");
var _nodemailer = _interopRequireDefault(require("nodemailer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var transporter = _nodemailer["default"].createTransport({
  service: 'gmail',
  port: 465,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});
var _default = exports["default"] = transporter;