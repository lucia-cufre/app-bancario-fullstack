"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = exports.MissingCredentials = void 0;
const customError_1 = require("./customError");
class MissingCredentials extends customError_1.CustomError {
    constructor() {
        super(422, "All fields must be filled");
    }
}
exports.MissingCredentials = MissingCredentials;
class Unauthorized extends customError_1.CustomError {
    constructor() {
        super(401, "Unauthorized user.");
    }
}
exports.Unauthorized = Unauthorized;
