import {
  Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import Permission from "../permission/permission.entity";
import User from "../user/user.entity";
import { RoleStatus } from "./constants";

@Entity()
export default class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true  })
  label: string;

  @Column('enum', { enum: RoleStatus, default: RoleStatus.BASIC, nullable: false, unique: true })
  status: RoleStatus;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column({ default: false })
  archived: boolean;

  @ManyToMany(() => Permission, permission => permission.roles, { eager: true })
  @JoinTable()
  permissions: Permission[];

  @OneToMany(() => User, user => user.role)
  user: User[];
}
