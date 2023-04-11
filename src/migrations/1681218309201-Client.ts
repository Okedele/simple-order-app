import { MigrationInterface, QueryRunner } from 'typeorm';

export class Client1681218309201 implements MigrationInterface {
  name = 'Client1681218309201';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."clients_id_type_enum" AS ENUM('bvn', 'nin', 'drivers_license', 'rc_number')`,
    );
    await queryRunner.query(
      `CREATE TABLE "clients" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "contact_number" character varying NOT NULL, "id_type" "public"."clients_id_type_enum" NOT NULL, "id_value" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "clients"`);
    await queryRunner.query(`DROP TYPE "public"."clients_id_type_enum"`);
  }
}
