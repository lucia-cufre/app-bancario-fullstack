import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  balance: number;
}
