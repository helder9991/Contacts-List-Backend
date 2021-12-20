import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateContacts1640021570802 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contacts');
  }
}
