import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateLoads1621455089621 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
            name: 'load',
            columns: [
              {
                name: 'id',
                type: 'varchar',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
              },
              {
                name: 'company_id',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'farm_id',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'weight',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'cost',
                type: 'numeric',
                isNullable: false,
              },
              {
                name: 'type',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'date',
                type: 'timestamp with time zone',
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
        await queryRunner.dropTable('load');
    }

}
