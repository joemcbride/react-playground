'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var IS_MOBILE = typeof navigator !== 'undefined' && (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i));

exports['default'] = {
  IS_MOBILE: IS_MOBILE != null ? true : false
};
module.exports = exports['default'];