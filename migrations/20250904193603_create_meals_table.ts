import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.boolean('new').defaultTo(false);
    table.jsonb('brand').nullable(); // Brand object {id, name}
    table.boolean('active').defaultTo(true);
    table.decimal('amount', 10, 2).notNullable();
    table.jsonb('images').defaultTo('[]'); // Array of image URLs
    table.boolean('alcohol').defaultTo(false);
    table.string('itemNo').nullable();
    table.text('summary').nullable();
    table.uuid('brandId').notNullable();
    table.string('calories').nullable();
    table.boolean('isAddon').defaultTo(false);
    table.boolean('isCombo').defaultTo(false);
    table.integer('position').defaultTo(0);
    table.integer('quantity').defaultTo(1);
    table.boolean('homePage').defaultTo(false);
    table.string('itemType').defaultTo('FOOD');
    table.jsonb('mealTags').defaultTo('[]'); // Array of tags
    table.boolean('isDeleted').defaultTo(false);
    table.text('orderNote').nullable();
    table.text('description').nullable();
    table.string('minimumAge').defaultTo('0');
    table.jsonb('posistData').defaultTo('{}'); // Object for POS data
    table.string('availableNo').defaultTo('INFINITE');
    table.jsonb('mealKeywords').defaultTo('[]'); // Array of keywords
    table.decimal('internalProfit', 10, 2).defaultTo(0);
    table.string('mealCategoryId').nullable();
    table.uuid('calculatedOrderId').nullable();
    table.timestamps(true, true);
    table.timestamp('deletedAt').nullable();

    // Foreign key constraints
    table.foreign('brandId').references('id').inTable('brands');
    table.foreign('calculatedOrderId').references('id').inTable('calculated_orders');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('meals');
}

