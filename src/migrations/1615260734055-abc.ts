import {MigrationInterface, QueryRunner} from "typeorm";

export class abc1615260734055 implements MigrationInterface {
    name = 'abc1615260734055'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `topic` ADD `semester` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `topic` ADD `description` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `topic` DROP COLUMN `description`");
        await queryRunner.query("ALTER TABLE `topic` DROP COLUMN `semester`");
    }

}
