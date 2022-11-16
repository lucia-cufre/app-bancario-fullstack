import { IdGenerator } from './../Services/idGenerator';
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
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  debitedAccountId: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: "debitedAccountId" })
  debitAccount: Account;

  @Column()
  creditedAccountId: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: "creditedAccountId" })
  creditAccount: Account;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  constructor(){
    const createId = new IdGenerator()
    if(!this.id){
      this.id = createId.generateId()
    }
  }
}
