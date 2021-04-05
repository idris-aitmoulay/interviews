import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import Role from "../role/role.entity";

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: true})
    email: string;

    @Column()
    password: string;

    @Column({type: 'json', nullable: true})
    refreshToken: object;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column({default: false})
    archived: boolean;

    @ManyToOne(() => Role, role => role.user, { eager: true })
    @JoinColumn()
    role: Role;
}
