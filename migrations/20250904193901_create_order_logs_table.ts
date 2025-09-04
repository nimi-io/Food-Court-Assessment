import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('order_logs', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('orderId').notNullable();
    table.text('description').notNullable();
    table.timestamp('time').notNullable();
    table.timestamps(true, true);

    // Foreign key constraints
    table.foreign('orderId').references('id').inTable('orders');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('order_logs');
}

