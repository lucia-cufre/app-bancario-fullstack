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
exports.TransactionController = void 0;
const transactionBusiness_1 = require("./../Business/transactionBusiness");
const transactionBusiness = new transactionBusiness_1.TransactionsBusiness();
class TransactionController {
    constructor() {
        this.createTransaction = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, value } = req.body;
                const token = req.headers.authorization;
                const transaction = {
                    username,
                    value,
                };
                yield transactionBusiness.createTransaction(transaction, token);
                res.status(201).send({ message: "Transaction done!" });
            }
            catch (error) {
                res
                    .status(error.statusCode || 400)
                    .send(error.message || error.sqlMessage);
            }
        });
        this.getTransactions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const transactions = yield transactionBusiness.getTransactions(token);
                res.status(200).send({ transactions });
            }
            catch (error) {
                res
                    .status(error.statusCode || 400)
                    .send(error.message || error.sqlMessage);
            }
        });
        this.getFilteredTransactions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const filter = req.query.sort;
                const transactions = yield transactionBusiness.getFilteredTransactions(token, filter);
                res.status(200).send({ transactions });
            }
            catch (error) {
                res
                    .status(error.statusCode || 400)
                    .send(error.message || error.sqlMessage);
            }
        });
    }
}
exports.TransactionController = TransactionController;
