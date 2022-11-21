"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticated = void 0;
const instances_1 = require("./../Services/instances");
function authenticated(request, response, next) {
    const authentication = request.headers.authorization;
    const accessToken = instances_1.tokenGenerator.tokenData(authentication);
    if (accessToken === null)
        return response.status(400).json({ message: "invalid token" });
    return next();
}
exports.authenticated = authenticated;
