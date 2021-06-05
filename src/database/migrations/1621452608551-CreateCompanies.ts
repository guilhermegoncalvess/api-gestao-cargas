import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class CreateCompanies1621452608551 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
            name: 'company',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
              },
              {
                name: 'name',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'cnpj',
                type: 'int',
                isNullable: false,
              },
              {
                name: 'address',
                type: 'varchar',
                isNullable: true,
              },
              {
                name: 'city',
                type: 'varchar',
                isNullable: true,
              },
              {
                name: 'state',
                type: 'varchar',
                isNullable: true,
              },
              {
                name: 'contact',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
              },
              {
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
              },
            ],
          })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey( 'company','CompanyOwner');

      await queryRunner.dropTable('company');

    }

}
