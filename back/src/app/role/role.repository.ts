import { EntityRepository, Repository } from 'typeorm';
import Role from './role.entity';
import { RoleStatus } from "./constants";

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  findByStatus(status: RoleStatus): Promise<Role | undefined> {
    return this.findOne({ status });
  }
}
