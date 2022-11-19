import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("accounts")
export abstract class Account {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  balance: number;
}
