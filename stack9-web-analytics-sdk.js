(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/@aws-amplify/core/lib-esm/Logger/ConsoleLogger.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/core/lib-esm/Logger/ConsoleLogger.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConsoleLogger: () => (/* binding */ ConsoleLogger),
/* harmony export */   LOG_TYPE: () => (/* binding */ LOG_TYPE)
/* harmony export */ });
/* harmony import */ var _Util_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Util/Constants */ "../../node_modules/@aws-amplify/core/lib-esm/Util/Constants.js");
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};

var LOG_LEVELS = {
    VERBOSE: 1,
    DEBUG: 2,
    INFO: 3,
    WARN: 4,
    ERROR: 5,
};
var LOG_TYPE;
(function (LOG_TYPE) {
    LOG_TYPE["DEBUG"] = "DEBUG";
    LOG_TYPE["ERROR"] = "ERROR";
    LOG_TYPE["INFO"] = "INFO";
    LOG_TYPE["WARN"] = "WARN";
    LOG_TYPE["VERBOSE"] = "VERBOSE";
})(LOG_TYPE || (LOG_TYPE = {}));
/**
 * Write logs
 * @class Logger
 */
var ConsoleLogger = /** @class */ (function () {
    /**
     * @constructor
     * @param {string} name - Name of the logger
     */
    function ConsoleLogger(name, level) {
        if (level === void 0) { level = LOG_TYPE.WARN; }
        this.name = name;
        this.level = level;
        this._pluggables = [];
    }
    ConsoleLogger.prototype._padding = function (n) {
        return n < 10 ? '0' + n : '' + n;
    };
    ConsoleLogger.prototype._ts = function () {
        var dt = new Date();
        return ([this._padding(dt.getMinutes()), this._padding(dt.getSeconds())].join(':') +
            '.' +
            dt.getMilliseconds());
    };
    ConsoleLogger.prototype.configure = function (config) {
        if (!config)
            return this._config;
        this._config = config;
        return this._config;
    };
    /**
     * Write log
     * @method
     * @memeberof Logger
     * @param {LOG_TYPE|string} type - log type, default INFO
     * @param {string|object} msg - Logging message or object
     */
    ConsoleLogger.prototype._log = function (type) {
        var e_1, _a;
        var msg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            msg[_i - 1] = arguments[_i];
        }
        var logger_level_name = this.level;
        if (ConsoleLogger.LOG_LEVEL) {
            logger_level_name = ConsoleLogger.LOG_LEVEL;
        }
        if (typeof window !== 'undefined' && window.LOG_LEVEL) {
            logger_level_name = window.LOG_LEVEL;
        }
        var logger_level = LOG_LEVELS[logger_level_name];
        var type_level = LOG_LEVELS[type];
        if (!(type_level >= logger_level)) {
            // Do nothing if type is not greater than or equal to logger level (handle undefined)
            return;
        }
        var log = console.log.bind(console);
        if (type === LOG_TYPE.ERROR && console.error) {
            log = console.error.bind(console);
        }
        if (type === LOG_TYPE.WARN && console.warn) {
            log = console.warn.bind(console);
        }
        var prefix = "[".concat(type, "] ").concat(this._ts(), " ").concat(this.name);
        var message = '';
        if (msg.length === 1 && typeof msg[0] === 'string') {
            message = "".concat(prefix, " - ").concat(msg[0]);
            log(message);
        }
        else if (msg.length === 1) {
            message = "".concat(prefix, " ").concat(msg[0]);
            log(prefix, msg[0]);
        }
        else if (typeof msg[0] === 'string') {
            var obj = msg.slice(1);
            if (obj.length === 1) {
                obj = obj[0];
            }
            message = "".concat(prefix, " - ").concat(msg[0], " ").concat(obj);
            log("".concat(prefix, " - ").concat(msg[0]), obj);
        }
        else {
            message = "".concat(prefix, " ").concat(msg);
            log(prefix, msg);
        }
        try {
            for (var _b = __values(this._pluggables), _c = _b.next(); !_c.done; _c = _b.next()) {
                var plugin = _c.value;
                var logEvent = { message: message, timestamp: Date.now() };
                plugin.pushLogs([logEvent]);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Write General log. Default to INFO
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    ConsoleLogger.prototype.log = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this._log.apply(this, __spreadArray([LOG_TYPE.INFO], __read(msg), false));
    };
    /**
     * Write INFO log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    ConsoleLogger.prototype.info = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this._log.apply(this, __spreadArray([LOG_TYPE.INFO], __read(msg), false));
    };
    /**
     * Write WARN log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    ConsoleLogger.prototype.warn = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this._log.apply(this, __spreadArray([LOG_TYPE.WARN], __read(msg), false));
    };
    /**
     * Write ERROR log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    ConsoleLogger.prototype.error = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this._log.apply(this, __spreadArray([LOG_TYPE.ERROR], __read(msg), false));
    };
    /**
     * Write DEBUG log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    ConsoleLogger.prototype.debug = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this._log.apply(this, __spreadArray([LOG_TYPE.DEBUG], __read(msg), false));
    };
    /**
     * Write VERBOSE log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    ConsoleLogger.prototype.verbose = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this._log.apply(this, __spreadArray([LOG_TYPE.VERBOSE], __read(msg), false));
    };
    ConsoleLogger.prototype.addPluggable = function (pluggable) {
        if (pluggable && pluggable.getCategoryName() === _Util_Constants__WEBPACK_IMPORTED_MODULE_0__.AWS_CLOUDWATCH_CATEGORY) {
            this._pluggables.push(pluggable);
            pluggable.configure(this._config);
        }
    };
    ConsoleLogger.prototype.listPluggables = function () {
        return this._pluggables;
    };
    ConsoleLogger.LOG_LEVEL = null;
    return ConsoleLogger;
}());


/***/ }),

/***/ "../../node_modules/@aws-amplify/core/lib-esm/Util/Constants.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@aws-amplify/core/lib-esm/Util/Constants.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AWS_CLOUDWATCH_BASE_BUFFER_SIZE: () => (/* binding */ AWS_CLOUDWATCH_BASE_BUFFER_SIZE),
/* harmony export */   AWS_CLOUDWATCH_CATEGORY: () => (/* binding */ AWS_CLOUDWATCH_CATEGORY),
/* harmony export */   AWS_CLOUDWATCH_MAX_BATCH_EVENT_SIZE: () => (/* binding */ AWS_CLOUDWATCH_MAX_BATCH_EVENT_SIZE),
/* harmony export */   AWS_CLOUDWATCH_MAX_EVENT_SIZE: () => (/* binding */ AWS_CLOUDWATCH_MAX_EVENT_SIZE),
/* harmony export */   AWS_CLOUDWATCH_PROVIDER_NAME: () => (/* binding */ AWS_CLOUDWATCH_PROVIDER_NAME),
/* harmony export */   NO_CREDS_ERROR_STRING: () => (/* binding */ NO_CREDS_ERROR_STRING),
/* harmony export */   RETRY_ERROR_CODES: () => (/* binding */ RETRY_ERROR_CODES)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// Logging constants
var AWS_CLOUDWATCH_BASE_BUFFER_SIZE = 26;
var AWS_CLOUDWATCH_MAX_BATCH_EVENT_SIZE = 1048576;
var AWS_CLOUDWATCH_MAX_EVENT_SIZE = 256000;
var AWS_CLOUDWATCH_CATEGORY = 'Logging';
var AWS_CLOUDWATCH_PROVIDER_NAME = 'AWSCloudWatch';
var NO_CREDS_ERROR_STRING = 'No credentials';
var RETRY_ERROR_CODES = [
    'ResourceNotFoundException',
    'InvalidSequenceTokenException',
];



/***/ }),

/***/ "../../node_modules/@aws-amplify/core/lib/Logger/ConsoleLogger.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/core/lib/Logger/ConsoleLogger.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConsoleLogger = exports.LOG_TYPE = void 0;
var Constants_1 = __webpack_require__(/*! ../Util/Constants */ "../../node_modules/@aws-amplify/core/lib/Util/Constants.js");
var LOG_LEVELS = {
    VERBOSE: 1,
    DEBUG: 2,
    INFO: 3,
    WARN: 4,
    ERROR: 5,
};
var LOG_TYPE;
(function (LOG_TYPE) {
    LOG_TYPE["DEBUG"] = "DEBUG";
    LOG_TYPE["ERROR"] = "ERROR";
    LOG_TYPE["INFO"] = "INFO";
    LOG_TYPE["WARN"] = "WARN";
    LOG_TYPE["VERBOSE"] = "VERBOSE";
})(LOG_TYPE = exports.LOG_TYPE || (exports.LOG_TYPE = {}));
/**
 * Write logs
 * @class Logger
 */
var ConsoleLogger = exports.ConsoleLogger = /** @class */ (function () {
    /**
     * @constructor
     * @param {string} name - Name of the logger
     */
    function ConsoleLogger(name, level) {
        if (level === void 0) { level = LOG_TYPE.WARN; }
        this.name = name;
        this.level = level;
        this._pluggables = [];
    }
    ConsoleLogger.prototype._padding = function (n) {
        return n < 10 ? '0' + n : '' + n;
    };
    ConsoleLogger.prototype._ts = function () {
        var dt = new Date();
        return ([this._padding(dt.getMinutes()), this._padding(dt.getSeconds())].join(':') +
            '.' +
            dt.getMilliseconds());
    };
    ConsoleLogger.prototype.configure = function (config) {
        if (!config)
            return this._config;
        this._config = config;
        return this._config;
    };
    /**
     * Write log
     * @method
     * @memeberof Logger
     * @param {LOG_TYPE|string} type - log type, default INFO
     * @param {string|object} msg - Logging message or object
     */
    ConsoleLogger.prototype._log = function (type) {
        var e_1, _a;
        var msg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            msg[_i - 1] = arguments[_i];
        }
        var logger_level_name = this.level;
        if (ConsoleLogger.LOG_LEVEL) {
            logger_level_name = ConsoleLogger.LOG_LEVEL;
        }
        if (typeof window !== 'undefined' && window.LOG_LEVEL) {
            logger_level_name = window.LOG_LEVEL;
        }
        var logger_level = LOG_LEVELS[logger_level_name];
        var type_level = LOG_LEVELS[type];
        if (!(type_level >= logger_level)) {
            // Do nothing if type is not greater than or equal to logger level (handle undefined)
            return;
        }
        var log = console.log.bind(console);
        if (type === LOG_TYPE.ERROR && console.error) {
            log = console.error.bind(console);
        }
        if (type === LOG_TYPE.WARN && console.warn) {
            log = console.warn.bind(console);
        }
        var prefix = "[".concat(type, "] ").concat(this._ts(), " ").concat(this.name);
        var message = '';
        if (msg.length === 1 && typeof msg[0] === 'string') {
            message = "".concat(prefix, " - ").concat(msg[0]);
            log(message);
        }
        else if (msg.length === 1) {
            message = "".concat(prefix, " ").concat(msg[0]);
            log(prefix, msg[0]);
        }
        else if (typeof msg[0] === 'string') {
            var obj = msg.slice(1);
            if (obj.length === 1) {
                obj = obj[0];
            }
            message = "".concat(prefix, " - ").concat(msg[0], " ").concat(obj);
            log("".concat(prefix, " - ").concat(msg[0]), obj);
        }
        else {
            message = "".concat(prefix, " ").concat(msg);
            log(prefix, msg);
        }
        try {
            for (var _b = __values(this._pluggables), _c = _b.next(); !_c.done; _c = _b.next()) {
                var plugin = _c.value;
                var logEvent = { message: message, timestamp: Date.now() };
                plugin.pushLogs([logEvent]);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Write General log. Default to INFO
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    ConsoleLogger.prototype.log = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this._log.apply(this, __spreadArray([LOG_TYPE.INFO], __read(msg), false));
    };
    /**
     * Write INFO log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    ConsoleLogger.prototype.info = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this._log.apply(this, __spreadArray([LOG_TYPE.INFO], __read(msg), false));
    };
    /**
     * Write WARN log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    ConsoleLogger.prototype.warn = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this._log.apply(this, __spreadArray([LOG_TYPE.WARN], __read(msg), false));
    };
    /**
     * Write ERROR log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    ConsoleLogger.prototype.error = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this._log.apply(this, __spreadArray([LOG_TYPE.ERROR], __read(msg), false));
    };
    /**
     * Write DEBUG log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    ConsoleLogger.prototype.debug = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this._log.apply(this, __spreadArray([LOG_TYPE.DEBUG], __read(msg), false));
    };
    /**
     * Write VERBOSE log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    ConsoleLogger.prototype.verbose = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this._log.apply(this, __spreadArray([LOG_TYPE.VERBOSE], __read(msg), false));
    };
    ConsoleLogger.prototype.addPluggable = function (pluggable) {
        if (pluggable && pluggable.getCategoryName() === Constants_1.AWS_CLOUDWATCH_CATEGORY) {
            this._pluggables.push(pluggable);
            pluggable.configure(this._config);
        }
    };
    ConsoleLogger.prototype.listPluggables = function () {
        return this._pluggables;
    };
    ConsoleLogger.LOG_LEVEL = null;
    return ConsoleLogger;
}());


/***/ }),

/***/ "../../node_modules/@aws-amplify/core/lib/Logger/index.js":
/*!****************************************************************!*\
  !*** ../../node_modules/@aws-amplify/core/lib/Logger/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LOG_TYPE = exports.ConsoleLogger = void 0;
var ConsoleLogger_1 = __webpack_require__(/*! ./ConsoleLogger */ "../../node_modules/@aws-amplify/core/lib/Logger/ConsoleLogger.js");
Object.defineProperty(exports, "ConsoleLogger", ({ enumerable: true, get: function () { return ConsoleLogger_1.ConsoleLogger; } }));
Object.defineProperty(exports, "LOG_TYPE", ({ enumerable: true, get: function () { return ConsoleLogger_1.LOG_TYPE; } }));


/***/ }),

