import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('addons', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.decimal('amount', 10, 2).notNullable();
    table.jsonb('images').defaultTo('{}'); // Object for image data
    table.uuid('mealId').notNullable();
    table.boolean('isCombo').defaultTo(false);
    table.integer('position').defaultTo(0);
    table.integer('quantity').defaultTo(1);
    table.jsonb('mealData').nullable(); // MealData object
    table.jsonb('posistData').defaultTo('{}'); // Object for POS data
    table.string('mealAddonId').nullable();
    table.decimal('internalProfit', 10, 2).defaultTo(0);
    table.string('minSelectionNo').defaultTo('0');
    table.string('mealAddonCategoryId').nullable();
    table.timestamps(true, true);
    table.timestamp('deletedAt').nullable();

    // Foreign key constraints
    table.foreign('mealId').references('id').inTable('meals');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('addons');
}

