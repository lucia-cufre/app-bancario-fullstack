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
exports.CreateTransactions1668542002419 = void 0;
const typeorm_1 = require("typeorm");
class CreateTransactions1668542002419 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "transactions",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "debitedAccountId",
                        type: "uuid",
                    },
                    {
                        name: "creditedAccountId",
                        type: "uuid",
                    },
                    {
                        name: "value",
                        type: "decimal",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "fk_debited_id",
                        columnNames: ["debitedAccountId"],
                        referencedTableName: "accounts",
                        referencedColumnNames: ["id"],
                    },
                    {
                        name: "fk_credited_id",
                        columnNames: ["creditedAccountId"],
                        referencedTableName: "accounts",
                        referencedColumnNames: ["id"],
                    },
                ],
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.CreateTransactions1668542002419 = CreateTransactions1668542002419;
