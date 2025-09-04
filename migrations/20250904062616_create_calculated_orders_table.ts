import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('calculated_orders', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.decimal('totalAmount', 10, 2).notNullable();
    table.boolean('freeDelivery').defaultTo(false);
    table.decimal('deliveryFee', 10, 2).defaultTo(0);
    table.decimal('serviceCharge', 10, 2).defaultTo(0);
    table.json('addressDetails').nullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').nullable();

    // Indexes
    table.index(['totalAmount']);
    table.index(['freeDelivery']);
    table.index(['createdAt']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('calculated_orders');
}
