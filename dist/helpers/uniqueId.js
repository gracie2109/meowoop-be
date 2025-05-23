"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateUniqueID = generateUniqueID;
function generateUniqueID() {
  var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var digits = '123456789';
  var now = new Date();
  var timestamp = now.getTime();
  var randomChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  var randomDigit = digits.charAt(Math.floor(Math.random() * digits.length));
  return "".concat(randomChar).concat(timestamp).concat(randomDigit);
}