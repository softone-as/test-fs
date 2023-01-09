import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUserPoinAndLifetimeKg1656301180719
    implements MigrationInterface
{
    name = 'RemoveUserPoinAndLifetimeKg1656301180719';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`users\` DROP COLUMN \`lifetime_kg\``,
        );
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`poin\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`users\` ADD COLUMN \`lifetime_kg\` decimal(16,2) NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE \`users\` ADD COLUMN \`poin\` decimal(16,2) NULL`,
        );
    }
}
