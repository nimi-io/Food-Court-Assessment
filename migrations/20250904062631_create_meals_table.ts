import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.integer('quantity').notNullable().defaultTo(1);
    table.text('description').nullable();
    table.uuid('calculatedOrderId').nullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').nullable();

    // Foreign key constraint
    table
      .foreign('calculatedOrderId')
      .references('id')
      .inTable('calculated_orders')
      .onDelete('SET NULL');

    // Indexes
    table.index(['name']);
    table.index(['price']);
    table.index(['calculatedOrderId']);
    table.index(['createdAt']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('meals');
}
