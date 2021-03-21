"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseGetMe = void 0;
const hrRequest_1 = require("../hrRequest");
const baseGetMe = (token) => {
    return hrRequest_1.hrRequest(token).get("/users/me");
};
exports.baseGetMe = baseGetMe;
