import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('calculated_orders', (table) => {
    table.string('lat').nullable();
    table.string('lng').nullable();
    table.string('cokitchenPolygonId').nullable();

    table.string('userId').nullable();
    table.string('cokitchenId').nullable();

    table.boolean('pickup').defaultTo(false);

    table.decimal('prevPrice', 10, 2).nullable();

    // Indexes to support querying
    table.index(['userId']);
    table.index(['cokitchenId']);
    table.index(['cokitchenPolygonId']);
    table.index(['pickup']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('calculated_orders', (table) => {
    table.dropIndex(['userId']);
    table.dropIndex(['cokitchenId']);
    table.dropIndex(['cokitchenPolygonId']);
    table.dropIndex(['pickup']);
    table.dropColumn('lat');
    table.dropColumn('lng');
    table.dropColumn('cokitchenPolygonId');
    table.dropColumn('userId');
    table.dropColumn('cokitchenId');
    table.dropColumn('pickup');
    table.dropColumn('prevPrice');
  });
}
