import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTableMovieWithOrders1718876522151 implements MigrationInterface {
    name = 'InitTableMovieWithOrders1718876522151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tags\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`movies\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`play_until\` timestamp NOT NULL, \`overview\` varchar(255) NOT NULL, \`poster\` varchar(255) NOT NULL, \`is_tmdb\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`studios\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`studio_number\` int NOT NULL, \`seat_capacity\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`movie_schedules\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`start_time\` varchar(255) NOT NULL, \`end_time\` varchar(255) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`date\` timestamp NOT NULL, \`movie_id\` int NULL, \`studio_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_items\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`qty\` int NOT NULL, \`price\` decimal(10,2) NOT NULL, \`sub_total_price\` decimal(10,2) NOT NULL, \`snapshots\` json NOT NULL, \`order_id\` int NULL, \`movie_schedule_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`payment_method\` enum ('cash', 'debit') NOT NULL, \`total_item_price\` decimal(10,2) NOT NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`movie_tags\` (\`movie_id\` int NOT NULL, \`tag_id\` int NOT NULL, INDEX \`IDX_da8c59e083499f43b357ec2ed4\` (\`movie_id\`), INDEX \`IDX_f4972e5ac13766ce20ac081cf1\` (\`tag_id\`), PRIMARY KEY (\`movie_id\`, \`tag_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`movie_schedules\` ADD CONSTRAINT \`FK_1bc9ff80ec0964c8550025acaf7\` FOREIGN KEY (\`movie_id\`) REFERENCES \`movies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`movie_schedules\` ADD CONSTRAINT \`FK_e5631fdeeee0b9cbf449b459e39\` FOREIGN KEY (\`studio_id\`) REFERENCES \`studios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_145532db85752b29c57d2b7b1f1\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_1c385103935dd0007b77467b2cc\` FOREIGN KEY (\`movie_schedule_id\`) REFERENCES \`movie_schedules\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_a922b820eeef29ac1c6800e826a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`movie_tags\` ADD CONSTRAINT \`FK_da8c59e083499f43b357ec2ed4c\` FOREIGN KEY (\`movie_id\`) REFERENCES \`movies\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`movie_tags\` ADD CONSTRAINT \`FK_f4972e5ac13766ce20ac081cf10\` FOREIGN KEY (\`tag_id\`) REFERENCES \`tags\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_tags\` DROP FOREIGN KEY \`FK_f4972e5ac13766ce20ac081cf10\``);
        await queryRunner.query(`ALTER TABLE \`movie_tags\` DROP FOREIGN KEY \`FK_da8c59e083499f43b357ec2ed4c\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_a922b820eeef29ac1c6800e826a\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_1c385103935dd0007b77467b2cc\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_145532db85752b29c57d2b7b1f1\``);
        await queryRunner.query(`ALTER TABLE \`movie_schedules\` DROP FOREIGN KEY \`FK_e5631fdeeee0b9cbf449b459e39\``);
        await queryRunner.query(`ALTER TABLE \`movie_schedules\` DROP FOREIGN KEY \`FK_1bc9ff80ec0964c8550025acaf7\``);
        await queryRunner.query(`DROP INDEX \`IDX_f4972e5ac13766ce20ac081cf1\` ON \`movie_tags\``);
        await queryRunner.query(`DROP INDEX \`IDX_da8c59e083499f43b357ec2ed4\` ON \`movie_tags\``);
        await queryRunner.query(`DROP TABLE \`movie_tags\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
        await queryRunner.query(`DROP TABLE \`order_items\``);
        await queryRunner.query(`DROP TABLE \`movie_schedules\``);
        await queryRunner.query(`DROP TABLE \`studios\``);
        await queryRunner.query(`DROP TABLE \`movies\``);
        await queryRunner.query(`DROP TABLE \`tags\``);
    }

}
