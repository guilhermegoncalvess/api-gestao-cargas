import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateServices1621455124874 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
            name: 'service',
            columns: [
              {
                name: 'id',
                type: 'varchar',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
              },
              {
                name: 'employee_id',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'load_id',
                type: 'varchar',
                isNullable: false,
              },
            ],
        })  
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('service');
    }

}
