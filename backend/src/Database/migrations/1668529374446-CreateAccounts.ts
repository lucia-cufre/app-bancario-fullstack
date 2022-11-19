import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAccounts1668529374446 implements MigrationInterface  {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "accounts",
                columns: [
                    {
                        name: "id",
                        type:"uuid",
                        isPrimary: true
                    },
                    {
                        name:"balance",
                        type: "decimal"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE accounts ALTER COLUMN balance default 1000`)
    }

}