/***/ "../../node_modules/@aws-amplify/core/lib/Util/Constants.js":
/*!******************************************************************!*\
  !*** ../../node_modules/@aws-amplify/core/lib/Util/Constants.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports) => {


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RETRY_ERROR_CODES = exports.NO_CREDS_ERROR_STRING = exports.AWS_CLOUDWATCH_PROVIDER_NAME = exports.AWS_CLOUDWATCH_MAX_EVENT_SIZE = exports.AWS_CLOUDWATCH_MAX_BATCH_EVENT_SIZE = exports.AWS_CLOUDWATCH_CATEGORY = exports.AWS_CLOUDWATCH_BASE_BUFFER_SIZE = void 0;
// Logging constants
var AWS_CLOUDWATCH_BASE_BUFFER_SIZE = 26;
exports.AWS_CLOUDWATCH_BASE_BUFFER_SIZE = AWS_CLOUDWATCH_BASE_BUFFER_SIZE;
var AWS_CLOUDWATCH_MAX_BATCH_EVENT_SIZE = 1048576;
exports.AWS_CLOUDWATCH_MAX_BATCH_EVENT_SIZE = AWS_CLOUDWATCH_MAX_BATCH_EVENT_SIZE;
var AWS_CLOUDWATCH_MAX_EVENT_SIZE = 256000;
exports.AWS_CLOUDWATCH_MAX_EVENT_SIZE = AWS_CLOUDWATCH_MAX_EVENT_SIZE;
var AWS_CLOUDWATCH_CATEGORY = 'Logging';
exports.AWS_CLOUDWATCH_CATEGORY = AWS_CLOUDWATCH_CATEGORY;
var AWS_CLOUDWATCH_PROVIDER_NAME = 'AWSCloudWatch';
exports.AWS_CLOUDWATCH_PROVIDER_NAME = AWS_CLOUDWATCH_PROVIDER_NAME;
var NO_CREDS_ERROR_STRING = 'No credentials';
exports.NO_CREDS_ERROR_STRING = NO_CREDS_ERROR_STRING;
var RETRY_ERROR_CODES = [
    'ResourceNotFoundException',
    'InvalidSequenceTokenException',
];
exports.RETRY_ERROR_CODES = RETRY_ERROR_CODES;


/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/build/constants.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/build/constants.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EMPTY_DATA_SHA_256 = exports.SHA_256_HMAC_ALGO = exports.SHA_256_HASH = void 0;
exports.SHA_256_HASH = { name: "SHA-256" };
exports.SHA_256_HMAC_ALGO = {
    name: "HMAC",
    hash: exports.SHA_256_HASH
};
exports.EMPTY_DATA_SHA_256 = new Uint8Array([
    227,
    176,
    196,
    66,
    152,
    252,
    28,
    20,
    154,
    251,
    244,
    200,
    153,
    111,
    185,
    36,
    39,
    174,
    65,
    228,
    100,
    155,
    147,
    76,
    164,
    149,
    153,
    27,
    120,
    82,
    184,
    85
]);
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/build/crossPlatformSha256.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/build/crossPlatformSha256.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sha256 = void 0;
var ie11Sha256_1 = __webpack_require__(/*! ./ie11Sha256 */ "../../node_modules/@aws-crypto/sha256-browser/build/ie11Sha256.js");
var webCryptoSha256_1 = __webpack_require__(/*! ./webCryptoSha256 */ "../../node_modules/@aws-crypto/sha256-browser/build/webCryptoSha256.js");
var sha256_js_1 = __webpack_require__(/*! @aws-crypto/sha256-js */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/sha256-js/build/index.js");
var supports_web_crypto_1 = __webpack_require__(/*! @aws-crypto/supports-web-crypto */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/supports-web-crypto/build/index.js");
var ie11_detection_1 = __webpack_require__(/*! @aws-crypto/ie11-detection */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/ie11-detection/build/index.js");
var util_locate_window_1 = __webpack_require__(/*! @aws-sdk/util-locate-window */ "../../node_modules/@aws-sdk/util-locate-window/dist-es/index.js");
var util_1 = __webpack_require__(/*! @aws-crypto/util */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/util/build/index.js");
var Sha256 = /** @class */ (function () {
    function Sha256(secret) {
        if ((0, supports_web_crypto_1.supportsWebCrypto)((0, util_locate_window_1.locateWindow)())) {
            this.hash = new webCryptoSha256_1.Sha256(secret);
        }
        else if ((0, ie11_detection_1.isMsWindow)((0, util_locate_window_1.locateWindow)())) {
            this.hash = new ie11Sha256_1.Sha256(secret);
        }
        else {
            this.hash = new sha256_js_1.Sha256(secret);
        }
    }
    Sha256.prototype.update = function (data, encoding) {
        this.hash.update((0, util_1.convertToBuffer)(data));
    };
    Sha256.prototype.digest = function () {
        return this.hash.digest();
    };
    Sha256.prototype.reset = function () {
        this.hash.reset();
    };
    return Sha256;
}());
exports.Sha256 = Sha256;
//# sourceMappingURL=crossPlatformSha256.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/build/ie11Sha256.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/build/ie11Sha256.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sha256 = void 0;
var isEmptyData_1 = __webpack_require__(/*! ./isEmptyData */ "../../node_modules/@aws-crypto/sha256-browser/build/isEmptyData.js");
var constants_1 = __webpack_require__(/*! ./constants */ "../../node_modules/@aws-crypto/sha256-browser/build/constants.js");
var util_utf8_browser_1 = __webpack_require__(/*! @aws-sdk/util-utf8-browser */ "../../node_modules/@aws-sdk/util-utf8-browser/dist-es/index.js");
var util_locate_window_1 = __webpack_require__(/*! @aws-sdk/util-locate-window */ "../../node_modules/@aws-sdk/util-locate-window/dist-es/index.js");
var Sha256 = /** @class */ (function () {
    function Sha256(secret) {
        this.secret = secret;
        this.reset();
    }
    Sha256.prototype.update = function (toHash) {
        var _this = this;
        if ((0, isEmptyData_1.isEmptyData)(toHash)) {
            return;
        }
        this.operation = this.operation.then(function (operation) {
            operation.onerror = function () {
                _this.operation = Promise.reject(new Error("Error encountered updating hash"));
            };
            operation.process(toArrayBufferView(toHash));
            return operation;
        });
        this.operation.catch(function () { });
    };
    Sha256.prototype.digest = function () {
        return this.operation.then(function (operation) {
            return new Promise(function (resolve, reject) {
                operation.onerror = function () {
                    reject(new Error("Error encountered finalizing hash"));
                };
                operation.oncomplete = function () {
                    if (operation.result) {
                        resolve(new Uint8Array(operation.result));
                    }
                    reject(new Error("Error encountered finalizing hash"));
                };
                operation.finish();
            });
        });
    };
    Sha256.prototype.reset = function () {
        if (this.secret) {
            this.operation = getKeyPromise(this.secret).then(function (keyData) {
                return (0, util_locate_window_1.locateWindow)().msCrypto.subtle.sign(constants_1.SHA_256_HMAC_ALGO, keyData);
            });
            this.operation.catch(function () { });
        }
        else {
            this.operation = Promise.resolve((0, util_locate_window_1.locateWindow)().msCrypto.subtle.digest("SHA-256"));
        }
    };
    return Sha256;
}());
exports.Sha256 = Sha256;
function getKeyPromise(secret) {
    return new Promise(function (resolve, reject) {
        var keyOperation = (0, util_locate_window_1.locateWindow)().msCrypto.subtle.importKey("raw", toArrayBufferView(secret), constants_1.SHA_256_HMAC_ALGO, false, ["sign"]);
        keyOperation.oncomplete = function () {
            if (keyOperation.result) {
                resolve(keyOperation.result);
            }
            reject(new Error("ImportKey completed without importing key."));
        };
        keyOperation.onerror = function () {
            reject(new Error("ImportKey failed to import key."));
        };
    });
}
function toArrayBufferView(data) {
    if (typeof data === "string") {
        return (0, util_utf8_browser_1.fromUtf8)(data);
    }
    if (ArrayBuffer.isView(data)) {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    }
    return new Uint8Array(data);
}
//# sourceMappingURL=ie11Sha256.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/build/index.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/build/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebCryptoSha256 = exports.Ie11Sha256 = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/tslib/tslib.es6.js");
tslib_1.__exportStar(__webpack_require__(/*! ./crossPlatformSha256 */ "../../node_modules/@aws-crypto/sha256-browser/build/crossPlatformSha256.js"), exports);
var ie11Sha256_1 = __webpack_require__(/*! ./ie11Sha256 */ "../../node_modules/@aws-crypto/sha256-browser/build/ie11Sha256.js");
Object.defineProperty(exports, "Ie11Sha256", ({ enumerable: true, get: function () { return ie11Sha256_1.Sha256; } }));
var webCryptoSha256_1 = __webpack_require__(/*! ./webCryptoSha256 */ "../../node_modules/@aws-crypto/sha256-browser/build/webCryptoSha256.js");
Object.defineProperty(exports, "WebCryptoSha256", ({ enumerable: true, get: function () { return webCryptoSha256_1.Sha256; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/build/isEmptyData.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/build/isEmptyData.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isEmptyData = void 0;
function isEmptyData(data) {
    if (typeof data === "string") {
        return data.length === 0;
    }
    return data.byteLength === 0;
}
exports.isEmptyData = isEmptyData;
//# sourceMappingURL=isEmptyData.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/build/webCryptoSha256.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/build/webCryptoSha256.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sha256 = void 0;
var util_1 = __webpack_require__(/*! @aws-crypto/util */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/util/build/index.js");
var constants_1 = __webpack_require__(/*! ./constants */ "../../node_modules/@aws-crypto/sha256-browser/build/constants.js");
var util_locate_window_1 = __webpack_require__(/*! @aws-sdk/util-locate-window */ "../../node_modules/@aws-sdk/util-locate-window/dist-es/index.js");
var Sha256 = /** @class */ (function () {
    function Sha256(secret) {
        this.toHash = new Uint8Array(0);
        this.secret = secret;
        this.reset();
    }
    Sha256.prototype.update = function (data) {
        if ((0, util_1.isEmptyData)(data)) {
            return;
        }
        var update = (0, util_1.convertToBuffer)(data);
        var typedArray = new Uint8Array(this.toHash.byteLength + update.byteLength);
        typedArray.set(this.toHash, 0);
        typedArray.set(update, this.toHash.byteLength);
        this.toHash = typedArray;
    };
    Sha256.prototype.digest = function () {
        var _this = this;
        if (this.key) {
            return this.key.then(function (key) {
                return (0, util_locate_window_1.locateWindow)()
                    .crypto.subtle.sign(constants_1.SHA_256_HMAC_ALGO, key, _this.toHash)
                    .then(function (data) { return new Uint8Array(data); });
            });
        }
        if ((0, util_1.isEmptyData)(this.toHash)) {
            return Promise.resolve(constants_1.EMPTY_DATA_SHA_256);
        }
        return Promise.resolve()
            .then(function () {
            return (0, util_locate_window_1.locateWindow)().crypto.subtle.digest(constants_1.SHA_256_HASH, _this.toHash);
        })
            .then(function (data) { return Promise.resolve(new Uint8Array(data)); });
    };
    Sha256.prototype.reset = function () {
        var _this = this;
        this.toHash = new Uint8Array(0);
        if (this.secret && this.secret !== void 0) {
            this.key = new Promise(function (resolve, reject) {
                (0, util_locate_window_1.locateWindow)()
                    .crypto.subtle.importKey("raw", (0, util_1.convertToBuffer)(_this.secret), constants_1.SHA_256_HMAC_ALGO, false, ["sign"])
                    .then(resolve, reject);
            });
            this.key.catch(function () { });
        }
    };
    return Sha256;
}());
exports.Sha256 = Sha256;
//# sourceMappingURL=webCryptoSha256.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/ie11-detection/build/CryptoOperation.js":
/*!**********************************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/ie11-detection/build/CryptoOperation.js ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=CryptoOperation.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/ie11-detection/build/Key.js":
/*!**********************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/ie11-detection/build/Key.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=Key.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/ie11-detection/build/KeyOperation.js":
/*!*******************************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/ie11-detection/build/KeyOperation.js ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=KeyOperation.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/ie11-detection/build/MsSubtleCrypto.js":
/*!*********************************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/ie11-detection/build/MsSubtleCrypto.js ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=MsSubtleCrypto.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/ie11-detection/build/MsWindow.js":
/*!***************************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/ie11-detection/build/MsWindow.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isMsWindow = void 0;
var msSubtleCryptoMethods = [
    "decrypt",
    "digest",
    "encrypt",
    "exportKey",
    "generateKey",
    "importKey",
    "sign",
    "verify"
];
function quacksLikeAnMsWindow(window) {
    return "MSInputMethodContext" in window && "msCrypto" in window;
}
/**
 * Determines if the provided window is (or is like) the window object one would
 * expect to encounter in Internet Explorer 11.
 */
function isMsWindow(window) {
    if (quacksLikeAnMsWindow(window) && window.msCrypto.subtle !== undefined) {
        var _a = window.msCrypto, getRandomValues = _a.getRandomValues, subtle_1 = _a.subtle;
        return msSubtleCryptoMethods
            .map(function (methodName) { return subtle_1[methodName]; })
            .concat(getRandomValues)
            .every(function (method) { return typeof method === "function"; });
    }
    return false;
}
exports.isMsWindow = isMsWindow;
//# sourceMappingURL=MsWindow.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/ie11-detection/build/index.js":
/*!************************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/ie11-detection/build/index.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/tslib/tslib.es6.js");
tslib_1.__exportStar(__webpack_require__(/*! ./CryptoOperation */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/ie11-detection/build/CryptoOperation.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Key */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/ie11-detection/build/Key.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./KeyOperation */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/ie11-detection/build/KeyOperation.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./MsSubtleCrypto */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/ie11-detection/build/MsSubtleCrypto.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./MsWindow */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/ie11-detection/build/MsWindow.js"), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/sha256-js/build/RawSha256.js":
/*!***********************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/sha256-js/build/RawSha256.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RawSha256 = void 0;
var constants_1 = __webpack_require__(/*! ./constants */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/sha256-js/build/constants.js");
/**
 * @internal
 */
var RawSha256 = /** @class */ (function () {
    function RawSha256() {
        this.state = Int32Array.from(constants_1.INIT);
        this.temp = new Int32Array(64);
        this.buffer = new Uint8Array(64);
        this.bufferLength = 0;
        this.bytesHashed = 0;
        /**
         * @internal
         */
        this.finished = false;
    }
    RawSha256.prototype.update = function (data) {
        if (this.finished) {
            throw new Error("Attempted to update an already finished hash.");
        }
        var position = 0;
        var byteLength = data.byteLength;
        this.bytesHashed += byteLength;
        if (this.bytesHashed * 8 > constants_1.MAX_HASHABLE_LENGTH) {
            throw new Error("Cannot hash more than 2^53 - 1 bits");
        }
        while (byteLength > 0) {
            this.buffer[this.bufferLength++] = data[position++];
            byteLength--;
            if (this.bufferLength === constants_1.BLOCK_SIZE) {
                this.hashBuffer();
                this.bufferLength = 0;
            }
        }
    };
    RawSha256.prototype.digest = function () {
        if (!this.finished) {
            var bitsHashed = this.bytesHashed * 8;
            var bufferView = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
            var undecoratedLength = this.bufferLength;
            bufferView.setUint8(this.bufferLength++, 0x80);
            // Ensure the final block has enough room for the hashed length
            if (undecoratedLength % constants_1.BLOCK_SIZE >= constants_1.BLOCK_SIZE - 8) {
                for (var i = this.bufferLength; i < constants_1.BLOCK_SIZE; i++) {
                    bufferView.setUint8(i, 0);
                }
                this.hashBuffer();
                this.bufferLength = 0;
            }
            for (var i = this.bufferLength; i < constants_1.BLOCK_SIZE - 8; i++) {
                bufferView.setUint8(i, 0);
            }
            bufferView.setUint32(constants_1.BLOCK_SIZE - 8, Math.floor(bitsHashed / 0x100000000), true);
            bufferView.setUint32(constants_1.BLOCK_SIZE - 4, bitsHashed);
            this.hashBuffer();
            this.finished = true;
        }
        // The value in state is little-endian rather than big-endian, so flip
        // each word into a new Uint8Array
        var out = new Uint8Array(constants_1.DIGEST_LENGTH);
        for (var i = 0; i < 8; i++) {
            out[i * 4] = (this.state[i] >>> 24) & 0xff;
            out[i * 4 + 1] = (this.state[i] >>> 16) & 0xff;
            out[i * 4 + 2] = (this.state[i] >>> 8) & 0xff;
            out[i * 4 + 3] = (this.state[i] >>> 0) & 0xff;
        }
        return out;
    };
    RawSha256.prototype.hashBuffer = function () {
        var _a = this, buffer = _a.buffer, state = _a.state;
        var state0 = state[0], state1 = state[1], state2 = state[2], state3 = state[3], state4 = state[4], state5 = state[5], state6 = state[6], state7 = state[7];
        for (var i = 0; i < constants_1.BLOCK_SIZE; i++) {
            if (i < 16) {
                this.temp[i] =
                    ((buffer[i * 4] & 0xff) << 24) |
                        ((buffer[i * 4 + 1] & 0xff) << 16) |
                        ((buffer[i * 4 + 2] & 0xff) << 8) |
                        (buffer[i * 4 + 3] & 0xff);
            }
            else {
                var u = this.temp[i - 2];
                var t1_1 = ((u >>> 17) | (u << 15)) ^ ((u >>> 19) | (u << 13)) ^ (u >>> 10);
                u = this.temp[i - 15];
                var t2_1 = ((u >>> 7) | (u << 25)) ^ ((u >>> 18) | (u << 14)) ^ (u >>> 3);
                this.temp[i] =
                    ((t1_1 + this.temp[i - 7]) | 0) + ((t2_1 + this.temp[i - 16]) | 0);
            }
            var t1 = ((((((state4 >>> 6) | (state4 << 26)) ^
                ((state4 >>> 11) | (state4 << 21)) ^
                ((state4 >>> 25) | (state4 << 7))) +
                ((state4 & state5) ^ (~state4 & state6))) |
                0) +
                ((state7 + ((constants_1.KEY[i] + this.temp[i]) | 0)) | 0)) |
                0;
            var t2 = ((((state0 >>> 2) | (state0 << 30)) ^
                ((state0 >>> 13) | (state0 << 19)) ^
                ((state0 >>> 22) | (state0 << 10))) +
                ((state0 & state1) ^ (state0 & state2) ^ (state1 & state2))) |
                0;
            state7 = state6;
            state6 = state5;
            state5 = state4;
            state4 = (state3 + t1) | 0;
            state3 = state2;
            state2 = state1;
            state1 = state0;
            state0 = (t1 + t2) | 0;
        }
        state[0] += state0;
        state[1] += state1;
        state[2] += state2;
        state[3] += state3;
        state[4] += state4;
        state[5] += state5;
        state[6] += state6;
        state[7] += state7;
    };
    return RawSha256;
}());
exports.RawSha256 = RawSha256;
//# sourceMappingURL=RawSha256.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/sha256-js/build/constants.js":
/*!***********************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/sha256-js/build/constants.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MAX_HASHABLE_LENGTH = exports.INIT = exports.KEY = exports.DIGEST_LENGTH = exports.BLOCK_SIZE = void 0;
/**
 * @internal
 */
exports.BLOCK_SIZE = 64;
/**
 * @internal
 */
exports.DIGEST_LENGTH = 32;
/**
 * @internal
 */
exports.KEY = new Uint32Array([
    0x428a2f98,
    0x71374491,
    0xb5c0fbcf,
    0xe9b5dba5,
    0x3956c25b,
    0x59f111f1,
    0x923f82a4,
    0xab1c5ed5,
    0xd807aa98,
    0x12835b01,
    0x243185be,
    0x550c7dc3,
    0x72be5d74,
    0x80deb1fe,
    0x9bdc06a7,
    0xc19bf174,
    0xe49b69c1,
    0xefbe4786,
    0x0fc19dc6,
    0x240ca1cc,
    0x2de92c6f,
    0x4a7484aa,
    0x5cb0a9dc,
    0x76f988da,
    0x983e5152,
    0xa831c66d,
    0xb00327c8,
    0xbf597fc7,
    0xc6e00bf3,
    0xd5a79147,
    0x06ca6351,
    0x14292967,
    0x27b70a85,
    0x2e1b2138,
    0x4d2c6dfc,
    0x53380d13,
    0x650a7354,
    0x766a0abb,
    0x81c2c92e,
    0x92722c85,
    0xa2bfe8a1,
    0xa81a664b,
    0xc24b8b70,
    0xc76c51a3,
    0xd192e819,
    0xd6990624,
    0xf40e3585,
    0x106aa070,
    0x19a4c116,
    0x1e376c08,
    0x2748774c,
    0x34b0bcb5,
    0x391c0cb3,
    0x4ed8aa4a,
    0x5b9cca4f,
    0x682e6ff3,
    0x748f82ee,
    0x78a5636f,
    0x84c87814,
    0x8cc70208,
    0x90befffa,
    0xa4506ceb,
    0xbef9a3f7,
    0xc67178f2
]);
/**
 * @internal
 */
exports.INIT = [
    0x6a09e667,
    0xbb67ae85,
    0x3c6ef372,
    0xa54ff53a,
    0x510e527f,
    0x9b05688c,
    0x1f83d9ab,
    0x5be0cd19
];
/**
 * @internal
 */
exports.MAX_HASHABLE_LENGTH = Math.pow(2, 53) - 1;
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/sha256-js/build/index.js":
/*!*******************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/sha256-js/build/index.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/tslib/tslib.es6.js");
tslib_1.__exportStar(__webpack_require__(/*! ./jsSha256 */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/sha256-js/build/jsSha256.js"), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/sha256-js/build/jsSha256.js":
/*!**********************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/sha256-js/build/jsSha256.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sha256 = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/tslib/tslib.es6.js");
var constants_1 = __webpack_require__(/*! ./constants */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/sha256-js/build/constants.js");
var RawSha256_1 = __webpack_require__(/*! ./RawSha256 */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/sha256-js/build/RawSha256.js");
var util_1 = __webpack_require__(/*! @aws-crypto/util */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/util/build/index.js");
var Sha256 = /** @class */ (function () {
    function Sha256(secret) {
        this.secret = secret;
        this.hash = new RawSha256_1.RawSha256();
        this.reset();
    }
    Sha256.prototype.update = function (toHash) {
        if ((0, util_1.isEmptyData)(toHash) || this.error) {
            return;
        }
        try {
            this.hash.update((0, util_1.convertToBuffer)(toHash));
        }
        catch (e) {
            this.error = e;
        }
    };
    /* This synchronous method keeps compatibility
     * with the v2 aws-sdk.
     */
    Sha256.prototype.digestSync = function () {
        if (this.error) {
            throw this.error;
        }
        if (this.outer) {
            if (!this.outer.finished) {
                this.outer.update(this.hash.digest());
            }
            return this.outer.digest();
        }
        return this.hash.digest();
    };
    /* The underlying digest method here is synchronous.
     * To keep the same interface with the other hash functions
     * the default is to expose this as an async method.
     * However, it can sometimes be useful to have a sync method.
     */
    Sha256.prototype.digest = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.digestSync()];
            });
        });
    };
    Sha256.prototype.reset = function () {
        this.hash = new RawSha256_1.RawSha256();
        if (this.secret) {
            this.outer = new RawSha256_1.RawSha256();
            var inner = bufferFromSecret(this.secret);
            var outer = new Uint8Array(constants_1.BLOCK_SIZE);
            outer.set(inner);
            for (var i = 0; i < constants_1.BLOCK_SIZE; i++) {
                inner[i] ^= 0x36;
                outer[i] ^= 0x5c;
            }
            this.hash.update(inner);
            this.outer.update(outer);
            // overwrite the copied key in memory
            for (var i = 0; i < inner.byteLength; i++) {
                inner[i] = 0;
            }
        }
    };
    return Sha256;
}());
exports.Sha256 = Sha256;
function bufferFromSecret(secret) {
    var input = (0, util_1.convertToBuffer)(secret);
    if (input.byteLength > constants_1.BLOCK_SIZE) {
        var bufferHash = new RawSha256_1.RawSha256();
        bufferHash.update(input);
        input = bufferHash.digest();
    }
    var buffer = new Uint8Array(constants_1.BLOCK_SIZE);
    buffer.set(input);
    return buffer;
}
//# sourceMappingURL=jsSha256.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/supports-web-crypto/build/index.js":
/*!*****************************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/supports-web-crypto/build/index.js ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/tslib/tslib.es6.js");
tslib_1.__exportStar(__webpack_require__(/*! ./supportsWebCrypto */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/supports-web-crypto/build/supportsWebCrypto.js"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsOERBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSBcIi4vc3VwcG9ydHNXZWJDcnlwdG9cIjtcbiJdfQ==

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/supports-web-crypto/build/supportsWebCrypto.js":
/*!*****************************************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/supports-web-crypto/build/supportsWebCrypto.js ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.supportsZeroByteGCM = exports.supportsSubtleCrypto = exports.supportsSecureRandom = exports.supportsWebCrypto = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/tslib/tslib.es6.js");
var subtleCryptoMethods = [
    "decrypt",
    "digest",
    "encrypt",
    "exportKey",
    "generateKey",
    "importKey",
    "sign",
    "verify"
];
function supportsWebCrypto(window) {
    if (supportsSecureRandom(window) &&
        typeof window.crypto.subtle === "object") {
        var subtle = window.crypto.subtle;
        return supportsSubtleCrypto(subtle);
    }
    return false;
}
exports.supportsWebCrypto = supportsWebCrypto;
function supportsSecureRandom(window) {
    if (typeof window === "object" && typeof window.crypto === "object") {
        var getRandomValues = window.crypto.getRandomValues;
        return typeof getRandomValues === "function";
    }
    return false;
}
exports.supportsSecureRandom = supportsSecureRandom;
function supportsSubtleCrypto(subtle) {
    return (subtle &&
        subtleCryptoMethods.every(function (methodName) { return typeof subtle[methodName] === "function"; }));
}
exports.supportsSubtleCrypto = supportsSubtleCrypto;
function supportsZeroByteGCM(subtle) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var key, zeroByteAuthTag, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!supportsSubtleCrypto(subtle))
                        return [2 /*return*/, false];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, subtle.generateKey({ name: "AES-GCM", length: 128 }, false, ["encrypt"])];
                case 2:
                    key = _b.sent();
                    return [4 /*yield*/, subtle.encrypt({
                            name: "AES-GCM",
                            iv: new Uint8Array(Array(12)),
                            additionalData: new Uint8Array(Array(16)),
                            tagLength: 128
                        }, key, new Uint8Array(0))];
                case 3:
                    zeroByteAuthTag = _b.sent();
                    return [2 /*return*/, zeroByteAuthTag.byteLength === 16];
                case 4:
                    _a = _b.sent();
                    return [2 /*return*/, false];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.supportsZeroByteGCM = supportsZeroByteGCM;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VwcG9ydHNXZWJDcnlwdG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc3VwcG9ydHNXZWJDcnlwdG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQVVBLElBQU0sbUJBQW1CLEdBQThCO0lBQ3JELFNBQVM7SUFDVCxRQUFRO0lBQ1IsU0FBUztJQUNULFdBQVc7SUFDWCxhQUFhO0lBQ2IsV0FBVztJQUNYLE1BQU07SUFDTixRQUFRO0NBQ1QsQ0FBQztBQUVGLFNBQWdCLGlCQUFpQixDQUFDLE1BQWM7SUFDOUMsSUFDRSxvQkFBb0IsQ0FBQyxNQUFNLENBQUM7UUFDNUIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQ3hDO1FBQ1EsSUFBQSxNQUFNLEdBQUssTUFBTSxDQUFDLE1BQU0sT0FBbEIsQ0FBbUI7UUFFakMsT0FBTyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNyQztJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQVhELDhDQVdDO0FBRUQsU0FBZ0Isb0JBQW9CLENBQUMsTUFBYztJQUNqRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxPQUFPLE1BQU0sQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO1FBQzNELElBQUEsZUFBZSxHQUFLLE1BQU0sQ0FBQyxNQUFNLGdCQUFsQixDQUFtQjtRQUUxQyxPQUFPLE9BQU8sZUFBZSxLQUFLLFVBQVUsQ0FBQztLQUM5QztJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQVJELG9EQVFDO0FBRUQsU0FBZ0Isb0JBQW9CLENBQUMsTUFBb0I7SUFDdkQsT0FBTyxDQUNMLE1BQU07UUFDTixtQkFBbUIsQ0FBQyxLQUFLLENBQ3ZCLFVBQUEsVUFBVSxJQUFJLE9BQUEsT0FBTyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssVUFBVSxFQUF4QyxDQUF3QyxDQUN2RCxDQUNGLENBQUM7QUFDSixDQUFDO0FBUEQsb0RBT0M7QUFFRCxTQUFzQixtQkFBbUIsQ0FBQyxNQUFvQjs7Ozs7O29CQUM1RCxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDO3dCQUFFLHNCQUFPLEtBQUssRUFBQzs7OztvQkFFbEMscUJBQU0sTUFBTSxDQUFDLFdBQVcsQ0FDbEMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFDaEMsS0FBSyxFQUNMLENBQUMsU0FBUyxDQUFDLENBQ1osRUFBQTs7b0JBSkssR0FBRyxHQUFHLFNBSVg7b0JBQ3VCLHFCQUFNLE1BQU0sQ0FBQyxPQUFPLENBQzFDOzRCQUNFLElBQUksRUFBRSxTQUFTOzRCQUNmLEVBQUUsRUFBRSxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7NEJBQzdCLGNBQWMsRUFBRSxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7NEJBQ3pDLFNBQVMsRUFBRSxHQUFHO3lCQUNmLEVBQ0QsR0FBRyxFQUNILElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUNsQixFQUFBOztvQkFUSyxlQUFlLEdBQUcsU0FTdkI7b0JBQ0Qsc0JBQU8sZUFBZSxDQUFDLFVBQVUsS0FBSyxFQUFFLEVBQUM7OztvQkFFekMsc0JBQU8sS0FBSyxFQUFDOzs7OztDQUVoQjtBQXRCRCxrREFzQkMiLCJzb3VyY2VzQ29udGVudCI6WyJ0eXBlIFN1YnRsZUNyeXB0b01ldGhvZCA9XG4gIHwgXCJkZWNyeXB0XCJcbiAgfCBcImRpZ2VzdFwiXG4gIHwgXCJlbmNyeXB0XCJcbiAgfCBcImV4cG9ydEtleVwiXG4gIHwgXCJnZW5lcmF0ZUtleVwiXG4gIHwgXCJpbXBvcnRLZXlcIlxuICB8IFwic2lnblwiXG4gIHwgXCJ2ZXJpZnlcIjtcblxuY29uc3Qgc3VidGxlQ3J5cHRvTWV0aG9kczogQXJyYXk8U3VidGxlQ3J5cHRvTWV0aG9kPiA9IFtcbiAgXCJkZWNyeXB0XCIsXG4gIFwiZGlnZXN0XCIsXG4gIFwiZW5jcnlwdFwiLFxuICBcImV4cG9ydEtleVwiLFxuICBcImdlbmVyYXRlS2V5XCIsXG4gIFwiaW1wb3J0S2V5XCIsXG4gIFwic2lnblwiLFxuICBcInZlcmlmeVwiXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gc3VwcG9ydHNXZWJDcnlwdG8od2luZG93OiBXaW5kb3cpOiBib29sZWFuIHtcbiAgaWYgKFxuICAgIHN1cHBvcnRzU2VjdXJlUmFuZG9tKHdpbmRvdykgJiZcbiAgICB0eXBlb2Ygd2luZG93LmNyeXB0by5zdWJ0bGUgPT09IFwib2JqZWN0XCJcbiAgKSB7XG4gICAgY29uc3QgeyBzdWJ0bGUgfSA9IHdpbmRvdy5jcnlwdG87XG5cbiAgICByZXR1cm4gc3VwcG9ydHNTdWJ0bGVDcnlwdG8oc3VidGxlKTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1cHBvcnRzU2VjdXJlUmFuZG9tKHdpbmRvdzogV2luZG93KTogYm9vbGVhbiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB3aW5kb3cuY3J5cHRvID09PSBcIm9iamVjdFwiKSB7XG4gICAgY29uc3QgeyBnZXRSYW5kb21WYWx1ZXMgfSA9IHdpbmRvdy5jcnlwdG87XG5cbiAgICByZXR1cm4gdHlwZW9mIGdldFJhbmRvbVZhbHVlcyA9PT0gXCJmdW5jdGlvblwiO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3VwcG9ydHNTdWJ0bGVDcnlwdG8oc3VidGxlOiBTdWJ0bGVDcnlwdG8pIHtcbiAgcmV0dXJuIChcbiAgICBzdWJ0bGUgJiZcbiAgICBzdWJ0bGVDcnlwdG9NZXRob2RzLmV2ZXJ5KFxuICAgICAgbWV0aG9kTmFtZSA9PiB0eXBlb2Ygc3VidGxlW21ldGhvZE5hbWVdID09PSBcImZ1bmN0aW9uXCJcbiAgICApXG4gICk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdXBwb3J0c1plcm9CeXRlR0NNKHN1YnRsZTogU3VidGxlQ3J5cHRvKSB7XG4gIGlmICghc3VwcG9ydHNTdWJ0bGVDcnlwdG8oc3VidGxlKSkgcmV0dXJuIGZhbHNlO1xuICB0cnkge1xuICAgIGNvbnN0IGtleSA9IGF3YWl0IHN1YnRsZS5nZW5lcmF0ZUtleShcbiAgICAgIHsgbmFtZTogXCJBRVMtR0NNXCIsIGxlbmd0aDogMTI4IH0sXG4gICAgICBmYWxzZSxcbiAgICAgIFtcImVuY3J5cHRcIl1cbiAgICApO1xuICAgIGNvbnN0IHplcm9CeXRlQXV0aFRhZyA9IGF3YWl0IHN1YnRsZS5lbmNyeXB0KFxuICAgICAge1xuICAgICAgICBuYW1lOiBcIkFFUy1HQ01cIixcbiAgICAgICAgaXY6IG5ldyBVaW50OEFycmF5KEFycmF5KDEyKSksXG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiBuZXcgVWludDhBcnJheShBcnJheSgxNikpLFxuICAgICAgICB0YWdMZW5ndGg6IDEyOFxuICAgICAgfSxcbiAgICAgIGtleSxcbiAgICAgIG5ldyBVaW50OEFycmF5KDApXG4gICAgKTtcbiAgICByZXR1cm4gemVyb0J5dGVBdXRoVGFnLmJ5dGVMZW5ndGggPT09IDE2O1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/util/build/convertToBuffer.js":
/*!************************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/util/build/convertToBuffer.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertToBuffer = void 0;
var util_utf8_browser_1 = __webpack_require__(/*! @aws-sdk/util-utf8-browser */ "../../node_modules/@aws-sdk/util-utf8-browser/dist-es/index.js");
// Quick polyfill
var fromUtf8 = typeof Buffer !== "undefined" && Buffer.from
    ? function (input) { return Buffer.from(input, "utf8"); }
    : util_utf8_browser_1.fromUtf8;
function convertToBuffer(data) {
    // Already a Uint8, do nothing
    if (data instanceof Uint8Array)
        return data;
    if (typeof data === "string") {
        return fromUtf8(data);
    }
    if (ArrayBuffer.isView(data)) {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    }
    return new Uint8Array(data);
}
exports.convertToBuffer = convertToBuffer;
//# sourceMappingURL=convertToBuffer.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/util/build/index.js":
/*!**************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/util/build/index.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uint32ArrayFrom = exports.numToUint8 = exports.isEmptyData = exports.convertToBuffer = void 0;
var convertToBuffer_1 = __webpack_require__(/*! ./convertToBuffer */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/util/build/convertToBuffer.js");
Object.defineProperty(exports, "convertToBuffer", ({ enumerable: true, get: function () { return convertToBuffer_1.convertToBuffer; } }));
var isEmptyData_1 = __webpack_require__(/*! ./isEmptyData */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/util/build/isEmptyData.js");
Object.defineProperty(exports, "isEmptyData", ({ enumerable: true, get: function () { return isEmptyData_1.isEmptyData; } }));
var numToUint8_1 = __webpack_require__(/*! ./numToUint8 */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/util/build/numToUint8.js");
Object.defineProperty(exports, "numToUint8", ({ enumerable: true, get: function () { return numToUint8_1.numToUint8; } }));
var uint32ArrayFrom_1 = __webpack_require__(/*! ./uint32ArrayFrom */ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/util/build/uint32ArrayFrom.js");
Object.defineProperty(exports, "uint32ArrayFrom", ({ enumerable: true, get: function () { return uint32ArrayFrom_1.uint32ArrayFrom; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/util/build/isEmptyData.js":
/*!********************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/util/build/isEmptyData.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isEmptyData = void 0;
function isEmptyData(data) {
    if (typeof data === "string") {
        return data.length === 0;
    }
    return data.byteLength === 0;
}
exports.isEmptyData = isEmptyData;
//# sourceMappingURL=isEmptyData.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/util/build/numToUint8.js":
/*!*******************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/util/build/numToUint8.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.numToUint8 = void 0;
function numToUint8(num) {
    return new Uint8Array([
        (num & 0xff000000) >> 24,
        (num & 0x00ff0000) >> 16,
        (num & 0x0000ff00) >> 8,
        num & 0x000000ff,
    ]);
}
exports.numToUint8 = numToUint8;
//# sourceMappingURL=numToUint8.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/util/build/uint32ArrayFrom.js":
/*!************************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/node_modules/@aws-crypto/util/build/uint32ArrayFrom.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uint32ArrayFrom = void 0;
// IE 11 does not support Array.from, so we do it manually
function uint32ArrayFrom(a_lookUpTable) {
    if (!Uint32Array.from) {
        var return_array = new Uint32Array(a_lookUpTable.length);
        var a_index = 0;
        while (a_index < a_lookUpTable.length) {
            return_array[a_index] = a_lookUpTable[a_index];
            a_index += 1;
        }
        return return_array;
    }
    return Uint32Array.from(a_lookUpTable);
}
exports.uint32ArrayFrom = uint32ArrayFrom;
//# sourceMappingURL=uint32ArrayFrom.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/node_modules/tslib/tslib.es6.js":
/*!*************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/node_modules/tslib/tslib.es6.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "../../node_modules/@aws-sdk/util-locate-window/dist-es/index.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@aws-sdk/util-locate-window/dist-es/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   locateWindow: () => (/* binding */ locateWindow)
/* harmony export */ });
const fallbackWindow = {};
function locateWindow() {
    if (typeof window !== "undefined") {
        return window;
    }
    else if (typeof self !== "undefined") {
        return self;
    }
    return fallbackWindow;
}


/***/ }),

/***/ "../../node_modules/@aws-sdk/util-utf8-browser/dist-es/index.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@aws-sdk/util-utf8-browser/dist-es/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromUtf8: () => (/* binding */ fromUtf8),
/* harmony export */   toUtf8: () => (/* binding */ toUtf8)
/* harmony export */ });
/* harmony import */ var _pureJs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pureJs */ "../../node_modules/@aws-sdk/util-utf8-browser/dist-es/pureJs.js");
/* harmony import */ var _whatwgEncodingApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./whatwgEncodingApi */ "../../node_modules/@aws-sdk/util-utf8-browser/dist-es/whatwgEncodingApi.js");


