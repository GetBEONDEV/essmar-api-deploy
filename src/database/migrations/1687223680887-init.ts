import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1687223680887 implements MigrationInterface {
    name = 'Init1687223680887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "phone" character varying(255) NOT NULL, "identification" character varying(255) NOT NULL, "role" character varying(100) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customer_id" integer, CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "REL_d72eb2a5bbff4f2533a5d4caff" UNIQUE ("customer_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "poliza" ("id" SERIAL NOT NULL, "name" integer NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customerId" integer, CONSTRAINT "PK_1bf79d76e075592f89c14e2e7a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "transactionId" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "amount" character varying(255) NOT NULL, "bankId" character varying(255) NOT NULL, "refPayment" character varying(255) NOT NULL, "paymentDate" character varying(255) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customerId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction_success" ("id" SERIAL NOT NULL, "transactionId" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "amount" character varying(255) NOT NULL, "bankId" character varying(255) NOT NULL, "refPayment" character varying(255) NOT NULL, "paymentDate" character varying(255) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customerId" integer, CONSTRAINT "PK_188f25d053a43c154dd5cd69204" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction_rejected" ("id" SERIAL NOT NULL, "transactionId" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "amount" character varying(255) NOT NULL, "bankId" character varying(255) NOT NULL, "refPayment" character varying(255) NOT NULL, "paymentDate" character varying(255) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customerId" integer, CONSTRAINT "PK_9dbec022b79e5dcb2cf2bd6e057" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "terms" boolean NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_d72eb2a5bbff4f2533a5d4caff9" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "poliza" ADD CONSTRAINT "FK_df8d0f7711df4d36e98381278fa" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_16ead8467f1f71ac7232aa46ad3" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction_success" ADD CONSTRAINT "FK_d9e6736a55ebbbd07ce4ad49e93" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction_rejected" ADD CONSTRAINT "FK_12b9e7450ee522af22b733ec088" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction_rejected" DROP CONSTRAINT "FK_12b9e7450ee522af22b733ec088"`);
        await queryRunner.query(`ALTER TABLE "transaction_success" DROP CONSTRAINT "FK_d9e6736a55ebbbd07ce4ad49e93"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_16ead8467f1f71ac7232aa46ad3"`);
        await queryRunner.query(`ALTER TABLE "poliza" DROP CONSTRAINT "FK_df8d0f7711df4d36e98381278fa"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_d72eb2a5bbff4f2533a5d4caff9"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "transaction_rejected"`);
        await queryRunner.query(`DROP TABLE "transaction_success"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "poliza"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
