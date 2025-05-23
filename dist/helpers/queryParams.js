"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paramsStringify = exports.multiFieldSortObjectParser = void 0;
var _sortQuery = require("../api/validation/sortQuery.validation");
var paramsStringify = exports.paramsStringify = function paramsStringify(paramsObj) {
  if (!paramsObj) return '';
  return '?' + Object.keys(paramsObj).map(function (key) {
    return key + '=' + encodeURIComponent(paramsObj[key]);
  }).join('&');
};
var multiFieldSortObjectParser = exports.multiFieldSortObjectParser = function multiFieldSortObjectParser(query) {
  try {
    if (!query) return;
    var _checkIsValidSortObje = (0, _sortQuery.checkIsValidSortObject)(query),
      error = _checkIsValidSortObje.error;
    if (error) return;
    var sortFields = query._sort.split(','); // Giả sử giá trị của query string là 'field1,field2'
    var orders = query._order.split(','); // Giả sử giá trị của query string là 'field1,field2'

    return sortFields.reduce(function (sort, field, index) {
      sort[field] = orders[index]; // Sắp xếp tăng dần trên các trường
      return sort;
    }, {});
  } catch (error) {
    throw error;
  }
};