const fromUtf8 = (input) => typeof TextEncoder === "function" ? (0,_whatwgEncodingApi__WEBPACK_IMPORTED_MODULE_1__.fromUtf8)(input) : (0,_pureJs__WEBPACK_IMPORTED_MODULE_0__.fromUtf8)(input);
const toUtf8 = (input) => typeof TextDecoder === "function" ? (0,_whatwgEncodingApi__WEBPACK_IMPORTED_MODULE_1__.toUtf8)(input) : (0,_pureJs__WEBPACK_IMPORTED_MODULE_0__.toUtf8)(input);


/***/ }),

/***/ "../../node_modules/@aws-sdk/util-utf8-browser/dist-es/pureJs.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@aws-sdk/util-utf8-browser/dist-es/pureJs.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromUtf8: () => (/* binding */ fromUtf8),
/* harmony export */   toUtf8: () => (/* binding */ toUtf8)
/* harmony export */ });
const fromUtf8 = (input) => {
    const bytes = [];
    for (let i = 0, len = input.length; i < len; i++) {
        const value = input.charCodeAt(i);
        if (value < 0x80) {
            bytes.push(value);
        }
        else if (value < 0x800) {
            bytes.push((value >> 6) | 0b11000000, (value & 0b111111) | 0b10000000);
        }
        else if (i + 1 < input.length && (value & 0xfc00) === 0xd800 && (input.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
            const surrogatePair = 0x10000 + ((value & 0b1111111111) << 10) + (input.charCodeAt(++i) & 0b1111111111);
            bytes.push((surrogatePair >> 18) | 0b11110000, ((surrogatePair >> 12) & 0b111111) | 0b10000000, ((surrogatePair >> 6) & 0b111111) | 0b10000000, (surrogatePair & 0b111111) | 0b10000000);
        }
        else {
            bytes.push((value >> 12) | 0b11100000, ((value >> 6) & 0b111111) | 0b10000000, (value & 0b111111) | 0b10000000);
        }
    }
    return Uint8Array.from(bytes);
};
const toUtf8 = (input) => {
    let decoded = "";
    for (let i = 0, len = input.length; i < len; i++) {
        const byte = input[i];
        if (byte < 0x80) {
            decoded += String.fromCharCode(byte);
        }
        else if (0b11000000 <= byte && byte < 0b11100000) {
            const nextByte = input[++i];
            decoded += String.fromCharCode(((byte & 0b11111) << 6) | (nextByte & 0b111111));
        }
        else if (0b11110000 <= byte && byte < 0b101101101) {
            const surrogatePair = [byte, input[++i], input[++i], input[++i]];
            const encoded = "%" + surrogatePair.map((byteValue) => byteValue.toString(16)).join("%");
            decoded += decodeURIComponent(encoded);
        }
        else {
            decoded += String.fromCharCode(((byte & 0b1111) << 12) | ((input[++i] & 0b111111) << 6) | (input[++i] & 0b111111));
        }
    }
    return decoded;
};


/***/ }),

/***/ "../../node_modules/@aws-sdk/util-utf8-browser/dist-es/whatwgEncodingApi.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/util-utf8-browser/dist-es/whatwgEncodingApi.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromUtf8: () => (/* binding */ fromUtf8),
/* harmony export */   toUtf8: () => (/* binding */ toUtf8)
/* harmony export */ });
function fromUtf8(input) {
    return new TextEncoder().encode(input);
}
function toUtf8(input) {
    return new TextDecoder("utf-8").decode(input);
}


/***/ }),

/***/ "./lib-esm/ClickstreamAnalytics.js":
/*!*****************************************!*\
  !*** ./lib-esm/ClickstreamAnalytics.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClickstreamAnalytics: () => (/* binding */ ClickstreamAnalytics)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-amplify/core */ "../../node_modules/@aws-amplify/core/lib-esm/Logger/ConsoleLogger.js");
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./provider */ "./lib-esm/provider/index.js");


/**
 * ClickstreamAnalytics provides a static interface for tracking
 * and managing analytics events and user attributes.
 *
 * @remarks
 * This class serves as the main entry point for the Clickstream
 * analytics SDK, offering methods to initialize, configure,
 * and send analytics data.
 *
 * @example
 * ```typescript
 * // Initialize the SDK
 * ClickstreamAnalytics.init({
 *   appId: 'your-app-id',
 *   endpoint: 'your-analytics-endpoint'
 * });
 *
 * // Record an event
 * ClickstreamAnalytics.record({
 *   eventName: 'button_click',
 *   attributes: {
 *     button_id: 'submit_button'
 *   }
 * });
 *
 * // Set user ID
 * ClickstreamAnalytics.setUserId('user123');
 * ```
 */
var ClickstreamAnalytics = /** @class */function () {
  function ClickstreamAnalytics() {}
  /**
   * Initializes the Clickstream SDK with the provided configuration
   *
   * @param configure - Configuration object for the Clickstream SDK
   * @returns Boolean indicating whether initialization was successful
   *
   * @throws {Error} If SDK is already initialized
   *
   * @remarks
   * This method can only be called once. Subsequent calls will
   * return false and log a warning.
   */
  ClickstreamAnalytics.init = function (configure) {
    if (this.provider !== undefined) {
      this.logger.warn('Clickstream SDK has initialized');
      return false;
    }
    this.provider = new _provider__WEBPACK_IMPORTED_MODULE_0__.ClickstreamProvider();
    this.provider.configure(configure);
    return true;
  };
  /**
   * Records a custom event to be sent to the analytics service
   *
   * @param event - The event to be recorded
   *
   * @remarks
   * This method should be called after SDK initialization
   */
  ClickstreamAnalytics.record = function (event) {
    this.provider.record(event);
  };
  /**
   * Sets the user ID for tracking user-specific events
   *
   * @param userId - Unique identifier for the user, or null to clear
   *
   * @remarks
   * Useful for associating events with a specific user across sessions
   */
  ClickstreamAnalytics.setUserId = function (userId) {
    this.provider.setUserId(userId);
  };
  /**
   * Updates user attributes for the current user
   *
   * @param attributes - Key-value pairs of user attributes
   *
   * @remarks
   * Allows setting or updating user-specific metadata
   */
  ClickstreamAnalytics.setUserAttributes = function (attributes) {
    this.provider.setUserAttributes(attributes);
  };
  /**
   * Updates the SDK configuration after initial initialization
   *
   * @param configure - Configuration object to update
   *
   * @remarks
   * Allows dynamic reconfiguration of the SDK settings
   */
  ClickstreamAnalytics.updateConfigure = function (configure) {
    this.provider.updateConfigure(configure);
  };
  /**
   * Sets global attributes that will be included with every event
   *
   * @param attributes - Key-value pairs of global attributes
   *
   * @remarks
   * These attributes will be automatically added to all subsequent events
   */
  ClickstreamAnalytics.setGlobalAttributes = function (attributes) {
    this.provider.setGlobalAttributes(attributes);
  };
  /**
   * Logger instance for SDK logging
   * @private
   */
  ClickstreamAnalytics.logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.ConsoleLogger('ClickstreamAnalytics');
  return ClickstreamAnalytics;
}();


/***/ }),

/***/ "./lib-esm/browser/BrowserInfo.js":
/*!****************************************!*\
  !*** ./lib-esm/browser/BrowserInfo.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BrowserInfo: () => (/* binding */ BrowserInfo)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-amplify/core */ "../../node_modules/@aws-amplify/core/lib-esm/Logger/ConsoleLogger.js");
/* harmony import */ var _util_StorageUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/StorageUtil */ "./lib-esm/util/StorageUtil.js");


var logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.ConsoleLogger('BrowserInfo');
var BrowserInfo = /** @class */function () {
  function BrowserInfo() {
    if (!BrowserInfo.isBrowser()) return;
    var _a = window.navigator,
      product = _a.product,
      vendor = _a.vendor,
      userAgent = _a.userAgent,
      language = _a.language;
    this.locale = language;
    this.initLocalInfo(language);
    this.make = product || vendor;
    this.userAgent = userAgent;
    this.zoneOffset = -new Date().getTimezoneOffset() * 60000;
    this.hostName = window.location.hostname;
    this.latestReferrer = window.document.referrer;
    if (this.latestReferrer && this.latestReferrer !== '') {
      try {
        var url = new URL(this.latestReferrer);
        this.latestReferrerHost = url.host;
      } catch (error) {
        logger.warn('parse latest referrer domain failed: ' + error);
      }
    }
  }
  BrowserInfo.prototype.initLocalInfo = function (locale) {
    if (locale.indexOf('-') > 0) {
      this.system_language = locale.split('-')[0];
      this.country_code = locale.split('-')[1].toUpperCase();
    } else {
      this.system_language = locale;
      this.country_code = '';
    }
  };
  BrowserInfo.isBrowser = function () {
    return typeof window !== 'undefined' && typeof window.document !== 'undefined';
  };
  BrowserInfo.isFirefox = function () {
    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  };
  BrowserInfo.isNetworkOnLine = function () {
    return navigator.onLine;
  };
  BrowserInfo.getCurrentPageUrl = function () {
    if (!BrowserInfo.isBrowser()) return '';else return window.location.href;
  };
  BrowserInfo.getCurrentPageTitle = function () {
    var _a;
    if (!BrowserInfo.isBrowser()) return '';
    return (_a = window.document.title) !== null && _a !== void 0 ? _a : '';
  };
  BrowserInfo.isFromReload = function () {
    if (performance && performance.getEntriesByType) {
      var performanceEntries = performance.getEntriesByType('navigation');
      if (performanceEntries && performanceEntries.length > 0) {
        var type = performanceEntries[0]['type'];
        return type === 'reload' && _util_StorageUtil__WEBPACK_IMPORTED_MODULE_0__.StorageUtil.getPreviousPageUrl() !== '';
      }
    } else {
      logger.warn('unsupported web environment for performance');
    }
    return false;
  };
  return BrowserInfo;
}();


