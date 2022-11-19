import { IdGenerator } from "./../Services/idGenerator";
import { Account } from "./account";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("transactions")
export class Transactions {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  debitedAccountId: string;

  @ManyToOne(() => Account, (account) => account.id)
  @JoinColumn({ name: "debitedAccountId" })
  debitAccount: Account;

  @Column()
  creditedAccountId: string;

  @ManyToOne(() => Account, (account) => account.id)
  @JoinColumn({ name: "creditedAccountId" })
  creditAccount: Account;

  @Column()
  value: number;

  @CreateDateColumn()
  @Column()
  createdAt: Date;
}
