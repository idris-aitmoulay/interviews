import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import ContractOption from "../contract-option/contract-option.entity";
import {ContractStatus} from "./constants";
import User from "../user/user.entity";
import moment = require("moment");

@Entity()
export default class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('enum', { enum: ContractStatus, nullable: false, default: ContractStatus.PENDING })
  status: ContractStatus;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column({ nullable: false })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  terminationDate: Date;

  @ManyToMany(() => ContractOption, option => option.contracts, { nullable: false, lazy: true })
  contractOptions: Promise<ContractOption[]>;

  @ManyToMany(() => User, user => user.contracts, { nullable: false })
  users: Promise<User[]>;

  @AfterLoad()
  async fetchContract() {
    if (this.status === ContractStatus.PENDING && this.startDate && moment(this.startDate) <= moment()) {
      this.status = ContractStatus.ACTIVE;
    }

    if (this.status === ContractStatus.ACTIVE && this.endDate && moment(this.endDate) <= moment()) {
      this.status = ContractStatus.FINISHED;
    }
  }
}
