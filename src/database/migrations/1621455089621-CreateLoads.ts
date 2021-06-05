import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateLoads1621455089621 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
            name: 'load',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
              },
              {
                name: 'company_id',
                type: 'uuid',
                isNullable: true,
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
                name: 'description',
                type: 'varchar',
                isNullable: true,
              },
              {
                name: 'status',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'start_date',
                type: 'timestamp with time zone',
                isNullable: false,
              },
              {
                name: 'finished_date',
                type: 'timestamp with time zone',
                isNullable: true,
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

      await queryRunner.createForeignKey('load', new TableForeignKey({
        name: 'LoadCompany',
        columnNames: ['company_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'company',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey( 'load','LoadCompany');

      await queryRunner.dropTable('load');
    }

}
