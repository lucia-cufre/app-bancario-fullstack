"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userBusiness_1 = require("./../Business/userBusiness");
const userBusiness = new userBusiness_1.UserBusiness();
class UserController {
    constructor() {
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = {
                    username,
                    password,
                };
                yield userBusiness.signUp(user);
                res.status(201).send({ message: "User created." });
            }
            catch (error) {
                res
                    .status(error.statusCode || 400)
                    .send(error.message || error.sqlMessage);
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = {
                    username,
                    password,
                };
                const token = yield userBusiness.login(user);
                res.status(200).send({ access_token: token });
            }
            catch (error) {
                res
                    .status(error.statusCode || 400)
                    .send(error.message || error.sqlMessage);
            }
        });
        this.getBalance = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const balance = yield userBusiness.getBalance(token);
                res.status(200).send({ balance });
            }
            catch (error) {
                res
                    .status(error.statusCode || 400)
                    .send(error.message || error.sqlMessage);
            }
        });
    }
}
exports.UserController = UserController;
