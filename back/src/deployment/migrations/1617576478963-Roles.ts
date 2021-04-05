import {MigrationInterface, QueryRunner} from "typeorm";

export class Roles1617576478963 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
      INSERT INTO public.role (label, status)
       values
        ('Super Admin', 'SUPER_ADMIN'),
        ('Admin', 'ADMIN'),
        ('Client', 'BASIC');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
