"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var Pusher = require("pusher");
var PusherClient = new Pusher({
  appId: "1759547",
  key: "f71a6fcc334ceee2ebcb",
  secret: "4e175c1d337b38b3c980",
  cluster: "ap1",
  useTLS: true
});
var _default = exports["default"] = PusherClient;