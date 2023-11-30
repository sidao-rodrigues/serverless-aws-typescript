import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('users', (table: Knex.CreateTableBuilder) => {
      table.bigIncrements('id').primary().index();
      table.string('nome', 150).index().notNullable();
      table.comment('Tabela de teste');
    })
    .then(() => console.log('criado tabela users'));
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users').then(() => console.log('deletado tabela users'));
}
