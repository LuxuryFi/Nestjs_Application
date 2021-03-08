import {MigrationInterface, QueryRunner} from "typeorm";

export class abc1615227263101 implements MigrationInterface {
    name = 'abc1615227263101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `topic` ADD `topic_code` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `topic` ADD `semester` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `topic` DROP COLUMN `semester`");
        await queryRunner.query("ALTER TABLE `topic` DROP COLUMN `topic_code`");
    }

}
