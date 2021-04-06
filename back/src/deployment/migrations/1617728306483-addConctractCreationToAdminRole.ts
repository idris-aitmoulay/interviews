import {MigrationInterface, QueryRunner} from "typeorm";

export class addConctractCreationToAdminRole1617728306483 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
      INSERT INTO public.permission (code, description)
       values
        ('CONTRACT__W', 'cree un contract'),
        ('CONTRACT__R', 'lire un contract'),
        ('CONTRACT__U_TERMINATING', 'resilier le contract');
        `);
      

      await queryRunner.query(`
      INSERT INTO public.role_permissions_permission ("permissionId", "roleId")
        SELECT p.id, r.id
        FROM permission p, role r
        WHERE r.status='BASIC' AND p.code IN ('CONTRACT__R', 'CONTRACT__U_TERMINATING')`);

      await queryRunner.query(`
        INSERT INTO public.role_permissions_permission ("permissionId", "roleId")
          SELECT p.id, r.id
          FROM permission p, role r
          WHERE r.status='ADMIN' AND p.code IN ('CONTRACT__R', 'CONTRACT__U_TERMINATING', 'CONTRACT__W')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
