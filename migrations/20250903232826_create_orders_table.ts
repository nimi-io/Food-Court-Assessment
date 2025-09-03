import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('orders', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('userId').notNullable();
    table.boolean('completed').defaultTo(false);
    table.boolean('cancelled').defaultTo(false);
    table.string('orderCode').notNullable().unique();
    
    // Explicitly define timestamp columns with camelCase names
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').nullable();
    
    // Indexes for performance
    table.index(['userId']);
    table.index(['orderCode']);
    table.index(['completed']);
    table.index(['cancelled']);
    table.index(['createdAt']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('orders');
}

