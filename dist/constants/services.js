"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.services = exports.categories = void 0;
var services = exports.services = [{
  name: "cạo lông"
}, {
  name: "tắm vệ sinh"
}, {
  name: "tắm cạo toàn thân"
}, {
  name: "tắm cạo thẩm mỹ"
}, {
  name: "tắm cắt tạo kiểu (full option)"
}, {
  name: "tắm cạo trừ 4 chân & đầu"
}];
var categories = exports.categories = [{
  id: '1',
  name: "pet food",
  status: true,
  children: [{
    id: '1.1',
    name: "Food for dog",
    status: true,
    children: []
  }, {
    id: '1.2',
    name: "Food for cat",
    status: true,
    children: [{
      id: '1.2.1',
      name: "for kitten",
      status: true,
      children: []
    }, {
      id: '1.2.2',
      name: "for adult",
      status: true,
      children: []
    }]
  }]
}];