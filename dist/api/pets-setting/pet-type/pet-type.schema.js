"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _mongooseAutopopulate = _interopRequireDefault(require("mongoose-autopopulate"));
var _mongooseLeanVirtuals = _interopRequireDefault(require("mongoose-lean-virtuals"));
var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var petTypeSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    unique: true,
    trim: true
  },
  description: {
    type: String
  },
  status: {
    type: Boolean,
    "default": true
  },
  icon: {
    icon: {
      type: String
    },
    color: {
      type: String
    }
  }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  },
  autoIndex: true
});
petTypeSchema.plugin(_mongooseAutopopulate["default"]);
petTypeSchema.plugin(_mongooseLeanVirtuals["default"]);
petTypeSchema.plugin(_mongoosePaginateV["default"]);
var PetsModel = _mongoose["default"].model('Pets', petTypeSchema);
var _default = exports["default"] = PetsModel;