/***/ }),

/***/ "./lib-esm/browser/index.js":
/*!**********************************!*\
  !*** ./lib-esm/browser/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BrowserInfo: () => (/* reexport safe */ _BrowserInfo__WEBPACK_IMPORTED_MODULE_0__.BrowserInfo)
/* harmony export */ });
/* harmony import */ var _BrowserInfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BrowserInfo */ "./lib-esm/browser/BrowserInfo.js");


/***/ }),

/***/ "./lib-esm/config.js":
/*!***************************!*\
  !*** ./lib-esm/config.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  sdkVersion: '1.2.4-rc.1'
});

/***/ }),

/***/ "./lib-esm/network/NetRequest.js":
/*!***************************************!*\
  !*** ./lib-esm/network/NetRequest.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NetRequest: () => (/* binding */ NetRequest)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-amplify/core */ "../../node_modules/@aws-amplify/core/lib-esm/Logger/ConsoleLogger.js");
/* harmony import */ var _util_HashUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/HashUtil */ "./lib-esm/util/HashUtil.js");



var logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.ConsoleLogger('NetRequest');
var NetRequest = /** @class */function () {
  function NetRequest() {}
  NetRequest.sendRequest = function (eventsJson, context, bundleSequenceId, retryTimes, timeout) {
    if (retryTimes === void 0) {
      retryTimes = NetRequest.REQUEST_RETRY_TIMES;
    }
    if (timeout === void 0) {
      timeout = NetRequest.REQUEST_TIMEOUT;
    }
    return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function () {
      var configuration, browserInfo, eventsHash, queryParams, url, controller, timeoutId, inputSizeInBytes, isKeepAlive, requestOptions, retries, response, error_1;
      return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            configuration = context.configuration, browserInfo = context.browserInfo;
            return [4 /*yield*/, _util_HashUtil__WEBPACK_IMPORTED_MODULE_0__.HashUtil.getHashCode(eventsJson)];
          case 1:
            eventsHash = _a.sent();
            queryParams = new URLSearchParams({
              platform: 'Web',
              appId: configuration.appId,
              event_bundle_sequence_id: bundleSequenceId.toString(),
              upload_timestamp: new Date().getTime().toString(),
              hashCode: eventsHash
            });
            url = "".concat(configuration.endpoint, "?").concat(queryParams.toString());
            controller = new AbortController();
            timeoutId = setTimeout(function () {
              controller.abort();
            }, timeout);
            inputSizeInBytes = new Blob([eventsJson]).size;
            isKeepAlive = inputSizeInBytes < NetRequest.KEEP_ALIVE_SIZE_LIMIT;
            requestOptions = {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
                cookie: configuration.authCookie,
                'User-Agent': browserInfo.userAgent
              },
              // credentials: 'include',
              // Enables cross-origin requests with wildcard (*) CORS configuration
              // Allows API Gateway to accept requests from any origin while supporting authentication
              body: eventsJson,
              keepalive: isKeepAlive
            };
            requestOptions.signal = controller.signal;
            retries = 0;
            _a.label = 2;
          case 2:
            if (!(retries < retryTimes)) return [3 /*break*/, 8];
            _a.label = 3;
          case 3:
            _a.trys.push([3, 5, 6, 7]);
            return [4 /*yield*/, fetch(url, requestOptions)];
          case 4:
            response = _a.sent();
            if (response.ok && response.status === 200) {
              return [2 /*return*/, true];
            } else {
              logger.error("Request failed with status code ".concat(response.status));
            }
            return [3 /*break*/, 7];
          case 5:
            error_1 = _a.sent();
            logger.error("Error during request: ".concat(error_1));
            return [3 /*break*/, 7];
          case 6:
            clearTimeout(timeoutId);
            retries++;
            return [7 /*endfinally*/];
          case 7:
            return [3 /*break*/, 2];
          case 8:
            logger.error("Request failed after ".concat(retryTimes, " retries"));
            return [2 /*return*/, false];
        }
      });
    });
  };
  NetRequest.REQUEST_TIMEOUT = 10000;
  NetRequest.BATCH_REQUEST_TIMEOUT = 15000;
  NetRequest.REQUEST_RETRY_TIMES = 3;
  NetRequest.BATCH_REQUEST_RETRY_TIMES = 1;
  NetRequest.KEEP_ALIVE_SIZE_LIMIT = 64 * 1024;
  return NetRequest;
}();


/***/ }),

/***/ "./lib-esm/provider/AnalyticsEventBuilder.js":
/*!***************************************************!*\
  !*** ./lib-esm/provider/AnalyticsEventBuilder.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnalyticsEventBuilder: () => (/* binding */ AnalyticsEventBuilder)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ "../../node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Event */ "./lib-esm/provider/Event.js");
/* harmony import */ var _EventChecker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventChecker */ "./lib-esm/provider/EventChecker.js");
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../browser */ "./lib-esm/browser/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config */ "./lib-esm/config.js");
/* harmony import */ var _util_StorageUtil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/StorageUtil */ "./lib-esm/util/StorageUtil.js");







var sdkVersion = _config__WEBPACK_IMPORTED_MODULE_3__["default"].sdkVersion;
var AnalyticsEventBuilder = /** @class */function () {
  function AnalyticsEventBuilder() {}
  AnalyticsEventBuilder.createEvent = function (context, event, userAttributes, globalAttributes, session) {
    if (globalAttributes === void 0) {
      globalAttributes = {};
    }
    var browserInfo = context.browserInfo,
      configuration = context.configuration;
    var attributes = this.getEventAttributesWithCheck(event.attributes, globalAttributes);
    if (session !== undefined) {
      attributes[_Event__WEBPACK_IMPORTED_MODULE_0__.Event.ReservedAttribute.SESSION_ID] = session.sessionId;
      attributes[_Event__WEBPACK_IMPORTED_MODULE_0__.Event.ReservedAttribute.SESSION_START_TIMESTAMP] = session.startTime;
      attributes[_Event__WEBPACK_IMPORTED_MODULE_0__.Event.ReservedAttribute.SESSION_DURATION] = session.getDuration();
      attributes[_Event__WEBPACK_IMPORTED_MODULE_0__.Event.ReservedAttribute.SESSION_NUMBER] = session.sessionIndex;
    }
    attributes[_Event__WEBPACK_IMPORTED_MODULE_0__.Event.ReservedAttribute.PAGE_TITLE] = _browser__WEBPACK_IMPORTED_MODULE_2__.BrowserInfo.getCurrentPageTitle();
    attributes[_Event__WEBPACK_IMPORTED_MODULE_0__.Event.ReservedAttribute.PAGE_URL] = _browser__WEBPACK_IMPORTED_MODULE_2__.BrowserInfo.getCurrentPageUrl();
    attributes[_Event__WEBPACK_IMPORTED_MODULE_0__.Event.ReservedAttribute.LATEST_REFERRER] = browserInfo.latestReferrer;
    attributes[_Event__WEBPACK_IMPORTED_MODULE_0__.Event.ReservedAttribute.LATEST_REFERRER_HOST] = browserInfo.latestReferrerHost;
    var items = this.getEventItemsWithCheck(event.items, attributes);
    return {
      event_type: event.name,
      event_id: (0,uuid__WEBPACK_IMPORTED_MODULE_5__["default"])(),
      device_id: _util_StorageUtil__WEBPACK_IMPORTED_MODULE_4__.StorageUtil.getDeviceId(),
      unique_id: context.userUniqueId,
      app_id: configuration.appId,
      timestamp: new Date().getTime(),
      host_name: browserInfo.hostName,
      locale: browserInfo.locale,
      system_language: browserInfo.system_language,
      country_code: browserInfo.country_code,
      zone_offset: browserInfo.zoneOffset,
      make: browserInfo.make,
      platform: 'Web',
      screen_height: window.screen.height,
      screen_width: window.screen.width,
      viewport_height: window.innerHeight,
      viewport_width: window.innerWidth,
      sdk_name: 'stack9-web-analytics-sdk',
      sdk_version: sdkVersion,
      items: items,
      user: userAttributes !== null && userAttributes !== void 0 ? userAttributes : {},
      attributes: attributes
    };
  };
  AnalyticsEventBuilder.getEventAttributesWithCheck = function (eventAttributes, globalAttributes) {
    if (globalAttributes === void 0) {
      globalAttributes = {};
    }
    var customAttributes = {};
    var checkAttributes = _EventChecker__WEBPACK_IMPORTED_MODULE_1__.EventChecker.checkAttributes;
    var globalAttributesLength = Object.keys(globalAttributes).length;
    for (var key in eventAttributes) {
      var value = eventAttributes[key];
      if (value !== null) {
        var currentNumber = Object.keys(customAttributes).length + globalAttributesLength;
        var result = checkAttributes(currentNumber, key, value);
        var _a = _Event__WEBPACK_IMPORTED_MODULE_0__.Event.ReservedAttribute,
          ERROR_CODE = _a.ERROR_CODE,
          ERROR_MESSAGE = _a.ERROR_MESSAGE;
        if (result.error_code > 0) {
          customAttributes[ERROR_CODE] = result.error_code;
          customAttributes[ERROR_MESSAGE] = result.error_message;
        } else {
          customAttributes[key] = value;
        }
      }
    }
    return Object.assign(customAttributes, globalAttributes);
  };
  AnalyticsEventBuilder.getEventItemsWithCheck = function (items, attributes) {
    var e_1, _a;
    var resultItems = undefined;
    if (items !== undefined) {
      resultItems = [];
      var checkItems = _EventChecker__WEBPACK_IMPORTED_MODULE_1__.EventChecker.checkItems;
      try {
        for (var items_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__values)(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
          var item = items_1_1.value;
          var result = checkItems(resultItems.length, item);
          var _b = _Event__WEBPACK_IMPORTED_MODULE_0__.Event.ReservedAttribute,
            ERROR_CODE = _b.ERROR_CODE,
            ERROR_MESSAGE = _b.ERROR_MESSAGE;
          if (result.error_code > 0) {
            attributes[ERROR_CODE] = result.error_code;
            attributes[ERROR_MESSAGE] = result.error_message;
          }
          if (result.error_code === _Event__WEBPACK_IMPORTED_MODULE_0__.Event.ErrorCode.NO_ERROR) {
            resultItems.push(item);
          }
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (items_1_1 && !items_1_1.done && (_a = items_1["return"])) _a.call(items_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }
    return resultItems;
  };
  return AnalyticsEventBuilder;
}();


/***/ }),

/***/ "./lib-esm/provider/ClickstreamContext.js":
/*!************************************************!*\
  !*** ./lib-esm/provider/ClickstreamContext.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClickstreamContext: () => (/* binding */ ClickstreamContext)
/* harmony export */ });
/* harmony import */ var _util_StorageUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/StorageUtil */ "./lib-esm/util/StorageUtil.js");

var ClickstreamContext = /** @class */function () {
  function ClickstreamContext(browserInfo, configuration) {
    this.browserInfo = browserInfo;
    this.configuration = configuration;
    this.userUniqueId = _util_StorageUtil__WEBPACK_IMPORTED_MODULE_0__.StorageUtil.getCurrentUserUniqueId();
  }
  return ClickstreamContext;
}();


/***/ }),

/***/ "./lib-esm/provider/ClickstreamProvider.js":
/*!*************************************************!*\
  !*** ./lib-esm/provider/ClickstreamProvider.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClickstreamProvider: () => (/* binding */ ClickstreamProvider)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @aws-amplify/core */ "../../node_modules/@aws-amplify/core/lib-esm/Logger/ConsoleLogger.js");
/* harmony import */ var _aws_amplify_core_lib_Logger__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @aws-amplify/core/lib/Logger */ "../../node_modules/@aws-amplify/core/lib/Logger/index.js");
/* harmony import */ var _AnalyticsEventBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnalyticsEventBuilder */ "./lib-esm/provider/AnalyticsEventBuilder.js");
/* harmony import */ var _ClickstreamContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ClickstreamContext */ "./lib-esm/provider/ClickstreamContext.js");
/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Event */ "./lib-esm/provider/Event.js");
/* harmony import */ var _EventChecker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EventChecker */ "./lib-esm/provider/EventChecker.js");
/* harmony import */ var _EventRecorder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EventRecorder */ "./lib-esm/provider/EventRecorder.js");
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../browser */ "./lib-esm/browser/index.js");
/* harmony import */ var _tracker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../tracker */ "./lib-esm/tracker/index.js");
/* harmony import */ var _tracker_ClickTracker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../tracker/ClickTracker */ "./lib-esm/tracker/ClickTracker.js");
/* harmony import */ var _tracker_PageLoadTracker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../tracker/PageLoadTracker */ "./lib-esm/tracker/PageLoadTracker.js");
/* harmony import */ var _tracker_ScrollTracker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../tracker/ScrollTracker */ "./lib-esm/tracker/ScrollTracker.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../types */ "./lib-esm/types/index.js");
/* harmony import */ var _util_StorageUtil__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../util/StorageUtil */ "./lib-esm/util/StorageUtil.js");














var logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_12__.ConsoleLogger('ClickstreamProvider');
var ClickstreamProvider = /** @class */function () {
  function ClickstreamProvider() {
    this.configuration = {
      appId: '',
      endpoint: '',
      sendMode: _types__WEBPACK_IMPORTED_MODULE_10__.SendMode.Immediate,
      sendEventsInterval: 5000,
      isTrackPageViewEvents: true,
      isTrackUserEngagementEvents: true,
      isTrackClickEvents: true,
      isTrackSearchEvents: true,
      isTrackScrollEvents: true,
      isTrackPageLoadEvents: false,
      isTrackAppStartEvents: false,
      isTrackAppEndEvents: false,
      pageType: _types__WEBPACK_IMPORTED_MODULE_10__.PageType.SPA,
      isLogEvents: false,
      sessionTimeoutDuration: 1800000,
      idleTimeoutDuration: 120000,
      searchKeyWords: [],
      domainList: [],
      globalAttributes: {}
    };
  }
  ClickstreamProvider.prototype.configure = function (configuration) {
    if (configuration.appId === '' || configuration.endpoint === '') {
      logger.error('Please configure your appId and endpoint');
      return configuration;
    }
    Object.assign(this.configuration, configuration);
    this.context = new _ClickstreamContext__WEBPACK_IMPORTED_MODULE_1__.ClickstreamContext(new _browser__WEBPACK_IMPORTED_MODULE_5__.BrowserInfo(), this.configuration);
    this.eventRecorder = new _EventRecorder__WEBPACK_IMPORTED_MODULE_4__.EventRecorder(this.context);
    this.globalAttributes = {};
    this.setGlobalAttributes(configuration.globalAttributes);
    this.userAttributes = _util_StorageUtil__WEBPACK_IMPORTED_MODULE_11__.StorageUtil.getSimpleUserAttributes();
    this.sessionTracker = new _tracker__WEBPACK_IMPORTED_MODULE_6__.SessionTracker(this, this.context);
    this.pageViewTracker = new _tracker__WEBPACK_IMPORTED_MODULE_6__.PageViewTracker(this, this.context);
    this.clickTracker = new _tracker_ClickTracker__WEBPACK_IMPORTED_MODULE_7__.ClickTracker(this, this.context);
    this.scrollTracker = new _tracker_ScrollTracker__WEBPACK_IMPORTED_MODULE_9__.ScrollTracker(this, this.context);
    this.pageLoadTracker = new _tracker_PageLoadTracker__WEBPACK_IMPORTED_MODULE_8__.PageLoadTracker(this, this.context);
    this.sessionTracker.setUp();
    this.pageViewTracker.setUp();
    this.clickTracker.setUp();
    this.scrollTracker.setUp();
    this.pageLoadTracker.setUp();
    if (configuration.sendMode === _types__WEBPACK_IMPORTED_MODULE_10__.SendMode.Batch) {
      this.startTimer();
    }
    if (this.context.configuration.isLogEvents) {
      logger.level = _aws_amplify_core_lib_Logger__WEBPACK_IMPORTED_MODULE_13__.LOG_TYPE.DEBUG;
    }
    logger.debug('Initialize the SDK successfully, configuration is:\n' + JSON.stringify(this.configuration));
    if (this.eventRecorder.getFailedEventsLength() > 0) {
      this.eventRecorder.haveFailedEvents = true;
      this.eventRecorder.sendFailedEvents();
    }
    return this.configuration;
  };
  ClickstreamProvider.prototype.updateConfigure = function (configuration) {
    Object.assign(this.configuration, configuration);
  };
  ClickstreamProvider.prototype.getCategory = function () {
    return 'Analytics';
  };
  ClickstreamProvider.prototype.getProviderName = function () {
    return 'ClickstreamProvider';
  };
  ClickstreamProvider.prototype.record = function (event) {
    var result = _EventChecker__WEBPACK_IMPORTED_MODULE_3__.EventChecker.checkEventName(event.name);
    if (result.error_code > 0) {
      logger.error(result.error_message);
      this.recordClickstreamError(result);
      return;
    }
    var resultEvent = this.createEvent(event);
    this.recordEvent(resultEvent, event.isImmediate);
  };
  ClickstreamProvider.prototype.createEvent = function (event, allUserAttributes) {
    if (allUserAttributes === void 0) {
      allUserAttributes = null;
    }
    return _AnalyticsEventBuilder__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEventBuilder.createEvent(this.context, event, allUserAttributes === null ? this.userAttributes : allUserAttributes, this.globalAttributes, this.sessionTracker.session);
  };
  ClickstreamProvider.prototype.recordEvent = function (event, isImmediate) {
    if (isImmediate === void 0) {
      isImmediate = false;
    }
    this.eventRecorder.record(event, isImmediate);
  };
  ClickstreamProvider.prototype.setUserId = function (userId) {
    var previousUserId = '';
    if (_Event__WEBPACK_IMPORTED_MODULE_2__.Event.ReservedAttribute.USER_ID in this.userAttributes) {
      previousUserId = this.userAttributes[_Event__WEBPACK_IMPORTED_MODULE_2__.Event.ReservedAttribute.USER_ID].value.toString();
    }
    if (userId === null) {
      delete this.userAttributes[_Event__WEBPACK_IMPORTED_MODULE_2__.Event.ReservedAttribute.USER_ID];
    } else if (userId !== previousUserId) {
      var userInfo = _util_StorageUtil__WEBPACK_IMPORTED_MODULE_11__.StorageUtil.getUserInfoFromMapping(userId);
      var newUserAttribute = {};
      newUserAttribute[_Event__WEBPACK_IMPORTED_MODULE_2__.Event.ReservedAttribute.USER_ID] = {
        value: userId,
        set_timestamp: new Date().getTime()
      };
      newUserAttribute[_Event__WEBPACK_IMPORTED_MODULE_2__.Event.ReservedAttribute.USER_FIRST_TOUCH_TIMESTAMP] = userInfo[_Event__WEBPACK_IMPORTED_MODULE_2__.Event.ReservedAttribute.USER_FIRST_TOUCH_TIMESTAMP];
      _util_StorageUtil__WEBPACK_IMPORTED_MODULE_11__.StorageUtil.updateUserAttributes(newUserAttribute);
      this.userAttributes = newUserAttribute;
      this.context.userUniqueId = _util_StorageUtil__WEBPACK_IMPORTED_MODULE_11__.StorageUtil.getCurrentUserUniqueId();
    }
    this.recordProfileSet(this.userAttributes);
    _util_StorageUtil__WEBPACK_IMPORTED_MODULE_11__.StorageUtil.updateUserAttributes(this.userAttributes);
  };
  ClickstreamProvider.prototype.setUserAttributes = function (attributes) {
    var timestamp = new Date().getTime();
    var allUserAttributes = _util_StorageUtil__WEBPACK_IMPORTED_MODULE_11__.StorageUtil.getAllUserAttributes();
    for (var key in attributes) {
      var value = attributes[key];
      if (value === null) {
        delete allUserAttributes[key];
      } else {
        var currentNumber = Object.keys(allUserAttributes).length;
        var checkUserAttribute = _EventChecker__WEBPACK_IMPORTED_MODULE_3__.EventChecker.checkUserAttribute;
        var result = checkUserAttribute(currentNumber, key, value);
        if (result.error_code > 0) {
          this.recordClickstreamError(result);
        } else {
          allUserAttributes[key] = {
            value: value,
            set_timestamp: timestamp
          };
        }
      }
    }
    _util_StorageUtil__WEBPACK_IMPORTED_MODULE_11__.StorageUtil.updateUserAttributes(allUserAttributes);
    this.recordProfileSet(allUserAttributes);
  };
  ClickstreamProvider.prototype.setGlobalAttributes = function (attributes) {
    for (var key in attributes) {
      var value = attributes[key];
      if (value === null) {
        delete this.globalAttributes[key];
      } else {
        var currentNumber = Object.keys(this.globalAttributes).length;
        var checkAttributes = _EventChecker__WEBPACK_IMPORTED_MODULE_3__.EventChecker.checkAttributes;
        var result = checkAttributes(currentNumber, key, value);
        if (result.error_code > 0) {
          this.recordClickstreamError(result);
        } else {
          this.globalAttributes[key] = value;
        }
      }
    }
  };
  ClickstreamProvider.prototype.recordClickstreamError = function (error) {
    var _a;
    var _b = _Event__WEBPACK_IMPORTED_MODULE_2__.Event.ReservedAttribute,
      ERROR_CODE = _b.ERROR_CODE,
      ERROR_MESSAGE = _b.ERROR_MESSAGE;
    var errorEvent = this.createEvent({
      name: _Event__WEBPACK_IMPORTED_MODULE_2__.Event.PresetEvent.CLICKSTREAM_ERROR,
      attributes: (_a = {}, _a[ERROR_CODE] = error.error_code, _a[ERROR_MESSAGE] = error.error_message, _a)
    });
    this.recordEvent(errorEvent);
  };
  ClickstreamProvider.prototype.recordProfileSet = function (allUserAttributes) {
    var profileSetEvent = this.createEvent({
      name: _Event__WEBPACK_IMPORTED_MODULE_2__.Event.PresetEvent.PROFILE_SET
    }, allUserAttributes);
    this.recordEvent(profileSetEvent);
  };
  ClickstreamProvider.prototype.startTimer = function () {
    setInterval(this.flushEvents.bind(this, this.eventRecorder), this.configuration.sendEventsInterval);
  };
  ClickstreamProvider.prototype.flushEvents = function (eventRecorder) {
    eventRecorder.flushEvents();
  };
  ClickstreamProvider.prototype.sendEventsInBackground = function (isWindowClosing) {
    if (!(_browser__WEBPACK_IMPORTED_MODULE_5__.BrowserInfo.isFirefox() && isWindowClosing) && _browser__WEBPACK_IMPORTED_MODULE_5__.BrowserInfo.isNetworkOnLine()) {
      this.eventRecorder.sendEventsInBackground(isWindowClosing);
    }
  };
  return ClickstreamProvider;
}();


