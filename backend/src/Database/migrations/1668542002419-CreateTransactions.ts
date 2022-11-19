import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransactions1668542002419 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
