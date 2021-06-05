import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createServices1622831982270 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
          name: 'service',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'date',
              type: 'timestamp with time zone',
              isNullable: true,
            },
            {
              name: 'employee_id',
              type: 'uuid',
              isNullable: false,
            },
            {
              name: 'load_id',
              type: 'uuid',
              isNullable: false,
            },
            {
              name: 'farm_id',
              type: 'uuid',
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

    await queryRunner.createForeignKey('service', new TableForeignKey({
      name: 'ServiceEmployee',
      columnNames: ['employee_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'employee',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));

    await queryRunner.createForeignKey('service', new TableForeignKey({
      name: 'ServiceLoadEmployee',
      columnNames: ['load_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'load',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));

    await queryRunner.createForeignKey('service', new TableForeignKey({
      name: 'ServiceLoadFarm',
      columnNames: ['farm_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'farm',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey( 'service','ServiceEmployee');
    await queryRunner.dropForeignKey( 'service','ServiceLoadEmployee');
    await queryRunner.dropForeignKey( 'service','ServiceLoadFarm');

    await queryRunner.dropTable('service');
  }

}
