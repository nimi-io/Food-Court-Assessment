import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('calculated_orders', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.decimal('totalAmount', 10, 2).notNullable();
    table.boolean('freeDelivery').defaultTo(false);
    table.decimal('deliveryFee', 10, 2).defaultTo(0);
    table.decimal('serviceCharge', 10, 2).defaultTo(0);
    table.jsonb('addressDetails').nullable();
    table.string('lat').nullable();
    table.string('lng').nullable();
    table.string('cokitchenPolygonId').nullable();
    table.string('userId').notNullable();
    table.string('cokitchenId').nullable();
    table.boolean('pickup').defaultTo(false);
    table.decimal('prevPrice', 10, 2).nullable();
    table.timestamps(true, true);
    table.timestamp('deletedAt').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('calculated_orders');
}

