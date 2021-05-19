import {
  MigrationInterface,
  QueryRunner,
  QueryRunnerAlreadyReleasedError,
  Table,
} from 'typeorm';

export default class createPersons1613077006910 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'person',
        columns: [
          {
            name: 'id',
            type: 'varchar',
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
            name: 'nickname',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'contact',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'role',
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('person');
  }
}
