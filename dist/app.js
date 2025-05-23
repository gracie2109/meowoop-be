"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _cors = _interopRequireDefault(require("cors"));
require("dotenv/config");
var _express = _interopRequireDefault(require("express"));
var _expressSession = _interopRequireWildcard(require("express-session"));
var _helmet = _interopRequireDefault(require("helmet"));
var _morgan = _interopRequireDefault(require("morgan"));
var _passport = _interopRequireDefault(require("passport"));
var _expressHandlebars = require("express-handlebars");
var _path = _interopRequireDefault(require("path"));
var _routes = _interopRequireDefault(require("./api/routes"));
var _app = _interopRequireDefault(require("./configs/app.config"));
var _statusCode = require("./configs/statusCode.config");
var bodyParser = _interopRequireWildcard(require("body-parser"));
var _cloudinary = _interopRequireDefault(require("./configs/cloudinary"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // libraries
// routers
// import {createAdminServer} from "./api/services/createAdmin.server";
// import UserModel from "./api/models/user.model";
// resolve path
var ROOT_FOLDER = _path["default"].join(__dirname, "..");
var SRC_FOLDER = _path["default"].join(ROOT_FOLDER, "src");

/* Initialize Express app */
var app = (0, _express["default"])();

/* Request body parser */
app.use(_express["default"].json());
/* Security request headers */
app.use((0, _helmet["default"])({
  contentSecurityPolicy: {
    useDefaults: false,
    directives: _objectSpread(_objectSpread({}, _helmet["default"].contentSecurityPolicy.getDefaultDirectives()), {}, {
      "style-src": ["'self'", "'unsafe-inline'", _app["default"].BOOTSTRAP_ICONS_CDN],
      "script-src": ["'self'", "'unsafe-inline'", _app["default"].TAILWIND_CDN]
    })
  }
  // referrerPolicy: {
  // 	policy: 'strict-origin-when-cross-origin'
  // }
}));

/* Logger */
app.use((0, _morgan["default"])("tiny"));

/* Using Session - Cookies */
app.use((0, _cookieParser["default"])());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use((0, _expressSession["default"])({
  saveUninitialized: false,
  secret: _app["default"].KEY_SESSION,
  store: new _expressSession.MemoryStore(),
  resave: true
  // cookie: {
  // 	sameSite: 'none',
  // 	path: '/'
  // }
}));

/* Enabling CORS */
app.use((0, _cors["default"])({
  origin: ['http://localhost:3004'],
  // credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
  // preflightContinue: true,
}));

/* Init passport */
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());

/* Engine */

app.engine("handlebars", (0, _expressHandlebars.engine)());
app.set("view engine", "handlebars");
app.set("views", _path["default"].resolve(SRC_FOLDER, "./views"));
app.use("/api", _routes["default"]);

// app.get('/', async (req, res) => {
// 	try {
// 		const countUser = await UserModel.countDocuments();
// 		if(countUser === 0){   
// 			await res.render("home");
// 		}else{
// 			await res.render("redirectToClient");
// 		}

// 	}catch (e) {
// 		console.log("create website fail", e)
// 	}
// })

// app.post('/thank-you', async (req, res) => {
// 	const body = req.body;
// 	try {
// 		await createAdminServer(body);
// 		return res.render("thankyou");

// 	}catch (err){
// 		console.log('err', err);
// 		return  res.status(HttpStatusCode.BAD_REQUEST).json({
// 			message: "Create user fail!"
// 		})
// 	}
// })
var _default = exports["default"] = app;