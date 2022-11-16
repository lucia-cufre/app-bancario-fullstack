import { IdGenerator } from './../Services/idGenerator';
import { Account } from "./account";
import { Length } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Length(3, 35, {
    message:
      "The name must contain a minimum of 4 characters.",
  })
  username: string;

  @Column()
  @Length(8, 35, {
    message:
      "The password must contain a minimum of 8 characters.",
  })
  password: string;

  @Column()
  accountId: string;
  
  @OneToOne((type) => Account, (account) => account.id)
  @JoinColumn({ name: "accountId" })
  account: Account;
}
