import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import Role from "../role/role.entity";
import Contract from "../contract/contract.entity";

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: true})
    email: string;

    @Column()
    password: string;

    @Column({ type: 'json', nullable: true })
    refreshToken: object;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @ManyToOne(() => Role, role => role.user, { eager: true, nullable: false })
    @JoinColumn()
    role: Role;
    
    @ManyToMany(() => Contract, contract => contract.users)
    @JoinTable()
    contracts: Promise<Contract[]>;

    toJSON () {
      // @ts-ignore
      delete this.password;
      // @ts-ignore
      delete this.refreshToken;
      return this;
    }
}
