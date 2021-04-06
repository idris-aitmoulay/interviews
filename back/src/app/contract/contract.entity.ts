import {
  Column,
  CreateDateColumn,
  Entity, JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import ContractOption from "../contract-option/contract-option.entity";
import {ContractStatus} from "./constants";
import User from "../user/user.entity";

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

  @ManyToMany(() => ContractOption, option => option.contracts, { nullable: false })
  contractOptions: Promise<ContractOption[]>;

  @ManyToMany(() => User, user => user.contracts, { nullable: false })
  users: Promise<User[]>;
}
