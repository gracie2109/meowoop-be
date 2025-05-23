"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("dotenv/config");
var _process$env$NODE_ENV;
var isProduction = (_process$env$NODE_ENV = process.env.NODE_ENV) === null || _process$env$NODE_ENV === void 0 ? void 0 : _process$env$NODE_ENV.includes('production');
var AppConfig = {
  PORT: process.env.PORT || 3001,
  KEY_SESSION: process.env.KEY_SESSION,
  CLIENT_URL: isProduction ? process.env.MAIN_FRONTEND_URL : process.env.LOCAL_FRONTEND_URL,
  MONGO_URI: isProduction ? process.env.PRODUCTION_DB_URI : process.env.TEST_DB_URI,
  TAILWIND_CDN: 'https://cdn.tailwindcss.com',
  BOOTSTRAP_ICONS_CDN: 'https://cdn.tailwindcss.com'
};
var _default = exports["default"] = AppConfig;