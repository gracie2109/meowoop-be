"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendScheduleServiceResponse = exports.getVerificationEmailTemplate = exports.getDeactivateUserEmail = exports.forgotPasswordTemplate = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _queryParams = require("./queryParams");
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var getVerificationEmailTemplate = exports.getVerificationEmailTemplate = function getVerificationEmailTemplate(_ref) {
  var redirectDomain = _ref.redirectDomain,
    user = _ref.user,
    token = _ref.token,
    tokenId = _ref.tokenId;
  return {
    to: user.email,
    subject: "K\xEDch ho\u1EA1t t\xE0i kho\u1EA3n \u0111\u0103ng nh\u1EADp PETSHOP",
    html: /* html */"\n\t\t\t<div>\n\t\t\t\t<p>\n\t\t\t\t\tTh\xE2n g\u1EEDi ".concat(user.username, "!\n\t\t\t\t\t<p>\n\t\t\t\t\t\tNg\u01B0\u1EDDi d\xF9ng nh\u1EADn \u0111\u01B0\u1EE3c mail vui l\xF2ng click v\xE0o <a href='").concat(redirectDomain + '/api/auth/verify-account' + (0, _queryParams.paramsStringify)({
      _roles: user.roles,
      _token: token,
      _id: tokenId
    }), "'>link</a> n\xE0y \u0111\u1EC3 x\xE1c th\u1EF1c t\xE0i kho\u1EA3n.\n\t\t\t\t\t</p>\n\t\t\t\t\t<i>L\u01B0u \xFD: Mail x\xE1c th\u1EF1c n\xE0y c\xF3 hi\u1EC7u l\u1EF1c trong v\xF2ng 7 ng\xE0y</i>\n\t\t\t\t</p>\n\t\t\t\t<hr>\n\t\t\t\t<p>\n\t\t\t\t\t<span style=\"display: block\">Tr\xE2n tr\u1ECDng!</span>\n\t\t\t\t\t<i>PETSHOP</i>\n\t\t\t\t</p>\n\t\t\t</div>\n\t\t\t\t\t")
  };
};
var getDeactivateUserEmail = exports.getDeactivateUserEmail = function getDeactivateUserEmail(user) {
  return {
    to: user.email,
    subject: 'PETSHOP thông báo vô hiệu hóa tài khoản người dùng.',
    html: /* html */"\n       <h4>PETSHOP xin th\xF4ng b\xE1o.</h4>\n       <p>\n         T\xE0i kho\u1EA3n c\u1EE7a b\u1EA1n \u0111\xE3 b\u1ECB v\xF4 hi\u1EC7u h\xF3a k\u1EC3 t\u1EEB ng\xE0y ".concat((0, _moment["default"])().format('DD/MM/YYYY'), ".\n         N\u1EBFu c\xF3 b\u1EA5t k\u1EF3 th\u1EAFc m\u1EAFc vui l\xF2ng li\xEAn h\u1EC7 cho nh\xE0 tr\u01B0\u1EDDng theo s\u1ED1 \u0111i\u1EC7n tho\u1EA1i 0xxx.xxx.xxx\n         <hr style=\"width: 100%; height: 0.5px; background: #d1d5db\">\n         <i>L\u01B0u \xFD: \u0110\xE2y l\xE0 mail t\u1EF1 \u0111\u1ED9ng, vui l\xF2ng kh\xF4ng tr\u1EA3 l\u1EDDi mail n\xE0y.</i>\n         <br>\n         <b>Tr\xE2n tr\u1ECDng</b>\n         <br>\n         <i>PETSHOP</i>\n       </p>\n      ")
  };
};

