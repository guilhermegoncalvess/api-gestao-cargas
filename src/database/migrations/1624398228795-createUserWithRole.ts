import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";
import { Query } from "typeorm/driver/Query";

export class createUserWithRole1624398228795 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('user', 'role');

      await queryRunner.addColumn('user', new TableColumn ({
        name: 'role_id',
        type: 'uuid',
        isNullable: false,
      }))

      await queryRunner.createForeignKey('user', new TableForeignKey({
        name: 'userRole',
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'role',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('user', 'userRole');

      await queryRunner.dropColumn('user', 'role_id');
      await queryRunner.addColumn('user', new TableColumn({
        name: 'role',
        type: 'varchar',
        isNullable: false,
      }),
      )
    }

}
