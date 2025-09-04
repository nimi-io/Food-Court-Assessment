import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('orders', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('userId').notNullable();
    table.boolean('completed').defaultTo(false);
    table.boolean('cancelled').defaultTo(false);
    table.string('orderCode').notNullable().unique();
    table.uuid('calculatedOrderId').nullable();
    table.uuid('orderTypeId').nullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').nullable();

    // Foreign key constraints
    table
      .foreign('calculatedOrderId')
      .references('id')
      .inTable('calculated_orders')
      .onDelete('SET NULL');

    table
      .foreign('orderTypeId')
      .references('id')
      .inTable('order_types')
      .onDelete('SET NULL');

    // Indexes for performance
    table.index(['userId']);
    table.index(['orderCode']);
    table.index(['completed']);
    table.index(['cancelled']);
    table.index(['calculatedOrderId']);
    table.index(['orderTypeId']);
    table.index(['createdAt']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('orders');
}

