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
exports.UserBusiness = void 0;
const passwordValidation_1 = require("./../Services/passwordValidation");
const account_1 = require("./../Entities/account");
const generalErrors_1 = require("./../Error/generalErrors");
const userError_1 = require("./../Error/userError");
const customError_1 = require("./../Error/customError");
const data_source_1 = require("./../Database/data-source");
const user_1 = require("../Entities/user");
const instances_1 = require("../Services/instances");
class UserBusiness {
    constructor() {
        this.signUp = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = input;
                if (!username || !password) {
                    throw new generalErrors_1.MissingCredentials();
                }
                const findUserExist = yield instances_1.functions.findUserByUsername(username);
                if (findUserExist) {
                    throw new userError_1.UsernameExists();
                }
                if (username.length < 3) {
                    throw new userError_1.InvalidUsername();
                }
                const passwordValidation = (0, passwordValidation_1.regexPassword)();
                if (passwordValidation.test(password) !== true) {
                    throw new userError_1.InvalidPassword();
                }
                const hashPassword = yield instances_1.hashManager.hash(password);
                const id = instances_1.idGenerator.generateId();
                const account = data_source_1.AppDataSource.manager.create(account_1.Account, {
                    id: id,
                    balance: 100,
                });
                const user = data_source_1.AppDataSource.manager.create(user_1.User, {
                    id,
                    username,
                    password: hashPassword,
                    accountId: account.id,
                });
                yield data_source_1.AppDataSource.manager.save(account);
                yield data_source_1.AppDataSource.manager.save(user);
            }
            catch (error) {
                throw new customError_1.CustomError(400, error.message);
            }
        });
        this.login = (input) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = input;
            if (!username || !password) {
                throw new generalErrors_1.MissingCredentials();
            }
            const user = yield instances_1.functions.findUserByUsername(username);
            if (!user) {
                throw new userError_1.UserNotFound();
            }
            const isPasswordCorrect = yield instances_1.hashManager.compare(password, user.password);
            if (!isPasswordCorrect) {
                throw new userError_1.InvalidCredentials();
            }
            const token = instances_1.tokenGenerator.generateToken(user.id);
            const validToken = instances_1.tokenGenerator.tokenData(token);
            if (validToken.id !== user.id) {
                throw new generalErrors_1.Unauthorized();
            }
            return token;
        });
        this.getBalance = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = instances_1.tokenGenerator.tokenData(token);
                const account = yield data_source_1.AppDataSource.getRepository(user_1.User).findOne({
                    relations: {
                        account: true,
                    },
                    where: {
                        id: data.id,
                    },
                });
                if (!account) {
                    throw new userError_1.UserNotFound();
                }
                if (account.id !== data.id) {
                    throw new generalErrors_1.Unauthorized();
                }
                return account.account;
            }
            catch (error) {
                throw new customError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.UserBusiness = UserBusiness;
