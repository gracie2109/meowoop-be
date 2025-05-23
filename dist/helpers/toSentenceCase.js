"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toSentenceCase = toSentenceCase;
function toSentenceCase(str) {
  return str.trim().replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
    return str.toUpperCase();
  });
}