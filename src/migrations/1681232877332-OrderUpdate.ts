import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderUpdate1681232877332 implements MigrationInterface {
    name = 'OrderUpdate1681232877332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "amount_paid" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "actual_payment_date" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "actual_payment_date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "amount_paid" SET NOT NULL`);
    }

}
