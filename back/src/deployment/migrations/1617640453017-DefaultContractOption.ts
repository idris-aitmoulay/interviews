import {MigrationInterface, QueryRunner} from "typeorm";

export class DefaultContractOption1617640453017 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
      INSERT INTO public.contract_option (code, description)
       values
        ('TOUT_RISQUE', 'tout risque'),
        ('VOL_UNIQUEMENT', 'vol uniquement'),
        ('COMBRIOLE_VENDREDI', 'cambriolé un vendredi'),
        ('INCENDIE_UNIQUEMENT', 'incendie uniquement'),
        ('TOUT_INCIDENT', 'tout incident');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}

}
