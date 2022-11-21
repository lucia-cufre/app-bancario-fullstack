"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions = void 0;
const account_1 = require("./account");
const typeorm_1 = require("typeorm");
let Transactions = class Transactions {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Transactions.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transactions.prototype, "debitedAccountId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_1.Account, (account) => account.id),
    (0, typeorm_1.JoinColumn)({ name: "debitedAccountId" }),
    __metadata("design:type", account_1.Account)
], Transactions.prototype, "debitAccount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transactions.prototype, "creditedAccountId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_1.Account, (account) => account.id),
    (0, typeorm_1.JoinColumn)({ name: "creditedAccountId" }),
    __metadata("design:type", account_1.Account)
], Transactions.prototype, "creditAccount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Transactions.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Transactions.prototype, "createdAt", void 0);
Transactions = __decorate([
    (0, typeorm_1.Entity)("transactions")
], Transactions);
exports.Transactions = Transactions;
