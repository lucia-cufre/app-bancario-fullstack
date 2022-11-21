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
exports.Functions = void 0;
const data_source_1 = require("../Database/data-source");
const transactionError_1 = require("../Error/transactionError");
const account_1 = require("../Entities/account");
const user_1 = require("../Entities/user");
const userError_1 = require("../Error/userError");
const instances_1 = require("./instances");
const transaction_1 = require("../Entities/transaction");
const customError_1 = require("../Error/customError");
const generalErrors_1 = require("../Error/generalErrors");
class Functions extends user_1.User {
    constructor() {
        super(...arguments);
        this.findUserByUsername = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield data_source_1.AppDataSource.getRepository(user_1.User).findOne({
                    select: ["id", "username", "password", "accountId"],
                    where: {
                        username: input,
                    },
                });
                return user;
            }
            catch (error) {
                throw new customError_1.CustomError(400, error.message);
            }
        });
        this.findUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield data_source_1.AppDataSource.getRepository(user_1.User).findOne({
                    where: {
                        id: id,
                    },
                });
                if (!user) {
                    throw new userError_1.UserNotFound();
                }
                return user;
            }
            catch (error) {
                throw new customError_1.CustomError(400, error.message);
            }
        });
        this.findBalanceById = (accountId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield data_source_1.AppDataSource.getRepository(account_1.Account).findOne({
                    select: ["balance"],
                    where: {
                        id: accountId,
                    },
                });
                if (!account) {
                    throw new userError_1.UserNotFound();
                }
                const result = account.balance;
                return result;
            }
            catch (error) {
                throw new customError_1.CustomError(400, error.message);
            }
        });
        this.debited = (id, value) => __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = data_source_1.AppDataSource.getRepository(account_1.Account);
                const user = yield this.findUserById(id);
                const account = yield repository.findOne({
                    where: {
                        id: user.accountId,
                    },
                });
                if (!account) {
                    throw new Error("Account does not exists.");
                }
                const newBalance = account.balance - value;
                const result = yield repository
                    .createQueryBuilder()
                    .update({
                    balance: newBalance,
                })
                    .where({ id: user.accountId })
                    .execute();
                return result;
            }
            catch (error) {
                throw new customError_1.CustomError(400, error.message);
            }
        });
        this.credited = (username, value) => __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = data_source_1.AppDataSource.getRepository(account_1.Account);
                const user = yield this.findUserByUsername(username);
                if (!user) {
                    throw new userError_1.UserNotFound();
                }
                const account = yield repository.findOne({
                    where: {
                        id: user.accountId,
                    },
                });
                if (!account) {
                    throw new Error("Account does not exists.");
                }
                const newBalance = Number(account.balance) + Number(value);
                const result = yield repository
                    .createQueryBuilder()
                    .update({
                    balance: newBalance,
                })
                    .where({ id: user.accountId })
                    .execute();
                return result;
            }
            catch (error) {
                throw new customError_1.CustomError(400, error.message);
            }
        });
        this.transaction = (id, username, value) => __awaiter(this, void 0, void 0, function* () {
            try {
                const transactionId = instances_1.idGenerator.generateId();
                const userDebit = yield this.findUserById(id);
                const userCredit = yield this.findUserByUsername(username);
                if (!userCredit) {
                    throw new userError_1.UserNotFound();
                }
                if (userDebit.id === userCredit.id) {
                    throw new Error("Is not possible make a transaction to yourself.");
                }
                if (userDebit.id !== id) {
                    throw new generalErrors_1.Unauthorized();
                }
                const transaction = data_source_1.AppDataSource.getRepository(transaction_1.Transactions).create({
                    id: transactionId,
                    debitedAccountId: userDebit.accountId,
                    creditedAccountId: userCredit.accountId,
                    value: value,
                });
                yield data_source_1.AppDataSource.getRepository(transaction_1.Transactions).save(transaction);
            }
            catch (error) {
                throw new customError_1.CustomError(400, error.message);
            }
        });
        this.isValidTransaction = (value, id, username) => __awaiter(this, void 0, void 0, function* () {
            try {
                const balance = yield this.findBalanceById(id);
                if (value <= 0)
                    throw new Error("Invalid value");
                if (balance <= 0 || value > balance) {
                    throw new transactionError_1.OutOfCash();
                }
                this.debited(id, value);
                this.credited(username, value);
                this.transaction(id, username, value);
            }
            catch (error) {
                throw new customError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.Functions = Functions;
