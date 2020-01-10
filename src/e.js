"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var make_error_1 = require("make-error");
var E = /** @class */ (function (_super) {
    __extends(E, _super);
    function E() {
        var argS = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argS[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        /**
         * Error chain from inheritance.
         * @example [ 'e', 'external', 'invalid_api_argument' ]
         */
        _this.chain = [];
        _this.init.apply(_this, argS);
        return _this;
        // this.name = this.constructor.name
        // Error.captureStackTrace(this, this.constructor)
    }
    E.prototype.init = function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        var a0 = a[0];
        switch (a.length) {
            case 1:
                switch (typeof a0) {
                    case 'string':
                        this.message = a0;
                        break;
                    case 'object':
                        this.fill(a0);
                        break;
                }
                break;
            case 2:
                var a1 = a[1];
                this.message = a0;
                switch (typeof a1) {
                    case 'string':
                        this.solution = a1;
                        break;
                    case 'object':
                        this.fill(a1);
                        break;
                }
                break;
        }
        // this.stack = (new Error()).stack
        this.generate_chain();
        this.generate_echain();
    };
    /**
     * Generate error chain based on inheritance
     * @param ins
     * @param echain
     */
    E.prototype.generate_chain = function (ins) {
        if (ins === void 0) { ins = undefined; }
        if (ins === undefined) {
            ins = this;
        }
        ins = Object.getPrototypeOf(ins);
        var name = ins.constructor.name.toLowerCase();
        this.chain.unshift(name);
        if (ins.constructor === E || !ins.constructor) {
            return;
        }
        return this.generate_chain(ins);
    };
    /**
     * Generate and get echain string
     * @returns {string}
     */
    E.prototype.generate_echain = function () {
        if (!this.echain) {
            this.echain = this.chain.join('.');
        }
        return this.echain;
    };
    /**
     * Fill `this` with a another object
     * @param obj
     */
    E.prototype.fill = function (obj) {
        for (var key in obj) {
            this[key] = obj[key];
        }
    };
    return E;
}(make_error_1.BaseError));
exports.E = E;
// // @ts-ignore
// E.prototype = new Error
// // @ts-ignore
// E.prototype.name = 'E'
//# sourceMappingURL=e.js.map