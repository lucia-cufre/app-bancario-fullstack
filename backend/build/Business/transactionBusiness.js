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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsBusiness = void 0;
const data_source_1 = require("./../Database/data-source");
const generalErrors_1 = require("./../Error/generalErrors");
const transaction_1 = require("../Entities/transaction");
const customError_1 = require("../Error/customError");
const instances_1 = require("../Services/instances");
const dayjs_1 = __importDefault(require("dayjs"));
class TransactionsBusiness {
    constructor() {
        this.createTransaction = (input, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, value } = input;
                if (!username || !value) {
                    throw new generalErrors_1.MissingCredentials();
                }
                const data = instances_1.tokenGenerator.tokenData(token);
                yield instances_1.functions.isValidTransaction(value, data.id, username);
            }
            catch (error) {
                throw new customError_1.CustomError(400, error.message);
            }
        });
        this.getTransactions = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = instances_1.tokenGenerator.tokenData(token);
                const user = yield instances_1.functions.findUserById(data.id);
                if (user.id !== data.id) {
                    throw new generalErrors_1.Unauthorized();
                }
                const id = user.accountId;
                const movement = yield data_source_1.AppDataSource.getRepository(transaction_1.Transactions).find({
                    where: [
                        {
                            debitedAccountId: id,
                        },
                        {
                            creditedAccountId: id,
                        },
                    ],
                    order: {
                        createdAt: "DESC",
                    },
                });
                if (!movement) {
                    throw new Error("It wasn't possible obtain the history");
                }
                const transactions = movement.map((data) => {
                    var localizedFormat = require("dayjs/plugin/localizedFormat");
                    dayjs_1.default.extend(localizedFormat);
                    const date = (0, dayjs_1.default)(data.createdAt).format("L");
                    const newObject = {
                        id: data.id,
                        creditAccount: data.creditedAccountId,
                        debitAccount: data.debitedAccountId,
                        value: data.value,
                        createdAt: date,
                    };
                    return newObject;
                });
                return transactions;
            }
            catch (error) {
                throw new customError_1.CustomError(400, error.message);
            }
        });
        this.getFilteredTransactions = (token, input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = instances_1.tokenGenerator.tokenData(token);
                const filter = input;
                if (filter !== "debit" && filter !== "credit") {
                    throw new Error("debit and credit are the values for filter.");
                }
                const user = yield instances_1.functions.findUserById(data.id);
                if (user.id !== data.id) {
                    throw new generalErrors_1.Unauthorized();
                }
                const id = user.accountId;
                const movementDebit = yield data_source_1.AppDataSource.getRepository(transaction_1.Transactions).find({
                    where: {
                        debitedAccountId: id,
                    },
                    order: {
                        createdAt: "DESC",
                    },
                });
                const debitTransaction = movementDebit.map((data) => {
                    var localizedFormat = require("dayjs/plugin/localizedFormat");
                    dayjs_1.default.extend(localizedFormat);
                    const date = (0, dayjs_1.default)(data.createdAt).format("L");
                    const newObject = {
                        id: data.id,
                        creditAccount: data.creditedAccountId,
                        debitAccount: data.debitedAccountId,
                        value: data.value,
                        createdAt: date,
                    };
                    return newObject;
                });
                const movementCredit = yield data_source_1.AppDataSource.getRepository(transaction_1.Transactions).find({
                    where: {
                        creditedAccountId: id,
                    },
                    order: {
                        createdAt: "DESC",
                    },
                });
                const creditTransaction = movementCredit.map((data) => {
                    var localizedFormat = require("dayjs/plugin/localizedFormat");
                    dayjs_1.default.extend(localizedFormat);
                    const date = (0, dayjs_1.default)(data.createdAt).format("L");
                    const newObject = {
                        id: data.id,
                        creditAccount: data.creditedAccountId,
                        debitAccount: data.debitedAccountId,
                        value: data.value,
                        createdAt: date,
                    };
                    return newObject;
                });
                if (filter === "debit") {
                    return debitTransaction;
                }
                else {
                    return creditTransaction;
                }
            }
            catch (error) {
                throw new customError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.TransactionsBusiness = TransactionsBusiness;