/***/ }),

/***/ "./lib-esm/provider/Event.js":
/*!***********************************!*\
  !*** ./lib-esm/provider/Event.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Event: () => (/* binding */ Event)
/* harmony export */ });
var Event = /** @class */function () {
  function Event() {}
  Event.Limit = {
    MAX_EVENT_TYPE_LENGTH: 50,
    MAX_NUM_OF_ATTRIBUTES: 500,
    MAX_NUM_OF_USER_ATTRIBUTES: 100,
    MAX_LENGTH_OF_NAME: 50,
    MAX_LENGTH_OF_VALUE: 1024,
    MAX_LENGTH_OF_USER_VALUE: 256,
    MAX_EVENT_NUMBER_OF_BATCH: 100,
    MAX_LENGTH_OF_ERROR_VALUE: 256,
    MAX_NUM_OF_ITEMS: 100,
    MAX_LENGTH_OF_ITEM_VALUE: 256,
    MAX_NUM_OF_CUSTOM_ITEM_ATTRIBUTE: 10
  };
  Event.ErrorCode = {
    NO_ERROR: 0,
    EVENT_NAME_INVALID: 1001,
    EVENT_NAME_LENGTH_EXCEED: 1002,
    ATTRIBUTE_NAME_LENGTH_EXCEED: 2001,
    ATTRIBUTE_NAME_INVALID: 2002,
    ATTRIBUTE_VALUE_LENGTH_EXCEED: 2003,
    ATTRIBUTE_SIZE_EXCEED: 2004,
    USER_ATTRIBUTE_SIZE_EXCEED: 3001,
    USER_ATTRIBUTE_NAME_LENGTH_EXCEED: 3002,
    USER_ATTRIBUTE_NAME_INVALID: 3003,
    USER_ATTRIBUTE_VALUE_LENGTH_EXCEED: 3004,
    ITEM_SIZE_EXCEED: 4001,
    ITEM_VALUE_LENGTH_EXCEED: 4002,
    ITEM_CUSTOM_ATTRIBUTE_SIZE_EXCEED: 4003,
    ITEM_CUSTOM_ATTRIBUTE_KEY_LENGTH_EXCEED: 4004,
    ITEM_CUSTOM_ATTRIBUTE_KEY_INVALID: 4005
  };
  Event.ReservedAttribute = {
    USER_ID: '_user_id',
    USER_FIRST_TOUCH_TIMESTAMP: '_user_first_touch_timestamp',
    ERROR_CODE: '_error_code',
    ERROR_MESSAGE: '_error_message',
    IS_FIRST_TIME: '_is_first_time',
    ENGAGEMENT_TIMESTAMP: '_engagement_time_msec',
    PAGE_URL: '_page_url',
    PAGE_TITLE: '_page_title',
    PAGE_REFERRER: '_page_referrer',
    PAGE_REFERRER_TITLE: '_page_referrer_title',
    LATEST_REFERRER: '_latest_referrer',
    LATEST_REFERRER_HOST: '_latest_referrer_host',
    PREVIOUS_TIMESTAMP: '_previous_timestamp',
    ENTRANCES: '_entrances',
    SESSION_ID: '_session_id',
    SESSION_DURATION: '_session_duration',
    SESSION_NUMBER: '_session_number',
    SESSION_START_TIMESTAMP: '_session_start_timestamp',
    LINK_CLASSES: '_link_classes',
    LINK_DOMAIN: '_link_domain',
    LINK_ID: '_link_id',
    LINK_URL: '_link_url',
    OUTBOUND: '_outbound',
    SEARCH_KEY: '_search_key',
    SEARCH_TERM: '_search_term',
    TIMING_ATTRIBUTES: ['duration', 'deliveryType', 'nextHopProtocol', 'renderBlockingStatus', 'startTime', 'redirectStart', 'redirectEnd', 'workerStart', 'fetchStart', 'domainLookupStart', 'domainLookupEnd', 'connectStart', 'secureConnectionStart', 'connectEnd', 'requestStart', 'firstInterimResponseStart', 'responseStart', 'responseEnd', 'transferSize', 'encodedBodySize', 'decodedBodySize', 'responseStatus', 'unloadEventStart', 'unloadEventEnd', 'domInteractive', 'domContentLoadedEventStart', 'domContentLoadedEventEnd', 'domComplete', 'loadEventStart', 'loadEventEnd', 'type', 'redirectCount', 'activationStart', 'criticalCHRestart', 'serverTiming']
  };
  Event.PresetEvent = {
    FIRST_OPEN: '_first_open',
    APP_START: '_app_start',
    APP_END: '_app_end',
    PROFILE_SET: '_profile_set',
    CLICKSTREAM_ERROR: '_clickstream_error',
    SESSION_START: '_session_start',
    USER_ENGAGEMENT: '_user_engagement',
    PAGE_VIEW: '_page_view',
    CLICK: '_click',
    SEARCH: '_search',
    SCROLL: '_scroll',
    PAGE_LOAD: '_page_load'
  };
  Event.Constants = {
    PREFIX: '[',
    SUFFIX: ']',
    LAST_EVENT_IDENTIFIER: '},{"event_type":',
    KEYWORDS: ['q', 's', 'search', 'query', 'keyword']
  };
  return Event;
}();


/***/ }),

/***/ "./lib-esm/provider/EventChecker.js":
/*!******************************************!*\
  !*** ./lib-esm/provider/EventChecker.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventChecker: () => (/* binding */ EventChecker)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-amplify/core */ "../../node_modules/@aws-amplify/core/lib-esm/Logger/ConsoleLogger.js");
/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Event */ "./lib-esm/provider/Event.js");



var logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.ConsoleLogger('ClickstreamProvider');
var EventChecker = /** @class */function () {
  function EventChecker() {}
  EventChecker.checkEventName = function (eventName) {
    var _a = _Event__WEBPACK_IMPORTED_MODULE_0__.Event.ErrorCode,
      EVENT_NAME_INVALID = _a.EVENT_NAME_INVALID,
      EVENT_NAME_LENGTH_EXCEED = _a.EVENT_NAME_LENGTH_EXCEED,
      NO_ERROR = _a.NO_ERROR;
    var MAX_EVENT_TYPE_LENGTH = _Event__WEBPACK_IMPORTED_MODULE_0__.Event.Limit.MAX_EVENT_TYPE_LENGTH;
    if (!EventChecker.isValidName(eventName)) {
      return {
        error_code: EVENT_NAME_INVALID,
        error_message: "Event name can only contains uppercase and lowercase letters, " + "underscores, number, and is not start with a number. event name: ".concat(eventName)
      };
    } else if (eventName.length > MAX_EVENT_TYPE_LENGTH) {
      return {
        error_code: EVENT_NAME_LENGTH_EXCEED,
        error_message: "Event name is too long, the max event type length is " + "".concat(MAX_EVENT_TYPE_LENGTH, " characters. event name: ").concat(eventName)
      };
    }
    return {
      error_code: NO_ERROR
    };
  };
  EventChecker.isValidName = function (name) {
    var regex = /^(?![0-9])[0-9a-zA-Z_]+$/;
    return regex.test(name);
  };
  EventChecker.checkAttributes = function (currentNumber, key, value) {
    var _a = _Event__WEBPACK_IMPORTED_MODULE_0__.Event.Limit,
      MAX_NUM_OF_ATTRIBUTES = _a.MAX_NUM_OF_ATTRIBUTES,
      MAX_LENGTH_OF_NAME = _a.MAX_LENGTH_OF_NAME,
      MAX_LENGTH_OF_VALUE = _a.MAX_LENGTH_OF_VALUE;
    var _b = _Event__WEBPACK_IMPORTED_MODULE_0__.Event.ErrorCode,
      NO_ERROR = _b.NO_ERROR,
      ATTRIBUTE_SIZE_EXCEED = _b.ATTRIBUTE_SIZE_EXCEED,
      ATTRIBUTE_NAME_INVALID = _b.ATTRIBUTE_NAME_INVALID,
      ATTRIBUTE_NAME_LENGTH_EXCEED = _b.ATTRIBUTE_NAME_LENGTH_EXCEED,
      ATTRIBUTE_VALUE_LENGTH_EXCEED = _b.ATTRIBUTE_VALUE_LENGTH_EXCEED;
    var error;
    var errorMsg;
    if (currentNumber >= MAX_NUM_OF_ATTRIBUTES) {
      errorMsg = "reached the max number of attributes limit ".concat(MAX_NUM_OF_ATTRIBUTES, ". ") + "and the attribute: ".concat(key, " will not be recorded");
      var errorString = "attribute name: ".concat(key);
      error = {
        error_message: EventChecker.getLimitString(errorString),
        error_code: ATTRIBUTE_SIZE_EXCEED
      };
    } else if (key.length > MAX_LENGTH_OF_NAME) {
      errorMsg = "attribute : ".concat(key, ", reached the max length of attributes name ") + "limit(".concat(MAX_LENGTH_OF_NAME, "). current length is: (").concat(key.length, ") ") + "and the attribute will not be recorded";
      var errorString = "attribute name length is: (".concat(key.length, ") name is: ").concat(key);
      error = {
        error_message: EventChecker.getLimitString(errorString),
        error_code: ATTRIBUTE_NAME_LENGTH_EXCEED
      };
    } else if (!EventChecker.isValidName(key)) {
      errorMsg = "attribute : ".concat(key, ", was not valid, attribute name can only ") + "contains uppercase and lowercase letters, underscores, number, and is not " + "start with a number, so the attribute will not be recorded";
      error = {
        error_message: EventChecker.getLimitString(key),
        error_code: ATTRIBUTE_NAME_INVALID
      };
    } else if (String(value).length > MAX_LENGTH_OF_VALUE) {
      errorMsg = "attribute : ".concat(key, ", reached the max length of attributes value limit ") + "(".concat(MAX_LENGTH_OF_VALUE, "). current length is: (").concat(String(value).length, "). ") + "and the attribute will not be recorded, attribute value: ".concat(value);
      var errorString = "attribute name: ".concat(key, ", attribute value: ").concat(value);
      error = {
        error_message: EventChecker.getLimitString(errorString),
        error_code: ATTRIBUTE_VALUE_LENGTH_EXCEED
      };
    }
    if (error) {
      logger.warn(errorMsg);
      return error;
    }
    return {
      error_code: NO_ERROR
    };
  };
  EventChecker.getLimitString = function (str) {
    return str.substring(0, _Event__WEBPACK_IMPORTED_MODULE_0__.Event.Limit.MAX_LENGTH_OF_ERROR_VALUE);
  };
  EventChecker.checkUserAttribute = function (currentNumber, key, value) {
    var _a = _Event__WEBPACK_IMPORTED_MODULE_0__.Event.Limit,
      MAX_NUM_OF_USER_ATTRIBUTES = _a.MAX_NUM_OF_USER_ATTRIBUTES,
      MAX_LENGTH_OF_NAME = _a.MAX_LENGTH_OF_NAME,
      MAX_LENGTH_OF_USER_VALUE = _a.MAX_LENGTH_OF_USER_VALUE;
    var _b = _Event__WEBPACK_IMPORTED_MODULE_0__.Event.ErrorCode,
      NO_ERROR = _b.NO_ERROR,
      USER_ATTRIBUTE_SIZE_EXCEED = _b.USER_ATTRIBUTE_SIZE_EXCEED,
      USER_ATTRIBUTE_NAME_LENGTH_EXCEED = _b.USER_ATTRIBUTE_NAME_LENGTH_EXCEED,
      USER_ATTRIBUTE_NAME_INVALID = _b.USER_ATTRIBUTE_NAME_INVALID,
      USER_ATTRIBUTE_VALUE_LENGTH_EXCEED = _b.USER_ATTRIBUTE_VALUE_LENGTH_EXCEED;
    var error;
    var errorMsg;
    if (currentNumber >= MAX_NUM_OF_USER_ATTRIBUTES) {
      errorMsg = "reached the max number of user attributes limit (".concat(MAX_NUM_OF_USER_ATTRIBUTES, "). ") + "and the user attribute: ".concat(key, " will not be recorded");
      var errorString = "attribute name:".concat(key);
      error = {
        error_message: EventChecker.getLimitString(errorString),
        error_code: USER_ATTRIBUTE_SIZE_EXCEED
      };
    } else if (key.length > MAX_LENGTH_OF_NAME) {
      errorMsg = "user attribute : ".concat(key, ", reached the max length of attributes name limit ") + "(".concat(MAX_LENGTH_OF_NAME, "). current length is: (").concat(key.length, ") ") + "and the attribute will not be recorded";
      var errorString = "user attribute name length is: (".concat(key.length, ") name is: ").concat(key);
      error = {
        error_message: EventChecker.getLimitString(errorString),
        error_code: USER_ATTRIBUTE_NAME_LENGTH_EXCEED
      };
    } else if (!EventChecker.isValidName(key)) {
      errorMsg = "user attribute : ".concat(key, ", was not valid, user attribute name can only ") + "contains uppercase and lowercase letters, underscores, number, and is not " + "start with a number. so the attribute will not be recorded";
      error = {
        error_message: EventChecker.getLimitString(key),
        error_code: USER_ATTRIBUTE_NAME_INVALID
      };
    } else if (String(value).length > MAX_LENGTH_OF_USER_VALUE) {
      errorMsg = "user attribute : ".concat(key, ", reached the max length of attributes value limit ") + "(".concat(MAX_LENGTH_OF_USER_VALUE, "). current length is: (").concat(String(value).length, "). ") + "and the attribute will not be recorded, attribute value: ".concat(value);
      var errorString = "attribute name: ".concat(key, ", attribute value: ").concat(value);
      error = {
        error_message: EventChecker.getLimitString(errorString),
        error_code: USER_ATTRIBUTE_VALUE_LENGTH_EXCEED
      };
    }
    if (error) {
      logger.warn(errorMsg);
      return error;
    }
    return {
      error_code: NO_ERROR
    };
  };
  EventChecker.checkItems = function (currentNumber, item) {
    var e_1, _a;
    if (EventChecker.itemKeySet === undefined) {
      EventChecker.initItemKeySet();
    }
    var _b = _Event__WEBPACK_IMPORTED_MODULE_0__.Event.Limit,
      MAX_NUM_OF_ITEMS = _b.MAX_NUM_OF_ITEMS,
      MAX_LENGTH_OF_ITEM_VALUE = _b.MAX_LENGTH_OF_ITEM_VALUE,
      MAX_NUM_OF_CUSTOM_ITEM_ATTRIBUTE = _b.MAX_NUM_OF_CUSTOM_ITEM_ATTRIBUTE,
      MAX_LENGTH_OF_NAME = _b.MAX_LENGTH_OF_NAME;
    var _c = _Event__WEBPACK_IMPORTED_MODULE_0__.Event.ErrorCode,
      NO_ERROR = _c.NO_ERROR,
      ITEM_SIZE_EXCEED = _c.ITEM_SIZE_EXCEED,
      ITEM_VALUE_LENGTH_EXCEED = _c.ITEM_VALUE_LENGTH_EXCEED,
      ITEM_CUSTOM_ATTRIBUTE_SIZE_EXCEED = _c.ITEM_CUSTOM_ATTRIBUTE_SIZE_EXCEED,
      ITEM_CUSTOM_ATTRIBUTE_KEY_LENGTH_EXCEED = _c.ITEM_CUSTOM_ATTRIBUTE_KEY_LENGTH_EXCEED,
      ITEM_CUSTOM_ATTRIBUTE_KEY_INVALID = _c.ITEM_CUSTOM_ATTRIBUTE_KEY_INVALID;
    var itemKey = JSON.stringify(item);
    if (currentNumber >= MAX_NUM_OF_ITEMS) {
      var errorMsg_1 = "reached the max number of items limit ".concat(MAX_NUM_OF_ITEMS, ". ") + "and the item: ".concat(itemKey, " will not be recorded");
      logger.warn(errorMsg_1);
      var errorString = "item: ".concat(itemKey);
      return {
        error_message: EventChecker.getLimitString(errorString),
        error_code: ITEM_SIZE_EXCEED
      };
    }
    var customKeyNumber = 0;
    var errorMsg;
    var error;
    try {
      for (var _d = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__values)(Object.entries(item)), _e = _d.next(); !_e.done; _e = _d.next()) {
        var _f = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__read)(_e.value, 2),
          key = _f[0],
          value = _f[1];
        var valueStr = String(value);
        if (!EventChecker.itemKeySet.has(key)) {
          customKeyNumber += 1;
          if (customKeyNumber > MAX_NUM_OF_CUSTOM_ITEM_ATTRIBUTE) {
            errorMsg = "reached the max number of custom item attributes limit (".concat(MAX_NUM_OF_CUSTOM_ITEM_ATTRIBUTE) + "). and the item: ".concat(itemKey, " will not be recorded");
            var errorString = "item attribute key: ".concat(key);
            error = {
              error_message: EventChecker.getLimitString(errorString),
              error_code: ITEM_CUSTOM_ATTRIBUTE_SIZE_EXCEED
            };
          } else if (key.length > _Event__WEBPACK_IMPORTED_MODULE_0__.Event.Limit.MAX_LENGTH_OF_NAME) {
            errorMsg = "item attribute key: ".concat(key, " , reached the max length of item attributes key limit(") + "".concat(MAX_LENGTH_OF_NAME, "). current length is:(").concat(key.length, ") and the item: ").concat(itemKey, " will not be recorded");
            var errorString = 'item attribute key: ' + key;
            error = {
              error_message: EventChecker.getLimitString(errorString),
              error_code: ITEM_CUSTOM_ATTRIBUTE_KEY_LENGTH_EXCEED
            };
          } else if (!EventChecker.isValidName(key)) {
            errorMsg = "item attribute key: ".concat(key, ", was not valid, item attribute key can only contains") + ' uppercase and lowercase letters, underscores, number, and is not start with a number.' + " so the item: ".concat(itemKey, " will not be recorded");
            error = {
              error_message: EventChecker.getLimitString(key),
              error_code: ITEM_CUSTOM_ATTRIBUTE_KEY_INVALID
            };
          }
        }
        if (!error && valueStr.length > MAX_LENGTH_OF_ITEM_VALUE) {
          errorMsg = "item attribute : ".concat(key, ", reached the max length of item attribute value limit ") + "(".concat(MAX_LENGTH_OF_ITEM_VALUE, "). current length is: (").concat(valueStr.length, "). ") + "and the item: ".concat(itemKey, " will not be recorded");
          var errorString = "item attribute name: ".concat(key, ", item attribute value: ").concat(valueStr);
          error = {
            error_message: EventChecker.getLimitString(errorString),
            error_code: ITEM_VALUE_LENGTH_EXCEED
          };
        }
        if (error) {
          logger.warn(errorMsg);
          return error;
        }
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_e && !_e.done && (_a = _d["return"])) _a.call(_d);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    return {
      error_code: NO_ERROR
    };
  };
  EventChecker.initItemKeySet = function () {
    EventChecker.itemKeySet = new Set();
    EventChecker.itemKeySet.add('id');
    EventChecker.itemKeySet.add('name');
    EventChecker.itemKeySet.add('location_id');
    EventChecker.itemKeySet.add('brand');
    EventChecker.itemKeySet.add('currency');
    EventChecker.itemKeySet.add('price');
    EventChecker.itemKeySet.add('quantity');
    EventChecker.itemKeySet.add('creative_name');
    EventChecker.itemKeySet.add('creative_slot');
    EventChecker.itemKeySet.add('category');
    EventChecker.itemKeySet.add('category2');
    EventChecker.itemKeySet.add('category3');
    EventChecker.itemKeySet.add('category4');
    EventChecker.itemKeySet.add('category5');
  };
  return EventChecker;
}();


