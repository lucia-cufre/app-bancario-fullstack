"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutOfCash = void 0;
const customError_1 = require("./customError");
class OutOfCash extends customError_1.CustomError {
    constructor() {
        super(400, "Insufficient balance.");
    }
}
exports.OutOfCash = OutOfCash;
