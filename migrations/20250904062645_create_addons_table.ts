import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('addons', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.uuid('mealId').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').nullable();

    // Foreign key constraint
    table
      .foreign('mealId')
      .references('id')
      .inTable('meals')
      .onDelete('CASCADE');

    // Indexes
    table.index(['name']);
    table.index(['price']);
    table.index(['mealId']);
    table.index(['createdAt']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('addons');
}