/***/ }),

/***/ "./lib-esm/provider/EventRecorder.js":
/*!*******************************************!*\
  !*** ./lib-esm/provider/EventRecorder.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventRecorder: () => (/* binding */ EventRecorder)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @aws-amplify/core */ "../../node_modules/@aws-amplify/core/lib-esm/Logger/ConsoleLogger.js");
/* harmony import */ var _aws_amplify_core_lib_Logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @aws-amplify/core/lib/Logger */ "../../node_modules/@aws-amplify/core/lib/Logger/index.js");
/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Event */ "./lib-esm/provider/Event.js");
/* harmony import */ var _network_NetRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../network/NetRequest */ "./lib-esm/network/NetRequest.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types */ "./lib-esm/types/index.js");
/* harmony import */ var _util_StorageUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/StorageUtil */ "./lib-esm/util/StorageUtil.js");







var logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_4__.ConsoleLogger('EventRecorder');
var EventRecorder = /** @class */function () {
  function EventRecorder(context) {
    this.context = context;
    this.bundleSequenceId = _util_StorageUtil__WEBPACK_IMPORTED_MODULE_3__.StorageUtil.getBundleSequenceId();
  }
  EventRecorder.prototype.record = function (event, isImmediate) {
    if (isImmediate === void 0) {
      isImmediate = false;
    }
    if (this.context.configuration.isLogEvents) {
      logger.level = _aws_amplify_core_lib_Logger__WEBPACK_IMPORTED_MODULE_5__.LOG_TYPE.DEBUG;
      logger.debug("Logged event ".concat(event.event_type, "\n"), event);
    }
    var currentMode = this.context.configuration.sendMode;
    if (currentMode === _types__WEBPACK_IMPORTED_MODULE_2__.SendMode.Immediate || isImmediate) {
      this.sendEventImmediate(event);
    } else {
      if (!_util_StorageUtil__WEBPACK_IMPORTED_MODULE_3__.StorageUtil.saveEvent(event)) {
        this.sendEventImmediate(event);
      }
    }
  };
  EventRecorder.prototype.sendEventImmediate = function (event) {
    var _this = this;
    var eventsJson = JSON.stringify([event]);
    _network_NetRequest__WEBPACK_IMPORTED_MODULE_1__.NetRequest.sendRequest(eventsJson, this.context, this.bundleSequenceId).then(function (result) {
      if (result) {
        logger.debug('Event send success');
        if (_this.haveFailedEvents) {
          _this.sendFailedEvents();
        }
      } else {
        _util_StorageUtil__WEBPACK_IMPORTED_MODULE_3__.StorageUtil.saveFailedEvent(event);
        _this.haveFailedEvents = true;
      }
    });
    this.plusSequenceId();
  };
  EventRecorder.prototype.sendFailedEvents = function () {
    var _this = this;
    if (this.isSendingFailedEvents) return;
    this.isSendingFailedEvents = true;
    var failedEvents = _util_StorageUtil__WEBPACK_IMPORTED_MODULE_3__.StorageUtil.getFailedEvents();
    if (failedEvents.length > 0) {
      var eventsJson = failedEvents + _Event__WEBPACK_IMPORTED_MODULE_0__.Event.Constants.SUFFIX;
      _network_NetRequest__WEBPACK_IMPORTED_MODULE_1__.NetRequest.sendRequest(eventsJson, this.context, this.bundleSequenceId).then(function (result) {
        if (result) {
          logger.debug('Failed events send success');
          _util_StorageUtil__WEBPACK_IMPORTED_MODULE_3__.StorageUtil.clearFailedEvents();
          _this.haveFailedEvents = false;
        }
        _this.isSendingFailedEvents = false;
      });
      this.plusSequenceId();
    }
  };
  EventRecorder.prototype.flushEvents = function () {
    var _this = this;
    if (this.isFlushingEvents) {
      return;
    }
    var _a = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__read)(this.getBatchEvents(), 2),
      eventsJson = _a[0],
      needsFlushTwice = _a[1];
    if (eventsJson === '') {
      return;
    }
    this.isFlushingEvents = true;
    _network_NetRequest__WEBPACK_IMPORTED_MODULE_1__.NetRequest.sendRequest(eventsJson, this.context, this.bundleSequenceId, _network_NetRequest__WEBPACK_IMPORTED_MODULE_1__.NetRequest.BATCH_REQUEST_RETRY_TIMES, _network_NetRequest__WEBPACK_IMPORTED_MODULE_1__.NetRequest.BATCH_REQUEST_TIMEOUT).then(function (result) {
      if (result) {
        _util_StorageUtil__WEBPACK_IMPORTED_MODULE_3__.StorageUtil.clearEvents(eventsJson);
      }
      _this.isFlushingEvents = false;
      if (result && needsFlushTwice) {
        _this.flushEvents();
      }
    });
    this.plusSequenceId();
  };
  EventRecorder.prototype.getBatchEvents = function () {
    var allEventsStr = _util_StorageUtil__WEBPACK_IMPORTED_MODULE_3__.StorageUtil.getAllEvents();
    if (allEventsStr === '') {
      return [allEventsStr, false];
    } else if (allEventsStr.length <= _util_StorageUtil__WEBPACK_IMPORTED_MODULE_3__.StorageUtil.MAX_REQUEST_EVENTS_SIZE) {
      return [allEventsStr + _Event__WEBPACK_IMPORTED_MODULE_0__.Event.Constants.SUFFIX, false];
    } else {
      var isOnlyOneEvent = allEventsStr.lastIndexOf(_Event__WEBPACK_IMPORTED_MODULE_0__.Event.Constants.LAST_EVENT_IDENTIFIER) < 0;
      var firstEventSize = allEventsStr.indexOf(_Event__WEBPACK_IMPORTED_MODULE_0__.Event.Constants.LAST_EVENT_IDENTIFIER);
      if (isOnlyOneEvent) {
        return [allEventsStr + _Event__WEBPACK_IMPORTED_MODULE_0__.Event.Constants.SUFFIX, false];
      } else if (firstEventSize > _util_StorageUtil__WEBPACK_IMPORTED_MODULE_3__.StorageUtil.MAX_REQUEST_EVENTS_SIZE) {
        allEventsStr = allEventsStr.substring(0, firstEventSize + 1);
        return [allEventsStr + _Event__WEBPACK_IMPORTED_MODULE_0__.Event.Constants.SUFFIX, true];
      } else {
        allEventsStr = allEventsStr.substring(0, _util_StorageUtil__WEBPACK_IMPORTED_MODULE_3__.StorageUtil.MAX_REQUEST_EVENTS_SIZE);
        var endIndex = allEventsStr.lastIndexOf(_Event__WEBPACK_IMPORTED_MODULE_0__.Event.Constants.LAST_EVENT_IDENTIFIER);
        return [allEventsStr.substring(0, endIndex + 1) + _Event__WEBPACK_IMPORTED_MODULE_0__.Event.Constants.SUFFIX, true];
      }
    }
  };
  EventRecorder.prototype.plusSequenceId = function () {
    this.bundleSequenceId += 1;
    _util_StorageUtil__WEBPACK_IMPORTED_MODULE_3__.StorageUtil.saveBundleSequenceId(this.bundleSequenceId);
  };
  EventRecorder.prototype.sendEventsInBackground = function (isWindowClosing) {
    if (this.haveFailedEvents && this.getFailedEventsLength() < _network_NetRequest__WEBPACK_IMPORTED_MODULE_1__.NetRequest.KEEP_ALIVE_SIZE_LIMIT) {
      this.sendFailedEvents();
      if (isWindowClosing) {
        _util_StorageUtil__WEBPACK_IMPORTED_MODULE_3__.StorageUtil.clearFailedEvents();
      }
    }
    if (this.context.configuration.sendMode === _types__WEBPACK_IMPORTED_MODULE_2__.SendMode.Batch) {
      var eventLength = this.getEventsLength();
      if (eventLength > 0 && eventLength < _network_NetRequest__WEBPACK_IMPORTED_MODULE_1__.NetRequest.KEEP_ALIVE_SIZE_LIMIT) {
        this.flushEvents();
        if (isWindowClosing) {
          _util_StorageUtil__WEBPACK_IMPORTED_MODULE_3__.StorageUtil.clearAllEvents();
        }
      }
    }
  };
  EventRecorder.prototype.getFailedEventsLength = function () {
    var failedEvents = _util_StorageUtil__WEBPACK_IMPORTED_MODULE_3__.StorageUtil.getFailedEvents();
    return new Blob([failedEvents]).size;
  };
  EventRecorder.prototype.getEventsLength = function () {
    var events = _util_StorageUtil__WEBPACK_IMPORTED_MODULE_3__.StorageUtil.getAllEvents();
    return new Blob([events]).size;
  };
  return EventRecorder;
}();


/***/ }),

/***/ "./lib-esm/provider/index.js":
/*!***********************************!*\
  !*** ./lib-esm/provider/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnalyticsEventBuilder: () => (/* reexport safe */ _AnalyticsEventBuilder__WEBPACK_IMPORTED_MODULE_0__.AnalyticsEventBuilder),
/* harmony export */   ClickstreamContext: () => (/* reexport safe */ _ClickstreamContext__WEBPACK_IMPORTED_MODULE_1__.ClickstreamContext),
/* harmony export */   ClickstreamProvider: () => (/* reexport safe */ _ClickstreamProvider__WEBPACK_IMPORTED_MODULE_2__.ClickstreamProvider),
/* harmony export */   Event: () => (/* reexport safe */ _Event__WEBPACK_IMPORTED_MODULE_4__.Event),
/* harmony export */   EventChecker: () => (/* reexport safe */ _EventChecker__WEBPACK_IMPORTED_MODULE_5__.EventChecker),
/* harmony export */   EventRecorder: () => (/* reexport safe */ _EventRecorder__WEBPACK_IMPORTED_MODULE_3__.EventRecorder)
/* harmony export */ });
/* harmony import */ var _AnalyticsEventBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnalyticsEventBuilder */ "./lib-esm/provider/AnalyticsEventBuilder.js");
/* harmony import */ var _ClickstreamContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ClickstreamContext */ "./lib-esm/provider/ClickstreamContext.js");
/* harmony import */ var _ClickstreamProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ClickstreamProvider */ "./lib-esm/provider/ClickstreamProvider.js");
/* harmony import */ var _EventRecorder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EventRecorder */ "./lib-esm/provider/EventRecorder.js");
/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Event */ "./lib-esm/provider/Event.js");
/* harmony import */ var _EventChecker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EventChecker */ "./lib-esm/provider/EventChecker.js");







/***/ }),

/***/ "./lib-esm/tracker/BaseTracker.js":
/*!****************************************!*\
  !*** ./lib-esm/tracker/BaseTracker.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseTracker: () => (/* binding */ BaseTracker)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-amplify/core */ "../../node_modules/@aws-amplify/core/lib-esm/Logger/ConsoleLogger.js");
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../browser */ "./lib-esm/browser/index.js");


var logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.ConsoleLogger('BaseTracker');
var BaseTracker = /** @class */function () {
  function BaseTracker(provider, context) {
    this.provider = provider;
    this.context = context;
  }
  BaseTracker.prototype.setUp = function () {
    if (!_browser__WEBPACK_IMPORTED_MODULE_0__.BrowserInfo.isBrowser() || !document.addEventListener || !window.addEventListener || !history.pushState) {
      logger.warn('not in the supported web environment');
    } else {
      this.init();
    }
  };
  return BaseTracker;
}();


/***/ }),

/***/ "./lib-esm/tracker/ClickTracker.js":
/*!*****************************************!*\
  !*** ./lib-esm/tracker/ClickTracker.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClickTracker: () => (/* binding */ ClickTracker)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @aws-amplify/core */ "../../node_modules/@aws-amplify/core/lib-esm/Logger/ConsoleLogger.js");
/* harmony import */ var _BaseTracker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseTracker */ "./lib-esm/tracker/BaseTracker.js");
/* harmony import */ var _PageViewTracker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageViewTracker */ "./lib-esm/tracker/PageViewTracker.js");
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../provider */ "./lib-esm/provider/index.js");





var logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_3__.ConsoleLogger('ClickTracker');
var ClickTracker = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__extends)(ClickTracker, _super);
  function ClickTracker() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.processedElements = new WeakSet();
    return _this;
  }
  ClickTracker.prototype.init = function () {
    this.trackClick = this.trackClick.bind(this);
    this.trackDocumentClick = this.trackDocumentClick.bind(this);
    document.addEventListener('click', this.trackDocumentClick);
    var currentDomain = window.location.host;
    var domainList = this.context.configuration.domainList;
    if (!domainList.includes(currentDomain)) {
      domainList.push(currentDomain);
    }
    this.addClickListenerForATag();
  };
  ClickTracker.prototype.trackDocumentClick = function (event) {
    _PageViewTracker__WEBPACK_IMPORTED_MODULE_1__.PageViewTracker.updateIdleDuration();
    if (!this.context.configuration.isTrackClickEvents) return;
    var targetElement = event.target;
    var element = this.findATag(targetElement);
    if (!element || this.processedElements.has(element)) return;
    this.trackClick(event, element);
  };
  ClickTracker.prototype.trackClick = function (event, documentElement) {
    var _a;
    if (documentElement === void 0) {
      documentElement = undefined;
    }
    if (!this.context.configuration.isTrackClickEvents) return;
    var element = documentElement;
    if (!element) {
      var targetElement = event.target;
      element = this.findATag(targetElement);
    }
    if (element !== null) {
      var linkUrl = element.getAttribute('href');
      if (linkUrl === null || linkUrl.length === 0) return;
      var linkDomain = '';
      try {
        var url = new URL(linkUrl);
        linkDomain = url.host;
      } catch (error) {
        logger.debug('parse link domain failed: ' + error);
      }
      if (linkDomain === '') return;
      var linkClasses = element.getAttribute('class');
      var linkId = element.getAttribute('id');
      var outbound = !this.context.configuration.domainList.includes(linkDomain);
      this.provider.record({
        name: _provider__WEBPACK_IMPORTED_MODULE_2__.Event.PresetEvent.CLICK,
        attributes: (_a = {}, _a[_provider__WEBPACK_IMPORTED_MODULE_2__.Event.ReservedAttribute.LINK_URL] = linkUrl, _a[_provider__WEBPACK_IMPORTED_MODULE_2__.Event.ReservedAttribute.LINK_DOMAIN] = linkDomain, _a[_provider__WEBPACK_IMPORTED_MODULE_2__.Event.ReservedAttribute.LINK_CLASSES] = linkClasses, _a[_provider__WEBPACK_IMPORTED_MODULE_2__.Event.ReservedAttribute.LINK_ID] = linkId, _a[_provider__WEBPACK_IMPORTED_MODULE_2__.Event.ReservedAttribute.OUTBOUND] = outbound, _a)
      });
    }
  };
  ClickTracker.prototype.addClickListenerForATag = function () {
    var _this = this;
    var observer = new MutationObserver(function (mutationsList) {
      var e_1, _a;
      var _loop_1 = function _loop_1(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          var target = mutation.target;
          if (target instanceof Element) {
            var aTags_1 = target.querySelectorAll('a');
            aTags_1.forEach(function (aTag) {
              if (!_this.processedElements.has(aTags_1)) {
                aTag.addEventListener('click', _this.trackClick);
                _this.processedElements.add(aTag);
              }
            });
          }
        }
      };
      try {
        for (var mutationsList_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__values)(mutationsList), mutationsList_1_1 = mutationsList_1.next(); !mutationsList_1_1.done; mutationsList_1_1 = mutationsList_1.next()) {
          var mutation = mutationsList_1_1.value;
          _loop_1(mutation);
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (mutationsList_1_1 && !mutationsList_1_1.done && (_a = mutationsList_1["return"])) _a.call(mutationsList_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  };
  ClickTracker.prototype.findATag = function (element, depth) {
    if (depth === void 0) {
      depth = 0;
    }
    if (element && depth < 3) {
      if (element.tagName === 'A') {
        return element;
      } else {
        depth += 1;
        return this.findATag(element.parentElement, depth);
      }
    }
    return null;
  };
  return ClickTracker;
}(_BaseTracker__WEBPACK_IMPORTED_MODULE_0__.BaseTracker);


/***/ }),

/***/ "./lib-esm/tracker/PageLoadTracker.js":
/*!********************************************!*\
  !*** ./lib-esm/tracker/PageLoadTracker.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PageLoadTracker: () => (/* binding */ PageLoadTracker)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _BaseTracker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseTracker */ "./lib-esm/tracker/BaseTracker.js");
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../provider */ "./lib-esm/provider/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }



var PageLoadTracker = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(PageLoadTracker, _super);
  function PageLoadTracker() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  PageLoadTracker.prototype.init = function () {
    var _this = this;
    this.trackPageLoad = this.trackPageLoad.bind(this);
    if (this.isSupportedEnv()) {
      this.observer = new PerformanceObserver(function () {
        _this.trackPageLoad();
      });
      this.observer.observe({
        entryTypes: ['navigation']
      });
    }
    if (this.isPageLoaded()) {
      this.trackPageLoad();
    }
  };
  PageLoadTracker.prototype.trackPageLoad = function () {
    if (!this.context.configuration.isTrackPageLoadEvents) return;
    var performanceEntries = performance.getEntriesByType('navigation');
    if (performanceEntries && performanceEntries.length > 0) {
      var latestPerformance = performanceEntries[performanceEntries.length - 1];
      var eventAttributes = {};
      for (var key in latestPerformance) {
        var value = latestPerformance[key];
        var valueType = _typeof(value);
        if (_provider__WEBPACK_IMPORTED_MODULE_1__.Event.ReservedAttribute.TIMING_ATTRIBUTES.includes(key)) {
          if (valueType === 'string' || valueType === 'number') {
            eventAttributes[key] = value;
          } else if (Array.isArray(value) && value.length > 0) {
            eventAttributes[key] = JSON.stringify(value);
          }
        }
      }
      this.provider.record({
        name: _provider__WEBPACK_IMPORTED_MODULE_1__.Event.PresetEvent.PAGE_LOAD,
        attributes: eventAttributes
      });
    }
  };
  PageLoadTracker.prototype.isPageLoaded = function () {
    var _a;
    var performanceEntries = performance.getEntriesByType('navigation');
    return ((_a = performanceEntries === null || performanceEntries === void 0 ? void 0 : performanceEntries[0]) === null || _a === void 0 ? void 0 : _a.duration) > 0 || false;
  };
  PageLoadTracker.prototype.isSupportedEnv = function () {
    return !!performance && !!PerformanceObserver;
  };
  return PageLoadTracker;
}(_BaseTracker__WEBPACK_IMPORTED_MODULE_0__.BaseTracker);


/***/ }),

/***/ "./lib-esm/tracker/PageViewTracker.js":
/*!********************************************!*\
  !*** ./lib-esm/tracker/PageViewTracker.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Constants: () => (/* binding */ Constants),
/* harmony export */   PageViewTracker: () => (/* binding */ PageViewTracker)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _BaseTracker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseTracker */ "./lib-esm/tracker/BaseTracker.js");
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../browser */ "./lib-esm/browser/index.js");
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../provider */ "./lib-esm/provider/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types */ "./lib-esm/types/index.js");
/* harmony import */ var _util_MethodEmbed__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/MethodEmbed */ "./lib-esm/util/MethodEmbed.js");
/* harmony import */ var _util_StorageUtil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/StorageUtil */ "./lib-esm/util/StorageUtil.js");







