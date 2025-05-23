"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _petType = require("./pet-type.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/pets/get-all", _petType.searchList);
router.post("/pets/create", _petType.createNew);
router["delete"]('/pets/delete', _petType.deleteController);
router.patch('/pets/update', _petType.update);
var _default = exports["default"] = router;