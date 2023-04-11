import { MigrationInterface, QueryRunner } from 'typeorm';

export class Order1681218397868 implements MigrationInterface {
  name = 'Order1681218397868';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" SERIAL NOT NULL, "client_id" integer NOT NULL, "reference" character varying NOT NULL, "amount" double precision NOT NULL, "amount_payable" double precision NOT NULL, "amount_paid" double precision NOT NULL, "amount_outstanding" double precision NOT NULL, "order_date" TIMESTAMP NOT NULL, "expected_payment_date" TIMESTAMP NOT NULL, "actual_payment_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_505ba3689ef2763acd6c4fc93a4" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_505ba3689ef2763acd6c4fc93a4"`,
    );
    await queryRunner.query(`DROP TABLE "orders"`);
  }
}
