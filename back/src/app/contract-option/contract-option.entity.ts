import {
  Column,
  CreateDateColumn,
  Entity, JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import Contract from "../contract/contract.entity";

@Entity()
export default class ContractOption {
  @PrimaryColumn()
  code: string;

  @Column({ nullable: false })
  description: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToMany(() => Contract, contract => contract.contractOptions, { lazy: true })
  @JoinTable()
  contracts: Promise<Contract[]>
}
