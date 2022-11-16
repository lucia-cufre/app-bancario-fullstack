import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsers1668541425792 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
     await queryRunner.createTable(
        new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "username",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "password",
                    type: "varchar"
                },
                {
                    name:"accountId",
                    type:"uuid"
                }
            ],
            foreignKeys: [
                {
                    name:"fk_account_id",
                    columnNames: ["accountId"],
                    referencedTableName:"accounts",
                    referencedColumnNames: ["id"]
                }
            ]
        })
     )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
