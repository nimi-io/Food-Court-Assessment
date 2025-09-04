import type { Knex } from 'knex';

// Adds missing columns to match updated Addon entity and renames price -> amount
export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('addons', (table) => {
    // Rename price -> amount (keep decimal type)
    table.renameColumn('price', 'amount');

    // Remove name column since it's not in the updated entity
    table.dropColumn('name');

    // Add new fields
    table
      .specificType('images', 'jsonb')
      .notNullable()
      .defaultTo(knex.raw("'{}'::jsonb"));
    table.boolean('isCombo').notNullable().defaultTo(false);
    table.integer('position').notNullable().defaultTo(0);
    table.integer('quantity').notNullable().defaultTo(1);
    table
      .specificType('mealData', 'jsonb')
      .notNullable()
      .defaultTo(knex.raw("'{}'::jsonb"));
    table
      .specificType('posistData', 'jsonb')
      .notNullable()
      .defaultTo(knex.raw("'{}'::jsonb"));
    table.uuid('mealAddonId').nullable();
    table.decimal('internalProfit', 10, 2).notNullable().defaultTo(0);
    table.string('minSelectionNo').nullable();
    table.uuid('mealAddonCategoryId').nullable();
  });

  // Add indexes for new fields
  await knex.schema.alterTable('addons', (table) => {
    table.index(['isCombo']);
    table.index(['position']);
    table.index(['mealAddonId']);
    table.index(['mealAddonCategoryId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  // Remove indexes first
  await knex.schema.alterTable('addons', (table) => {
    table.dropIndex(['isCombo']);
    table.dropIndex(['position']);
    table.dropIndex(['mealAddonId']);
    table.dropIndex(['mealAddonCategoryId']);
  });

  await knex.schema.alterTable('addons', (table) => {
    // Drop new columns
    table.dropColumn('images');
    table.dropColumn('isCombo');
    table.dropColumn('position');
    table.dropColumn('quantity');
    table.dropColumn('mealData');
    table.dropColumn('posistData');
    table.dropColumn('mealAddonId');
    table.dropColumn('internalProfit');
    table.dropColumn('minSelectionNo');
    table.dropColumn('mealAddonCategoryId');

    // Add back name column
    table.string('name').notNullable();

    // Rename amount back to price
    table.renameColumn('amount', 'price');
  });
}
