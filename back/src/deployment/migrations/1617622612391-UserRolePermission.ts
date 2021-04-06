import {MigrationInterface, QueryRunner} from "typeorm";

export class UserRolePermission1617622612391 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
      INSERT INTO public.permission (code, description)
       values
        ('USER__W', 'cree un user'),
        ('USER__R', 'lire user'),
        ('USER__D', 'delete user'),
        ('USER__U', 'update user');`);

      await queryRunner.query(`
      INSERT INTO public.role_permissions_permission ("permissionId", "roleId")
        SELECT p.id, r.id
        FROM permission p, role r
        WHERE r.status='SUPER_ADMIN'`);

      await queryRunner.query(`
      INSERT INTO public.role_permissions_permission ("permissionId", "roleId")
        SELECT p.id, r.id
        FROM permission p, role r
        WHERE r.status='BASIC' AND p.code='USER__R'`);

      await queryRunner.query(`
        INSERT INTO public.role_permissions_permission ("permissionId", "roleId")
          SELECT p.id, r.id
          FROM permission p, role r
          WHERE r.status='ADMIN'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
