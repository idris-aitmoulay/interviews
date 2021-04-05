import {MigrationInterface, QueryRunner} from "typeorm";
import { environment } from "../../app/shared";
import * as bcrypt from 'bcryptjs';

export class UserSuperAdmin1617580717827 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const adminPassword = environment.database.passwordAdmin;
      const adminEmail = environment.database.emailAdmin;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(adminPassword, salt);
      await queryRunner.query(`INSERT INTO public.user (email, password, "roleId")
                                        SELECT '${adminEmail}', '${hash}', id 
                                        FROM role
                                        WHERE status='SUPER_ADMIN'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}

}
