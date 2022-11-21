"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameExists = exports.UserNotFound = exports.InvalidUsername = exports.InvalidPassword = exports.InvalidCredentials = void 0;
const customError_1 = require("./customError");
class InvalidCredentials extends customError_1.CustomError {
    constructor() {
        super(422, "Password invalid.");
    }
}
exports.InvalidCredentials = InvalidCredentials;
class InvalidPassword extends customError_1.CustomError {
    constructor() {
        super(422, "The password must contain a minimum of 8 characters, a number and a capital letter.");
    }
}
exports.InvalidPassword = InvalidPassword;
class InvalidUsername extends customError_1.CustomError {
    constructor() {
        super(422, "The username must contain a minimum of 3 characters.");
    }
}
exports.InvalidUsername = InvalidUsername;
class UserNotFound extends customError_1.CustomError {
    constructor() {
        super(404, "User not found.");
    }
}
exports.UserNotFound = UserNotFound;
class UsernameExists extends customError_1.CustomError {
    constructor() {
        super(400, "Already exists an user with that username, it has to be unique.");
    }
}
exports.UsernameExists = UsernameExists;
