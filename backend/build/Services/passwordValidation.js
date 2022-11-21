"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexPassword = void 0;
const regexPassword = () => {
    return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,35}$/;
};
exports.regexPassword = regexPassword;