var PageViewTracker = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__extends)(PageViewTracker, _super);
  function PageViewTracker() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.isEntrances = false;
    _this.searchKeywords = _provider__WEBPACK_IMPORTED_MODULE_2__.Event.Constants.KEYWORDS;
    _this.lastEngageTime = 0;
    _this.lastScreenStartTimestamp = 0;
    _this.isFirstTime = true;
    return _this;
  }
  PageViewTracker.prototype.init = function () {
    PageViewTracker.lastActiveTimestamp = new Date().getTime();
    PageViewTracker.idleTimeoutDuration = this.provider.configuration.idleTimeoutDuration;
    var configuredSearchKeywords = this.provider.configuration.searchKeyWords;
    Object.assign(this.searchKeywords, configuredSearchKeywords);
    this.onPageChange = this.onPageChange.bind(this);
    if (this.isMultiPageApp()) {
      if (!_browser__WEBPACK_IMPORTED_MODULE_1__.BrowserInfo.isFromReload()) {
        this.onPageChange();
      }
    } else {
      this.trackPageViewForSPA();
    }
    this.isFirstTime = false;
  };
  PageViewTracker.prototype.trackPageViewForSPA = function () {
    _util_MethodEmbed__WEBPACK_IMPORTED_MODULE_4__.MethodEmbed.add(history, 'pushState', this.onPageChange);
    _util_MethodEmbed__WEBPACK_IMPORTED_MODULE_4__.MethodEmbed.add(history, 'replaceState', this.onPageChange);
    window.addEventListener('popstate', this.onPageChange);
    if (!_browser__WEBPACK_IMPORTED_MODULE_1__.BrowserInfo.isFromReload()) {
      this.onPageChange();
    }
  };
  PageViewTracker.prototype.onPageChange = function () {
    var _a;
    PageViewTracker.updateIdleDuration();
    if (this.context.configuration.isTrackPageViewEvents) {
      var previousPageUrl = _util_StorageUtil__WEBPACK_IMPORTED_MODULE_5__.StorageUtil.getPreviousPageUrl();
      var previousPageTitle = _util_StorageUtil__WEBPACK_IMPORTED_MODULE_5__.StorageUtil.getPreviousPageTitle();
      var currentPageUrl = _browser__WEBPACK_IMPORTED_MODULE_1__.BrowserInfo.getCurrentPageUrl();
      var currentPageTitle = _browser__WEBPACK_IMPORTED_MODULE_1__.BrowserInfo.getCurrentPageTitle();
      if (this.isFirstTime || this.isMultiPageApp() || previousPageUrl !== currentPageUrl || previousPageTitle !== currentPageTitle) {
        (_a = this.provider.scrollTracker) === null || _a === void 0 ? void 0 : _a.enterNewPage();
        if (!this.isMultiPageApp() && !this.isFirstTime && previousPageUrl !== '') {
          this.recordUserEngagement();
        }
        this.trackPageView(previousPageUrl, previousPageTitle);
        this.trackSearchEvents();
        _util_StorageUtil__WEBPACK_IMPORTED_MODULE_5__.StorageUtil.savePreviousPageUrl(currentPageUrl);
        _util_StorageUtil__WEBPACK_IMPORTED_MODULE_5__.StorageUtil.savePreviousPageTitle(currentPageTitle);
      }
    }
  };
  PageViewTracker.prototype.trackPageView = function (previousPageUrl, previousPageTitle) {
    var _a;
    var previousPageStartTime = _util_StorageUtil__WEBPACK_IMPORTED_MODULE_5__.StorageUtil.getPreviousPageStartTime();
    var analyticsEvent = this.provider.createEvent({
      name: _provider__WEBPACK_IMPORTED_MODULE_2__.Event.PresetEvent.PAGE_VIEW
    });
    var currentPageStartTime = analyticsEvent.timestamp;
    var eventAttributes = (_a = {}, _a[_provider__WEBPACK_IMPORTED_MODULE_2__.Event.ReservedAttribute.PAGE_REFERRER] = previousPageUrl, _a[_provider__WEBPACK_IMPORTED_MODULE_2__.Event.ReservedAttribute.PAGE_REFERRER_TITLE] = previousPageTitle, _a[_provider__WEBPACK_IMPORTED_MODULE_2__.Event.ReservedAttribute.ENTRANCES] = this.isEntrances ? 1 : 0, _a);
    if (previousPageStartTime > 0) {
      eventAttributes[_provider__WEBPACK_IMPORTED_MODULE_2__.Event.ReservedAttribute.PREVIOUS_TIMESTAMP] = previousPageStartTime;
    }
    if (this.lastEngageTime > 0) {
      eventAttributes[_provider__WEBPACK_IMPORTED_MODULE_2__.Event.ReservedAttribute.ENGAGEMENT_TIMESTAMP] = this.lastEngageTime;
    }
    Object.assign(analyticsEvent.attributes, eventAttributes);
    this.provider.recordEvent(analyticsEvent);
    this.isEntrances = false;
    _util_StorageUtil__WEBPACK_IMPORTED_MODULE_5__.StorageUtil.savePreviousPageStartTime(currentPageStartTime);
    this.lastScreenStartTimestamp = currentPageStartTime;
  };
  PageViewTracker.prototype.setIsEntrances = function () {
    this.isEntrances = true;
  };
  PageViewTracker.prototype.updateLastScreenStartTimestamp = function () {
    this.lastScreenStartTimestamp = new Date().getTime();
    PageViewTracker.idleDuration = 0;
    PageViewTracker.lastActiveTimestamp = this.lastScreenStartTimestamp;
  };
  PageViewTracker.prototype.recordUserEngagement = function (isImmediate) {
    var _a;
    if (isImmediate === void 0) {
      isImmediate = false;
    }
    this.lastEngageTime = this.getLastEngageTime();
    if (this.provider.configuration.isTrackUserEngagementEvents && this.lastEngageTime > Constants.minEngagementTime) {
      this.provider.record({
        name: _provider__WEBPACK_IMPORTED_MODULE_2__.Event.PresetEvent.USER_ENGAGEMENT,
        attributes: (_a = {}, _a[_provider__WEBPACK_IMPORTED_MODULE_2__.Event.ReservedAttribute.ENGAGEMENT_TIMESTAMP] = this.lastEngageTime, _a),
        isImmediate: isImmediate
      });
    }
  };
  PageViewTracker.prototype.getLastEngageTime = function () {
    var duration = new Date().getTime() - this.lastScreenStartTimestamp;
    var engageTime = duration - PageViewTracker.idleDuration;
    PageViewTracker.idleDuration = 0;
    return engageTime;
  };
  PageViewTracker.prototype.isMultiPageApp = function () {
    return this.context.configuration.pageType === _types__WEBPACK_IMPORTED_MODULE_3__.PageType.multiPageApp;
  };
  PageViewTracker.prototype.trackSearchEvents = function () {
    var e_1, _a, _b;
    if (!this.context.configuration.isTrackSearchEvents) return;
    var searchStr = window.location.search;
    if (!searchStr || searchStr.length === 0) return;
    var urlParams = new URLSearchParams(searchStr);
    try {
      for (var _c = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__values)(this.searchKeywords), _d = _c.next(); !_d.done; _d = _c.next()) {
        var keyword = _d.value;
        if (urlParams.has(keyword)) {
          var searchTerm = urlParams.get(keyword);
          this.provider.record({
            name: _provider__WEBPACK_IMPORTED_MODULE_2__.Event.PresetEvent.SEARCH,
            attributes: (_b = {}, _b[_provider__WEBPACK_IMPORTED_MODULE_2__.Event.ReservedAttribute.SEARCH_KEY] = keyword, _b[_provider__WEBPACK_IMPORTED_MODULE_2__.Event.ReservedAttribute.SEARCH_TERM] = searchTerm, _b)
          });
          break;
        }
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };
  PageViewTracker.updateIdleDuration = function () {
    var currentTimestamp = new Date().getTime();
    var idleDuration = currentTimestamp - PageViewTracker.lastActiveTimestamp;
    if (idleDuration > PageViewTracker.idleTimeoutDuration) {
      PageViewTracker.idleDuration += idleDuration;
    }
    PageViewTracker.lastActiveTimestamp = currentTimestamp;
  };
  PageViewTracker.lastActiveTimestamp = 0;
  PageViewTracker.idleDuration = 0;
  PageViewTracker.idleTimeoutDuration = 0;
  return PageViewTracker;
}(_BaseTracker__WEBPACK_IMPORTED_MODULE_0__.BaseTracker);

var Constants;
(function (Constants) {
  Constants[Constants["minEngagementTime"] = 1000] = "minEngagementTime";
})(Constants || (Constants = {}));

/***/ }),

/***/ "./lib-esm/tracker/ScrollTracker.js":
/*!******************************************!*\
  !*** ./lib-esm/tracker/ScrollTracker.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScrollTracker: () => (/* binding */ ScrollTracker)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _BaseTracker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseTracker */ "./lib-esm/tracker/BaseTracker.js");
/* harmony import */ var _PageViewTracker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageViewTracker */ "./lib-esm/tracker/PageViewTracker.js");
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../provider */ "./lib-esm/provider/index.js");
/* harmony import */ var _util_StorageUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/StorageUtil */ "./lib-esm/util/StorageUtil.js");





var ScrollTracker = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__extends)(ScrollTracker, _super);
  function ScrollTracker() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  ScrollTracker.prototype.init = function () {
    this.trackScroll = this.trackScroll.bind(this);
    var throttledTrackScroll = this.throttle(this.trackScroll, 100);
    document.addEventListener('scroll', throttledTrackScroll, {
      passive: true
    });
    var throttledMouseMove = this.throttle(this.onMouseMove, 100);
    document.addEventListener('mousemove', throttledMouseMove, {
      passive: true
    });
    this.isFirstTime = true;
  };
  ScrollTracker.prototype.enterNewPage = function () {
    this.isFirstTime = true;
  };
  ScrollTracker.prototype.trackScroll = function () {
    var _a;
    _PageViewTracker__WEBPACK_IMPORTED_MODULE_1__.PageViewTracker.updateIdleDuration();
    if (!this.context.configuration.isTrackScrollEvents) return;
    var scrollY = window.scrollY || document.documentElement.scrollTop;
    var ninetyPercentHeight = document.body.scrollHeight * 0.9;
    var viewedHeight = scrollY + window.innerHeight;
    if (scrollY > 0 && viewedHeight > ninetyPercentHeight && this.isFirstTime) {
      var engagementTime = new Date().getTime() - _util_StorageUtil__WEBPACK_IMPORTED_MODULE_3__.StorageUtil.getPreviousPageStartTime();
      this.provider.record({
        name: _provider__WEBPACK_IMPORTED_MODULE_2__.Event.PresetEvent.SCROLL,
        attributes: (_a = {}, _a[_provider__WEBPACK_IMPORTED_MODULE_2__.Event.ReservedAttribute.ENGAGEMENT_TIMESTAMP] = engagementTime, _a)
      });
      this.isFirstTime = false;
    }
  };
  ScrollTracker.prototype.onMouseMove = function () {
    _PageViewTracker__WEBPACK_IMPORTED_MODULE_1__.PageViewTracker.updateIdleDuration();
  };
  ScrollTracker.prototype.throttle = function (func, delay) {
    var timeout = null;
    return function () {
      var _this = this;
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (!timeout) {
        timeout = setTimeout(function () {
          func.apply(_this, args);
          timeout = null;
        }, delay);
      }
    };
  };
  return ScrollTracker;
}(_BaseTracker__WEBPACK_IMPORTED_MODULE_0__.BaseTracker);


/***/ }),

/***/ "./lib-esm/tracker/Session.js":
/*!************************************!*\
  !*** ./lib-esm/tracker/Session.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Session: () => (/* binding */ Session)
/* harmony export */ });
/* harmony import */ var _util_StorageUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/StorageUtil */ "./lib-esm/util/StorageUtil.js");

var Session = /** @class */function () {
  function Session(sessionId, sessionIndex, startTime, pauseTime) {
    if (pauseTime === void 0) {
      pauseTime = undefined;
    }
    this.isRecorded = false;
    this.sessionId = sessionId;
    this.sessionIndex = sessionIndex;
    this.startTime = startTime;
    this.pauseTime = pauseTime;
  }
  Session.createSession = function (uniqueId, sessionIndex) {
    return new Session(this.getSessionId(uniqueId), sessionIndex, new Date().getTime());
  };
  Session.prototype.isNewSession = function () {
    return this.pauseTime === undefined && !this.isRecorded;
  };
  Session.prototype.getDuration = function () {
    return new Date().getTime() - this.startTime;
  };
  Session.prototype.pause = function () {
    this.pauseTime = new Date().getTime();
  };
  Session.getCurrentSession = function (context, previousSession) {
    if (previousSession === void 0) {
      previousSession = null;
    }
    var session = previousSession;
    if (previousSession === null) {
      session = _util_StorageUtil__WEBPACK_IMPORTED_MODULE_0__.StorageUtil.getSession();
    }
    if (session !== null) {
      if (session.pauseTime === undefined || new Date().getTime() - session.pauseTime < context.configuration.sessionTimeoutDuration) {
        return session;
      } else {
        return Session.createSession(context.userUniqueId, session.sessionIndex + 1);
      }
    } else {
      return Session.createSession(context.userUniqueId, 1);
    }
  };
  Session.getSessionId = function (uniqueId) {
    var uniqueIdKey = uniqueId.slice(-Constants.maxUniqueIdLength);
    return "".concat(uniqueIdKey, "-").concat(this.getFormatTime());
  };
  Session.getFormatTime = function () {
    var now = new Date();
    var year = now.getUTCFullYear().toString().padStart(4, '0');
    var month = (now.getUTCMonth() + 1).toString().padStart(2, '0');
    var day = now.getUTCDate().toString().padStart(2, '0');
    var hours = now.getUTCHours().toString().padStart(2, '0');
    var minutes = now.getUTCMinutes().toString().padStart(2, '0');
    var seconds = now.getUTCSeconds().toString().padStart(2, '0');
    var milliseconds = now.getUTCMilliseconds().toString().padStart(3, '0');
    return "".concat(year).concat(month).concat(day, "-").concat(hours).concat(minutes).concat(seconds).concat(milliseconds);
  };
  return Session;
}();

var Constants;
(function (Constants) {
  Constants[Constants["maxUniqueIdLength"] = 8] = "maxUniqueIdLength";
})(Constants || (Constants = {}));

/***/ }),

/***/ "./lib-esm/tracker/SessionTracker.js":
/*!*******************************************!*\
  !*** ./lib-esm/tracker/SessionTracker.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SessionTracker: () => (/* binding */ SessionTracker)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @aws-amplify/core */ "../../node_modules/@aws-amplify/core/lib-esm/Logger/ConsoleLogger.js");
/* harmony import */ var _BaseTracker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseTracker */ "./lib-esm/tracker/BaseTracker.js");
/* harmony import */ var _PageViewTracker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageViewTracker */ "./lib-esm/tracker/PageViewTracker.js");
/* harmony import */ var _Session__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Session */ "./lib-esm/tracker/Session.js");
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../browser */ "./lib-esm/browser/index.js");
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../provider */ "./lib-esm/provider/index.js");
/* harmony import */ var _util_StorageUtil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/StorageUtil */ "./lib-esm/util/StorageUtil.js");








var logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_6__.ConsoleLogger('SessionTracker');
var SessionTracker = /** @class */function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__extends)(SessionTracker, _super);
  function SessionTracker() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.isWindowClosing = false;
    return _this;
  }
  SessionTracker.prototype.init = function () {
    this.onVisibilityChange = this.onVisibilityChange.bind(this);
    this.onBeforeUnload = this.onBeforeUnload.bind(this);
    this.handleInit();
    if (!this.checkEnv()) {
      logger.warn('not supported env');
    } else {
      document.addEventListener(this.visibilityChange, this.onVisibilityChange, false);
      window.addEventListener('beforeunload', this.onBeforeUnload, false);
    }
  };
  SessionTracker.prototype.onVisibilityChange = function () {
    if (document.visibilityState === this.hiddenStr) {
      this.onPageHide();
    } else {
      this.onPageAppear();
    }
  };
  SessionTracker.prototype.handleInit = function () {
    this.session = _Session__WEBPACK_IMPORTED_MODULE_2__.Session.getCurrentSession(this.context);
    if (_util_StorageUtil__WEBPACK_IMPORTED_MODULE_5__.StorageUtil.getIsFirstOpen()) {
      this.provider.record({
        name: _provider__WEBPACK_IMPORTED_MODULE_4__.Event.PresetEvent.FIRST_OPEN
      });
      _util_StorageUtil__WEBPACK_IMPORTED_MODULE_5__.StorageUtil.saveIsFirstOpenToFalse();
    }
    this.onPageAppear(true);
  };
  SessionTracker.prototype.onPageAppear = function (isFirstTime) {
    var _a;
    if (isFirstTime === void 0) {
      isFirstTime = false;
    }
    logger.debug('page appear');
    var pageViewTracker = this.provider.pageViewTracker;
    pageViewTracker.updateLastScreenStartTimestamp();
    if (!isFirstTime) {
      this.session = _Session__WEBPACK_IMPORTED_MODULE_2__.Session.getCurrentSession(this.context, this.session);
    }
    if (this.session.isNewSession()) {
      pageViewTracker.setIsEntrances();
      _util_StorageUtil__WEBPACK_IMPORTED_MODULE_5__.StorageUtil.clearPageInfo();
      this.provider.record({
        name: _provider__WEBPACK_IMPORTED_MODULE_4__.Event.PresetEvent.SESSION_START
      });
      this.session.isRecorded = true;
      if (!isFirstTime) {
        pageViewTracker.onPageChange();
      }
    }
    if (!this.provider.configuration.isTrackAppStartEvents) return;
    if (isFirstTime && this.isFromCurrentHost()) return;
    if (isFirstTime && _browser__WEBPACK_IMPORTED_MODULE_3__.BrowserInfo.isFromReload()) return;
    this.provider.record({
      name: _provider__WEBPACK_IMPORTED_MODULE_4__.Event.PresetEvent.APP_START,
      attributes: (_a = {}, _a[_provider__WEBPACK_IMPORTED_MODULE_4__.Event.ReservedAttribute.IS_FIRST_TIME] = isFirstTime, _a)
    });
  };
  SessionTracker.prototype.isFromCurrentHost = function () {
    return window.location.host === this.context.browserInfo.latestReferrerHost;
  };
  SessionTracker.prototype.onPageHide = function () {
    logger.debug('page hide');
    this.storeSession();
    _util_StorageUtil__WEBPACK_IMPORTED_MODULE_5__.StorageUtil.checkClickstreamId();
    var isImmediate = !(this.isWindowClosing && _browser__WEBPACK_IMPORTED_MODULE_3__.BrowserInfo.isFirefox());
    this.recordUserEngagement(isImmediate);
    this.recordAppEnd(isImmediate);
    this.provider.sendEventsInBackground(this.isWindowClosing);
  };
  SessionTracker.prototype.recordUserEngagement = function (isImmediate) {
    _PageViewTracker__WEBPACK_IMPORTED_MODULE_1__.PageViewTracker.updateIdleDuration();
    this.provider.pageViewTracker.recordUserEngagement(isImmediate);
  };
  SessionTracker.prototype.recordAppEnd = function (isImmediate) {
    if (!this.provider.configuration.isTrackAppEndEvents) return;
    this.provider.record({
      name: _provider__WEBPACK_IMPORTED_MODULE_4__.Event.PresetEvent.APP_END,
      isImmediate: isImmediate
    });
  };
  SessionTracker.prototype.onBeforeUnload = function () {
    logger.debug('onBeforeUnload');
    this.isWindowClosing = true;
  };
  SessionTracker.prototype.storeSession = function () {
    this.session.pause();
    _util_StorageUtil__WEBPACK_IMPORTED_MODULE_5__.StorageUtil.saveSession(this.session);
  };
  SessionTracker.prototype.checkEnv = function () {
    if (!document || !document.addEventListener) {
      logger.debug('not in the supported web environment');
      return false;
    }
    if (typeof document.hidden !== 'undefined') {
      this.hiddenStr = 'hidden';
      this.visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      this.hiddenStr = 'msHidden';
      this.visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      this.hiddenStr = 'webkitHidden';
      this.visibilityChange = 'webkitvisibilitychange';
    } else {
      logger.debug('not in the supported web environment');
      return false;
    }
    return true;
  };
  return SessionTracker;
}(_BaseTracker__WEBPACK_IMPORTED_MODULE_0__.BaseTracker);


/***/ }),

/***/ "./lib-esm/tracker/index.js":
/*!**********************************!*\
  !*** ./lib-esm/tracker/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PageViewTracker: () => (/* reexport safe */ _PageViewTracker__WEBPACK_IMPORTED_MODULE_2__.PageViewTracker),
/* harmony export */   Session: () => (/* reexport safe */ _Session__WEBPACK_IMPORTED_MODULE_1__.Session),
/* harmony export */   SessionTracker: () => (/* reexport safe */ _SessionTracker__WEBPACK_IMPORTED_MODULE_0__.SessionTracker)
/* harmony export */ });
/* harmony import */ var _SessionTracker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SessionTracker */ "./lib-esm/tracker/SessionTracker.js");
/* harmony import */ var _Session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Session */ "./lib-esm/tracker/Session.js");
/* harmony import */ var _PageViewTracker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PageViewTracker */ "./lib-esm/tracker/PageViewTracker.js");




/***/ }),

/***/ "./lib-esm/types/Analytics.js":
/*!************************************!*\
  !*** ./lib-esm/types/Analytics.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Attr: () => (/* binding */ Attr),
