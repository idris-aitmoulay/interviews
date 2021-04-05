import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import User from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({email});
  }
  
  updateRefreshTokenById(id: number, refreshToken: object): Promise<UpdateResult> {
    return this.update({ id }, { refreshToken });
  }
}
