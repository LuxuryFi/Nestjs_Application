import {MigrationInterface, QueryRunner} from "typeorm";

export class abc1615226404721 implements MigrationInterface {
    name = 'abc1615226404721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `topic` ADD `credit` int NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `topic` DROP COLUMN `credit`");
    }

}
