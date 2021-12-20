import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class CreatePhones1640023029469 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'phones',
      columns: [
        {
          name: 'id',
          isPrimary: true,
          type: 'int',
          width: 14,
        },
        {
          name: 'idContact',
          type: 'int',
          width: 14,
        },
        {
          name: 'number',
          isPrimary: true,
          type: 'varchar',
          length: '16',
        },
      ],
    }));

    await queryRunner.createForeignKey('phones', new TableForeignKey({
      columnNames: ['idContact'],
      referencedColumnNames: ['id'],
      referencedTableName: 'contacts',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('phones');
  }
}