// Hàm để đọc tệp và trả về dữ liệu dưới dạng base64
var readFileAsBase64 = function readFileAsBase64(filePath) {
  var fileData = _fs["default"].readFileSync(filePath);
  return fileData.toString('base64');
};
var sendScheduleServiceResponse = exports.sendScheduleServiceResponse = function sendScheduleServiceResponse(_ref2) {
  var data = _ref2.data;
  return {
    to: data.email,
    subject: "Thông tin đăng ký dịch vụ chăm sóc pet cưng của bạn",
    html: /* html */"\n            <div style=\"width: 100%; overflow: hidden; \">\n                <div style=\"display: grid;place-items: center;width: 100%\">\n               <div >\n                   <div class=\"header_mail\"\n                    style=\"display: flex; justify-content: space-between\"\n                   >\n                       <img src=\"https://ci3.googleusercontent.com/meips/ADKq_NZGSD9g6N1n3vqhbiXdeUz9CO9rvljGRxQQB2nlANCDSoUAte6UMjvmyF8dleFgP6zEPp2wUNaXfU8Co6YEQSZarnObdr4EM94jTnHKDe2bz9FxDinxyKn4_-NG5u8YqctaOsNPrIgs6h-BapTUequh=s0-d-e1-ft#https://bucket.mlcdn.com/a/1252/1252504/images/1daa2d79ac761042b291f047e182ce7078f17ffd.png\" id=\"m_355141115288353997logoBlock-4\" border=\"0\" alt=\"\" width=\"100\" style=\"display:block\" class=\"CToWUd\" data-bit=\"iit\">\n\n                        <h3>PETSHOP</h3>\n\n                   </div>\n                   <div style=\"margin: 3rem 0;\">\n                       <p>Ch\xFAng t\xF4i g\u1EEDi mail \u0111\u1EC3 x\xE1c nh\u1EADn \u0111\u01A1n \u0111\u0103ng k\xFD d\u1ECBch v\u1EE5 <span style=\"color: orangered; font-weight: bold\">".concat(data.service, "</span> cho th\xFA c\u01B0ng c\u1EE7a b\u1EA1n.</p>\n                       <br/>\n                       <p>Th\xF4ng tin d\u1ECBch v\u1EE5</p>\n                       <div>\n                            <ul>\n                                <li style=\"margin: .5rem 0\">SDT: <span><b>").concat(data.phoneNumber, "</b></span></li>\n                                <li style=\"margin: .5rem 0\">D\u1ECBch v\u1EE5 cho: <span><b>").concat(data.pet, "</b></span></li>\n                                <li style=\"margin: .5rem 0\">Th\u1EDDi gian: <span><b>").concat(data.date, ", ").concat(data.time, "</b></span></li>\n                                <li style=\"margin: .5rem 0\">Lo\u1EA1i d\u1ECBch v\u1EE5: <span style=\"color: orangered; font-weight: bold\">").concat(data.service, "</span></li>\n                            </ul>\n                       </div>\n                   </div>\n\n                   <div style=\"border:0.5px solid #dcdcdc; margin: 1rem 0\">  </div>\n                   <div>\n                     <p style=\"line-height: 1.5rem\">  Vui l\xF2ng \u0111\u1EBFn \u0111\xFAng gi\u1EDD, n\u1EBFu c\xF3 b\u1EA5t k\u1EF3 s\u1EF1 thay \u0111\u1ED5i n\xE0o, <br/>\n                         h\xE3y li\xEAn h\u1EC7 v\u1EDBi ch\xFAng t\xF4i qua:</p>\n\n                       <div style=\"display: flex;gap:12px\">\n                           <div id=\"section3\">\n                               <a href=\"tel:1-562-867-5309\" target=\"_blank\">\n                                     <img src=\"cid:iphone\" alt=\"\">\n                                    </a>\n                           </div>\n                            <div id=\"section\">\n                                 <a href=\"https://www.facebook.com/\" target=\"_blank\">\n                                         <img src=\"cid:zalo\" alt=\"\">\n                                    </a>\n                            </div>\n                           <div id=\"section2\">\n                                <a href=\"#\" target=\"_blank\">\n                                        <img src=\"cid:facebook\" alt=\"\">\n                                    </a>\n                           </div>\n                           <div id=\"discord\">\n                               <a href=\"#\" target=\"_blank\">\n                                    <img src=\"cid:discord\" alt=\"\">\n                               </a>\n                           </div>\n                       </div>\n                   </div>\n                   <div>\n                       <p>Tr\xE2n tr\u1ECDng,</p>\n                       <small> *Qu\xFD kh\xE1ch vui l\xF2ng kh\xF4ng tr\u1EA3 l\u1EDDi email n\xE0y*</small>\n                   </div>\n               </div>\n           </div>\n            </div>\n     \n      "),
    attachments: [{
      filename: 'discord.png',
      path: './public/discord.png',
      cid: 'discord'
    }, {
      filename: 'facebook.png',
      path: './public/facebook.png',
      cid: 'facebook'
    }, {
      filename: 'iphone.png',
      path: './public/iphone.png',
      cid: 'iphone'
    }, {
      filename: 'zalo.png',
      path: './public/zalo.png',
      cid: 'zalo'
    }]
  };
};
var forgotPasswordTemplate = exports.forgotPasswordTemplate = function forgotPasswordTemplate(_ref3) {
  var data = _ref3.data;
  return {
    to: data.email,
    subject: "Thông tin đăng ký dịch vụ chăm sóc pet cưng của bạn",
    html: /* html */"\n            <div style=\"width: 100%; overflow: hidden; \">\n                <div style=\"display: grid;place-items: center;width: 100%\">\n               <div >\n                   <div class=\"header_mail\"\n                    style=\"display: flex; justify-content: space-between\"\n                   >\n                       <img src=\"https://ci3.googleusercontent.com/meips/ADKq_NZGSD9g6N1n3vqhbiXdeUz9CO9rvljGRxQQB2nlANCDSoUAte6UMjvmyF8dleFgP6zEPp2wUNaXfU8Co6YEQSZarnObdr4EM94jTnHKDe2bz9FxDinxyKn4_-NG5u8YqctaOsNPrIgs6h-BapTUequh=s0-d-e1-ft#https://bucket.mlcdn.com/a/1252/1252504/images/1daa2d79ac761042b291f047e182ce7078f17ffd.png\" id=\"m_355141115288353997logoBlock-4\" border=\"0\" alt=\"\" width=\"100\" style=\"display:block\" class=\"CToWUd\" data-bit=\"iit\">\n\n                        <h3>PETSHOP</h3>\n\n                   </div>\n                   <div style=\"margin: 3rem 0;\">\n                        <p>Dear ".concat(data.user.username, ",</p><br />\n                       <p>Please click here to change your password:</p><br />\n                       <br/>\n                        <a href=").concat(data.recover_path, " class=\"text-red-600\">Here</a>\n                   </div>\n\n                   <div style=\"border:0.5px solid #dcdcdc; margin: 1rem 0\">  </div>\n                   <div>\n                       <div style=\"display: flex;gap:12px\">\n                           <div id=\"section3\">\n                               <a href=\"tel:1-562-867-5309\" target=\"_blank\">\n                                     <img src=\"cid:iphone\" alt=\"\">\n                                    </a>\n                           </div>\n                            <div id=\"section\">\n                                 <a href=\"https://www.facebook.com/\" target=\"_blank\">\n                                         <img src=\"cid:zalo\" alt=\"\">\n                                    </a>\n                            </div>\n                           <div id=\"section2\">\n                                <a href=\"#\" target=\"_blank\">\n                                        <img src=\"cid:facebook\" alt=\"\">\n                                    </a>\n                           </div>\n                           <div id=\"discord\">\n                               <a href=\"#\" target=\"_blank\">\n                                    <img src=\"cid:discord\" alt=\"\">\n                               </a>\n                           </div>\n                       </div>\n                   </div>\n                   <div>\n                       <p>Tr\xE2n tr\u1ECDng,</p>\n                       <small> *Qu\xFD kh\xE1ch vui l\xF2ng kh\xF4ng tr\u1EA3 l\u1EDDi email n\xE0y*</small>\n                   </div>\n               </div>\n           </div>\n            </div>\n     \n      "),
    attachments: [{
      filename: 'discord.png',
      path: './public/discord.png',
      cid: 'discord'
    }, {
      filename: 'facebook.png',
      path: './public/facebook.png',
      cid: 'facebook'
    }, {
      filename: 'iphone.png',
      path: './public/iphone.png',
      cid: 'iphone'
    }, {
      filename: 'zalo.png',
      path: './public/zalo.png',
      cid: 'zalo'
    }]
  };
};