import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('orders', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('userId').notNullable();
    table.boolean('completed').defaultTo(false);
    table.boolean('cancelled').defaultTo(false);
    table.boolean('kitchenCancelled').defaultTo(false);
    table.boolean('kitchenAccepted').defaultTo(false);
    table.boolean('kitchenDispatched').defaultTo(false);
    table.timestamp('kitchenDispatchedTime').nullable();
    table.timestamp('completedTime').nullable();
    table.string('riderId').nullable();
    table.boolean('kitchenPrepared').defaultTo(false);
    table.boolean('riderAssigned').defaultTo(false);
    table.boolean('paid').defaultTo(false);
    table.string('orderCode').notNullable().unique();
    table.jsonb('orderChange').nullable();
    table.uuid('calculatedOrderId').nullable();
    table.uuid('orderTypeId').nullable();
    table.boolean('kitchenVerified').defaultTo(false);
    table.boolean('kitchenCompleted').defaultTo(false);
    table.boolean('shopAccepted').defaultTo(false);
    table.boolean('shopPrepared').defaultTo(false);
    table.integer('noOfMealbagsDelivered').defaultTo(0);
    table.integer('noOfDrinksDelivered').defaultTo(0);
    table.timestamp('riderStartedTime').nullable();
    table.boolean('riderStarted').defaultTo(false);
    table.timestamp('riderArrivedTime').nullable();
    table.boolean('riderArrived').defaultTo(false);
    table.boolean('isFailedTrip').defaultTo(false);
    table.jsonb('failedTripDetails').defaultTo('{}');
    table.string('boxNumber').nullable();
    table.string('shelfId').nullable();
    table.jsonb('orderTotalAmountHistory').defaultTo('[]');
    table.boolean('scheduled').defaultTo(false);
    table.string('confirmedById').nullable();
    table.string('completedById').nullable();
    table.timestamp('scheduledDeliveryDate').nullable();
    table.timestamp('scheduledDeliveryTime').nullable();
    table.boolean('isHidden').defaultTo(false);
    table.timestamps(true, true);
    table.timestamp('deletedAt').nullable();

    // Foreign key constraints
    table.foreign('calculatedOrderId').references('id').inTable('calculated_orders');
    table.foreign('orderTypeId').references('id').inTable('order_types');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('orders');
}

