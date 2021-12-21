import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class AlterTablesContactAndPhone1640040695962 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('phones');
    await queryRunner.dropTable('contacts');

    await queryRunner.createTable(new Table({
      name: 'contacts',
      columns: [
        {
          name: 'id',
          isPrimary: true,
          type: 'int',
          width: 14,
          generationStrategy: 'increment',
          isGenerated: true,
          onUpdate: 'CASCADE',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '100',
        },
        {
          name: 'yearsOld',
          type: 'int',
          width: 3,
        },
      ],
    }));

    await queryRunner.createTable(new Table({
      name: 'phones',
      columns: [
        {
          name: 'id',
          isPrimary: true,
          type: 'int',
          width: 14,
          generationStrategy: 'increment',
          isGenerated: true,
          onUpdate: 'CASCADE',
        },
        {
          name: 'idContact',
          isPrimary: true,
          type: 'int',
          width: 14,
        },
        {
          name: 'number',
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
    await queryRunner.dropTable('contacts');

    await queryRunner.createTable(new Table({
      name: 'contacts',
      columns: [
        {
          name: 'id',
          isPrimary: true,
          type: 'int',
          width: 14,
        },
        {
          name: 'name',
          type: 'varchar',
          length: '100',
        },
        {
          name: 'yearsOld',
          type: 'int',
          width: 3,
        },
      ],
    }));

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
}
