import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('orders', (table: Knex.CreateTableBuilder) => {
      table.bigIncrements('id').primary().index();
      table.string('order', 150).index().notNullable();
      table.string('descricao', 150).index().notNullable();
      table.comment('Tabela de ordem');
    })
    .then(() => console.log('criado tabela users'));
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('orders').then(() => console.log('deletado tabela users'));
}