/* harmony export */   PageType: () => (/* binding */ PageType),
/* harmony export */   SendMode: () => (/* binding */ SendMode)
/* harmony export */ });
var SendMode;
(function (SendMode) {
  SendMode["Immediate"] = "Immediate";
  SendMode["Batch"] = "Batch";
})(SendMode || (SendMode = {}));
var PageType;
(function (PageType) {
  PageType["SPA"] = "SPA";
  PageType["multiPageApp"] = "multiPageApp";
})(PageType || (PageType = {}));
var Attr;
(function (Attr) {
  Attr["TRAFFIC_SOURCE_SOURCE"] = "_traffic_source_source";
  Attr["TRAFFIC_SOURCE_MEDIUM"] = "_traffic_source_medium";
  Attr["TRAFFIC_SOURCE_CAMPAIGN"] = "_traffic_source_campaign";
  Attr["TRAFFIC_SOURCE_CAMPAIGN_ID"] = "_traffic_source_campaign_id";
  Attr["TRAFFIC_SOURCE_TERM"] = "_traffic_source_term";
  Attr["TRAFFIC_SOURCE_CONTENT"] = "_traffic_source_content";
  Attr["TRAFFIC_SOURCE_CLID"] = "_traffic_source_clid";
  Attr["TRAFFIC_SOURCE_CLID_PLATFORM"] = "_traffic_source_clid_platform";
  Attr["VALUE"] = "_value";
  Attr["CURRENCY"] = "_currency";
})(Attr || (Attr = {}));

/***/ }),

/***/ "./lib-esm/types/Provider.js":
/*!***********************************!*\
  !*** ./lib-esm/types/Provider.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "./lib-esm/types/index.js":
/*!********************************!*\
  !*** ./lib-esm/types/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Attr: () => (/* reexport safe */ _Analytics__WEBPACK_IMPORTED_MODULE_1__.Attr),
/* harmony export */   PageType: () => (/* reexport safe */ _Analytics__WEBPACK_IMPORTED_MODULE_1__.PageType),
/* harmony export */   SendMode: () => (/* reexport safe */ _Analytics__WEBPACK_IMPORTED_MODULE_1__.SendMode)
/* harmony export */ });
/* harmony import */ var _Provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Provider */ "./lib-esm/types/Provider.js");
/* harmony import */ var _Analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Analytics */ "./lib-esm/types/Analytics.js");



/***/ }),

/***/ "./lib-esm/util/HashUtil.js":
/*!**********************************!*\
  !*** ./lib-esm/util/HashUtil.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HashUtil: () => (/* binding */ HashUtil)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _aws_crypto_sha256_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-crypto/sha256-browser */ "../../node_modules/@aws-crypto/sha256-browser/build/index.js");
/* harmony import */ var _aws_crypto_sha256_browser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_aws_crypto_sha256_browser__WEBPACK_IMPORTED_MODULE_0__);


var HashUtil = /** @class */function () {
  function HashUtil() {}
  HashUtil.getHashCode = function (str) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {
      var hash, result;
      return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            hash = new _aws_crypto_sha256_browser__WEBPACK_IMPORTED_MODULE_0__.Sha256();
            hash.update(str);
            return [4 /*yield*/, hash.digest()];
          case 1:
            result = _a.sent();
            return [2 /*return*/, this.uint8ArrayToHexString(result).substring(0, 8)];
        }
      });
    });
  };
  HashUtil.uint8ArrayToHexString = function (array) {
    return Array.from(array, function (_byte) {
      return _byte.toString(16).padStart(2, '0');
    }).join('');
  };
  return HashUtil;
}();


/***/ }),

/***/ "./lib-esm/util/MethodEmbed.js":
/*!*************************************!*\
  !*** ./lib-esm/util/MethodEmbed.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MethodEmbed: () => (/* binding */ MethodEmbed)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.mjs");

var MethodEmbed = /** @class */function () {
  function MethodEmbed(context, methodName) {
    this.context = context;
    this.methodName = methodName;
    this.originalMethod = context[methodName].bind(context);
  }
  MethodEmbed.add = function (context, methodName, methodOverride) {
    new MethodEmbed(context, methodName).set(methodOverride);
  };
  MethodEmbed.prototype.set = function (methodOverride) {
    var _this = this;
    this.context[this.methodName] = function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return methodOverride(_this.originalMethod.apply(_this, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args), false)));
    };
  };
  return MethodEmbed;
}();


/***/ }),

/***/ "./lib-esm/util/StorageUtil.js":
/*!*************************************!*\
  !*** ./lib-esm/util/StorageUtil.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StorageUtil: () => (/* binding */ StorageUtil)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-amplify/core */ "../../node_modules/@aws-amplify/core/lib-esm/Logger/ConsoleLogger.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ "../../node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../provider */ "./lib-esm/provider/index.js");
/* harmony import */ var _tracker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tracker */ "./lib-esm/tracker/index.js");




var logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_2__.ConsoleLogger('StorageUtil');
var StorageUtil = /** @class */function () {
  function StorageUtil() {}
  StorageUtil.getDeviceId = function () {
    if (StorageUtil.deviceId !== '') {
      return StorageUtil.deviceId;
    }
    var deviceId = localStorage.getItem(StorageUtil.deviceIdKey);
    if (deviceId === null) {
      deviceId = (0,uuid__WEBPACK_IMPORTED_MODULE_3__["default"])();
      localStorage.setItem(StorageUtil.deviceIdKey, deviceId);
    }
    StorageUtil.deviceId = deviceId;
    return deviceId;
  };
  StorageUtil.setCurrentUserUniqueId = function (userUniqueId) {
    StorageUtil.userUniqueId = userUniqueId;
    localStorage.setItem(StorageUtil.userUniqueIdKey, userUniqueId);
  };
  StorageUtil.getCurrentUserUniqueId = function () {
    if (StorageUtil.userUniqueId !== '') {
      return StorageUtil.userUniqueId;
    }
    var userUniqueId = localStorage.getItem(StorageUtil.userUniqueIdKey);
    if (userUniqueId === null) {
      userUniqueId = (0,uuid__WEBPACK_IMPORTED_MODULE_3__["default"])();
      StorageUtil.setCurrentUserUniqueId(userUniqueId);
      localStorage.setItem(StorageUtil.userUniqueIdKey, userUniqueId);
      StorageUtil.saveUserFirstTouchTimestamp();
    }
    StorageUtil.userUniqueId = userUniqueId;
    return userUniqueId;
  };
  StorageUtil.saveUserFirstTouchTimestamp = function () {
    var _b;
    var firstTouchTimestamp = new Date().getTime();
    localStorage.setItem(StorageUtil.userFirstTouchTimestampKey, String(firstTouchTimestamp));
    StorageUtil.updateUserAttributes((_b = {}, _b[_provider__WEBPACK_IMPORTED_MODULE_0__.Event.ReservedAttribute.USER_FIRST_TOUCH_TIMESTAMP] = {
      value: firstTouchTimestamp,
      set_timestamp: firstTouchTimestamp
    }, _b));
  };
  StorageUtil.saveUserIdMapping = function (userIdMappingObject) {
    localStorage.setItem(StorageUtil.userIdMappingKey, JSON.stringify(userIdMappingObject));
  };
  StorageUtil.getUserIdMapping = function () {
    return JSON.parse(localStorage.getItem(StorageUtil.userIdMappingKey));
  };
  StorageUtil.getUserInfoFromMapping = function (userId) {
    var _b, _c;
    var userIdMapping = StorageUtil.getUserIdMapping();
    var userInfo;
    var timestamp = new Date().getTime();
    if (userIdMapping === null) {
      userIdMapping = {};
      userInfo = (_b = {
        user_uniqueId: {
          value: StorageUtil.getCurrentUserUniqueId(),
          set_timestamp: timestamp
        }
      }, _b[_provider__WEBPACK_IMPORTED_MODULE_0__.Event.ReservedAttribute.USER_FIRST_TOUCH_TIMESTAMP] = StorageUtil.getAllUserAttributes()[_provider__WEBPACK_IMPORTED_MODULE_0__.Event.ReservedAttribute.USER_FIRST_TOUCH_TIMESTAMP], _b);
    } else if (userId in userIdMapping) {
      userInfo = userIdMapping[userId];
      StorageUtil.setCurrentUserUniqueId(userInfo.user_uniqueId.value.toString());
    } else {
      var userUniqueId = (0,uuid__WEBPACK_IMPORTED_MODULE_3__["default"])();
      StorageUtil.setCurrentUserUniqueId(userUniqueId);
      userInfo = (_c = {
        user_uniqueId: {
          value: userUniqueId,
          set_timestamp: timestamp
        }
      }, _c[_provider__WEBPACK_IMPORTED_MODULE_0__.Event.ReservedAttribute.USER_FIRST_TOUCH_TIMESTAMP] = {
        value: timestamp,
        set_timestamp: timestamp
      }, _c);
    }
    userIdMapping[userId] = userInfo;
    StorageUtil.saveUserIdMapping(userIdMapping);
    return userInfo;
  };
  StorageUtil.getBundleSequenceId = function () {
    var _b;
    return parseInt((_b = localStorage.getItem(StorageUtil.bundleSequenceIdKey)) !== null && _b !== void 0 ? _b : '1');
  };
  StorageUtil.saveBundleSequenceId = function (bundleSequenceId) {
    localStorage.setItem(StorageUtil.bundleSequenceIdKey, String(bundleSequenceId));
  };
  StorageUtil.updateUserAttributes = function (userAttributes) {
    localStorage.setItem(StorageUtil.userAttributesKey, JSON.stringify(userAttributes));
  };
  StorageUtil.getAllUserAttributes = function () {
    var _b;
    var userAttributes = (_b = localStorage.getItem(StorageUtil.userAttributesKey)) !== null && _b !== void 0 ? _b : '{}';
    return JSON.parse(userAttributes);
  };
  StorageUtil.getSimpleUserAttributes = function () {
    var _b;
    var allUserAttributes = StorageUtil.getAllUserAttributes();
    var simpleUserAttributes = (_b = {}, _b[_provider__WEBPACK_IMPORTED_MODULE_0__.Event.ReservedAttribute.USER_FIRST_TOUCH_TIMESTAMP] = allUserAttributes[_provider__WEBPACK_IMPORTED_MODULE_0__.Event.ReservedAttribute.USER_FIRST_TOUCH_TIMESTAMP], _b);
    if (allUserAttributes[_provider__WEBPACK_IMPORTED_MODULE_0__.Event.ReservedAttribute.USER_ID] !== undefined) {
      simpleUserAttributes[_provider__WEBPACK_IMPORTED_MODULE_0__.Event.ReservedAttribute.USER_ID] = allUserAttributes[_provider__WEBPACK_IMPORTED_MODULE_0__.Event.ReservedAttribute.USER_ID];
    }
    return simpleUserAttributes;
  };
  StorageUtil.getFailedEvents = function () {
    var _b;
    return (_b = localStorage.getItem(StorageUtil.failedEventsKey)) !== null && _b !== void 0 ? _b : '';
  };
  StorageUtil.saveFailedEvent = function (event) {
    var MAX_FAILED_EVENTS_SIZE = StorageUtil.MAX_FAILED_EVENTS_SIZE;
    var allEvents = StorageUtil.getFailedEvents();
    var eventsStr = '';
    if (allEvents === '') {
      eventsStr = _provider__WEBPACK_IMPORTED_MODULE_0__.Event.Constants.PREFIX + JSON.stringify(event);
    } else {
      eventsStr = allEvents + ',' + JSON.stringify(event);
    }
    if (eventsStr.length <= MAX_FAILED_EVENTS_SIZE) {
      localStorage.setItem(StorageUtil.failedEventsKey, eventsStr);
    } else {
      var maxSize = MAX_FAILED_EVENTS_SIZE / 1024;
      logger.warn("Failed events reached max cache size of ".concat(maxSize, "kb"));
    }
  };
  StorageUtil.clearFailedEvents = function () {
    localStorage.removeItem(StorageUtil.failedEventsKey);
  };
  StorageUtil.getAllEvents = function () {
    var _b;
    return (_b = localStorage.getItem(StorageUtil.eventsKey)) !== null && _b !== void 0 ? _b : '';
  };
  StorageUtil.saveEvent = function (event) {
    var MAX_BATCH_EVENTS_SIZE = StorageUtil.MAX_BATCH_EVENTS_SIZE;
    var allEvents = StorageUtil.getAllEvents();
    var eventsStr = '';
    if (allEvents === '') {
      eventsStr = _provider__WEBPACK_IMPORTED_MODULE_0__.Event.Constants.PREFIX + JSON.stringify(event);
    } else {
      eventsStr = allEvents + ',' + JSON.stringify(event);
    }
    if (eventsStr.length <= MAX_BATCH_EVENTS_SIZE) {
      localStorage.setItem(StorageUtil.eventsKey, eventsStr);
      return true;
    } else {
      var maxSize = MAX_BATCH_EVENTS_SIZE / 1024;
      logger.warn("Events reached max cache size of ".concat(maxSize, "kb"));
      return false;
    }
  };
  StorageUtil.clearEvents = function (eventsJson) {
    var eventsString = this.getAllEvents();
    if (eventsString === '') return;
    var deletedEvents = JSON.parse(eventsJson);
    var allEvents = JSON.parse(this.getAllEvents() + _provider__WEBPACK_IMPORTED_MODULE_0__.Event.Constants.SUFFIX);
    if (allEvents.length > deletedEvents.length) {
      var leftEvents = allEvents.splice(deletedEvents.length);
      var leftEventsStr = JSON.stringify(leftEvents);
      leftEventsStr = leftEventsStr.substring(0, leftEventsStr.length - 1);
      localStorage.setItem(StorageUtil.eventsKey, leftEventsStr);
    } else {
      localStorage.removeItem(StorageUtil.eventsKey);
    }
  };
  StorageUtil.clearAllEvents = function () {
    localStorage.removeItem(StorageUtil.eventsKey);
  };
  StorageUtil.saveSession = function (session) {
    localStorage.setItem(StorageUtil.sessionKey, JSON.stringify(session));
  };
  StorageUtil.getSession = function () {
    var sessionStr = localStorage.getItem(StorageUtil.sessionKey);
    if (sessionStr === null) {
      return null;
    }
    var sessionObject = JSON.parse(sessionStr);
    return new _tracker__WEBPACK_IMPORTED_MODULE_1__.Session(sessionObject.sessionId, sessionObject.sessionIndex, sessionObject.startTime, sessionObject.pauseTime);
  };
  StorageUtil.getIsFirstOpen = function () {
    return localStorage.getItem(StorageUtil.isFirstOpenKey) === null;
  };
  StorageUtil.saveIsFirstOpenToFalse = function () {
    localStorage.setItem(StorageUtil.isFirstOpenKey, '0');
  };
  StorageUtil.clearPageInfo = function () {
    localStorage.setItem(StorageUtil.previousPageUrlKey, '');
    localStorage.setItem(StorageUtil.previousPageTitleKey, '');
  };
  StorageUtil.getPreviousPageUrl = function () {
    var _b;
    return (_b = localStorage.getItem(StorageUtil.previousPageUrlKey)) !== null && _b !== void 0 ? _b : '';
  };
  StorageUtil.savePreviousPageUrl = function (url) {
    localStorage.setItem(StorageUtil.previousPageUrlKey, url);
  };
  StorageUtil.getPreviousPageTitle = function () {
    var _b;
    return (_b = localStorage.getItem(StorageUtil.previousPageTitleKey)) !== null && _b !== void 0 ? _b : '';
  };
  StorageUtil.savePreviousPageTitle = function (title) {
    localStorage.setItem(StorageUtil.previousPageTitleKey, title);
  };
  StorageUtil.getPreviousPageStartTime = function () {
    var startTime = localStorage.getItem(StorageUtil.previousPageStartTimeKey);
    if (startTime === null) {
      return 0;
    } else {
      return Number(startTime);
    }
  };
  StorageUtil.savePreviousPageStartTime = function (timestamp) {
    localStorage.setItem(StorageUtil.previousPageStartTimeKey, timestamp.toString());
  };
  StorageUtil.checkDeviceId = function () {
    var _b;
    var currentDeviceId = (_b = localStorage.getItem(StorageUtil.deviceIdKey)) !== null && _b !== void 0 ? _b : '';
    if (StorageUtil.deviceId !== '' && currentDeviceId === '') {
      localStorage.setItem(StorageUtil.deviceIdKey, StorageUtil.deviceId);
    }
  };
  StorageUtil.checkUserUniqueId = function () {
    var _b;
    var currentUserUniqueId = (_b = localStorage.getItem(StorageUtil.userUniqueIdKey)) !== null && _b !== void 0 ? _b : '';
    if (StorageUtil.userUniqueId !== '' && currentUserUniqueId === '') {
      localStorage.setItem(StorageUtil.userUniqueIdKey, StorageUtil.userUniqueId);
    }
  };
  StorageUtil.checkIsFirstOpen = function () {
    if (StorageUtil.getIsFirstOpen()) {
      StorageUtil.saveIsFirstOpenToFalse();
    }
  };
  StorageUtil.checkClickstreamId = function () {
    StorageUtil.checkDeviceId();
    StorageUtil.checkUserUniqueId();
    StorageUtil.checkIsFirstOpen();
  };
  StorageUtil.clearAll = function () {
    localStorage.clear();
    StorageUtil.deviceid = '';
    StorageUtil.userUniqueId = '';
  };
  var _a;
  _a = StorageUtil;
  StorageUtil.MAX_REQUEST_EVENTS_SIZE = 1024 * 512;
  StorageUtil.MAX_FAILED_EVENTS_SIZE = _a.MAX_REQUEST_EVENTS_SIZE;
  StorageUtil.MAX_BATCH_EVENTS_SIZE = 1024 * 1024;
  StorageUtil.prefix = 'aws-solution/clickstream-web/';
  StorageUtil.deviceIdKey = _a.prefix + 'deviceIdKey';
  StorageUtil.userUniqueIdKey = _a.prefix + 'userUniqueIdKey';
  StorageUtil.bundleSequenceIdKey = _a.prefix + 'bundleSequenceIdKey';
  StorageUtil.userAttributesKey = _a.prefix + 'userAttributesKey';
  StorageUtil.userFirstTouchTimestampKey = _a.prefix + 'userFirstTouchTimestampKey';
  StorageUtil.failedEventsKey = _a.prefix + 'failedEventsKey';
  StorageUtil.eventsKey = _a.prefix + 'eventsKey';
  StorageUtil.sessionKey = _a.prefix + 'sessionKey';
  StorageUtil.isFirstOpenKey = _a.prefix + 'isFirstOpenKey';
  StorageUtil.previousPageUrlKey = _a.prefix + 'previousPageUrlKey';
  StorageUtil.previousPageTitleKey = _a.prefix + 'previousPageTitleKey';
  StorageUtil.previousPageStartTimeKey = _a.prefix + 'previousPageStartTimeKey';
  StorageUtil.userIdMappingKey = _a.prefix + 'userIdMappingKey';
  StorageUtil.deviceId = '';
  StorageUtil.userUniqueId = '';
  return StorageUtil;
}();


/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/native.js":
/*!**********************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/native.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/regex.js":
/*!*********************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/regex.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/rng.js":
/*!*******************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/rng.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/stringify.js":
/*!*************************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "../../node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/v4.js":
/*!******************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/v4.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "../../node_modules/uuid/dist/esm-browser/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "../../node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "../../node_modules/uuid/dist/esm-browser/stringify.js");




function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/validate.js":
/*!************************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/validate.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "../../node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),

/***/ "../../node_modules/tslib/tslib.es6.mjs":
/*!**********************************************!*\
  !*** ../../node_modules/tslib/tslib.es6.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addDisposableResource: () => (/* binding */ __addDisposableResource),
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldIn: () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __disposeResources: () => (/* binding */ __disposeResources),
/* harmony export */   __esDecorate: () => (/* binding */ __esDecorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __propKey: () => (/* binding */ __propKey),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __rewriteRelativeImportExtension: () => (/* binding */ __rewriteRelativeImportExtension),
/* harmony export */   __runInitializers: () => (/* binding */ __runInitializers),
/* harmony export */   __setFunctionName: () => (/* binding */ __setFunctionName),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
  function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
  function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

var ownKeys = function(o) {
  ownKeys = Object.getOwnPropertyNames || function (o) {
    var ar = [];
    for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
    return ar;
  };
  return ownKeys(o);
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  var r, s = 0;
  function next() {
    while (r = env.stack.pop()) {
      try {
        if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
        if (r.dispose) {
          var result = r.dispose.call(r.value);
          if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
        }
        else s |= 1;
      }
      catch (e) {
        fail(e);
      }
    }
    if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
    if (env.hasError) throw env.error;
  }
  return next();
}

function __rewriteRelativeImportExtension(path, preserveJsx) {
  if (typeof path === "string" && /^\.\.?\//.test(path)) {
      return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
          return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
      });
  }
  return path;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __esDecorate,
  __runInitializers,
  __propKey,
  __setFunctionName,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
  __rewriteRelativeImportExtension,
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./lib-esm/index.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Attr: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_1__.Attr),
/* harmony export */   ClickstreamAnalytics: () => (/* reexport safe */ _ClickstreamAnalytics__WEBPACK_IMPORTED_MODULE_0__.ClickstreamAnalytics),
/* harmony export */   PageType: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_1__.PageType),
/* harmony export */   SendMode: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_1__.SendMode)
/* harmony export */ });
/* harmony import */ var _ClickstreamAnalytics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClickstreamAnalytics */ "./lib-esm/ClickstreamAnalytics.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./lib-esm/types/index.js");


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=stack9-web-analytics-sdk.js.map