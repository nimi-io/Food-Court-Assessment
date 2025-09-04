import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('meals', (table) => {
    if (!('amount' in table)) {
    }
    table.renameColumn('price', 'amount');

    table.boolean('new').notNullable().defaultTo(false);
    table.boolean('active').notNullable().defaultTo(true);
    table
      .specificType('images', 'jsonb')
      .notNullable()
      .defaultTo(knex.raw("'[]'::jsonb"));
    table.boolean('alcohol').notNullable().defaultTo(false);
    table.string('itemNo').nullable();
    table.text('summary').nullable();
    table.uuid('brandId').nullable();
    table.string('calories').nullable();
    table.boolean('isAddon').notNullable().defaultTo(false);
    table.boolean('isCombo').notNullable().defaultTo(false);
    table.integer('position').notNullable().defaultTo(0);
    table.boolean('homePage').notNullable().defaultTo(false);
    table.string('itemType').nullable();
    table
      .specificType('mealTags', 'jsonb')
      .notNullable()
      .defaultTo(knex.raw("'[]'::jsonb"));
    table.boolean('isDeleted').notNullable().defaultTo(false);
    table.text('orderNote').nullable();
    table.string('minimumAge').nullable();
    table
      .specificType('posistData', 'jsonb')
      .notNullable()
      .defaultTo(knex.raw("'{}'::jsonb"));
    table.string('availableNo').nullable();
    table
      .specificType('mealKeywords', 'jsonb')
      .notNullable()
      .defaultTo(knex.raw("'[]'::jsonb"));
    table.decimal('internalProfit', 10, 2).notNullable().defaultTo(0);
    table.uuid('mealCategoryId').nullable(); // No FK (table not defined yet)

    // brandId FK (if brands table exists)
    table
      .foreign('brandId')
      .references('id')
      .inTable('brands')
      .onDelete('SET NULL');
  });

  // Indexes (add after alters to avoid rename issues)
  await knex.schema.alterTable('meals', (table) => {
    table.index(['brandId']);
    table.index(['active']);
    table.index(['isDeleted']);
    table.index(['homePage']);
  });
}

export async function down(knex: Knex): Promise<void> {
  // Remove indexes first
  await knex.schema.alterTable('meals', (table) => {
    table.dropIndex(['brandId']);
    table.dropIndex(['active']);
    table.dropIndex(['isDeleted']);
    table.dropIndex(['homePage']);
  });

  await knex.schema.alterTable('meals', (table) => {
    // Drop FK
    table.dropForeign(['brandId']);

    table.dropColumn('new');
    table.dropColumn('active');
    table.dropColumn('images');
    table.dropColumn('alcohol');
    table.dropColumn('itemNo');
    table.dropColumn('summary');
    table.dropColumn('brandId');
    table.dropColumn('calories');
    table.dropColumn('isAddon');
    table.dropColumn('isCombo');
    table.dropColumn('position');
    table.dropColumn('homePage');
    table.dropColumn('itemType');
    table.dropColumn('mealTags');
    table.dropColumn('isDeleted');
    table.dropColumn('orderNote');
    table.dropColumn('minimumAge');
    table.dropColumn('posistData');
    table.dropColumn('availableNo');
    table.dropColumn('mealKeywords');
    table.dropColumn('internalProfit');
    table.dropColumn('mealCategoryId');

    table.renameColumn('amount', 'price');
  });
}
