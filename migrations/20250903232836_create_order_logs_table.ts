import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('order_logs', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('orderId').notNullable();
    table.text('description').notNullable();
    table.string('time').notNullable(); // Changed to string to match entity
    
    // Explicitly define timestamp columns with camelCase names
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').nullable();
    
    // Foreign key constraint
    table.foreign('orderId').references('id').inTable('orders').onDelete('CASCADE');
    
    // Indexes for performance
    table.index(['orderId']);
    table.index(['time']);
    table.index(['createdAt']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('order_logs');
}

