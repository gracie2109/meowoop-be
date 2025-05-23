"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redisOptions = void 0;
require("dotenv/config");
var redisOptions = exports.redisOptions = {
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
    noDelay: false,
    keepAlive: -1,
    connectionTimeOut: 9000
  }
};