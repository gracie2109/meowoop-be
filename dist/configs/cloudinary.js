"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _cloudinary = require("cloudinary");
require("dotenv/config");
_cloudinary.v2.config({
  cloud_name: process.env.CLOUNDINARY_NAME,
  api_key: process.env.CLOUNDINARY_API_KEY,
  api_secret: process.env.CLOUNDINARY_SECRET,
  secure: true
});
var _default = exports["default"] = _cloudinary.v2;