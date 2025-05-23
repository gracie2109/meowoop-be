"use strict";

require("dotenv/config");
var _app = _interopRequireDefault(require("./app"));
var _mongodb = _interopRequireDefault(require("./database/mongodb"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PORT = process.env.PORT || 8007;
_app["default"].listen(PORT, function () {
  console.log("[SUCCESS] ::: Server is listening on port: ".concat(PORT));
});

// connectSocketIO(server);
(0, _mongodb["default"])();