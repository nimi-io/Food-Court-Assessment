import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('orders', (table) => {
    // Kitchen management fields
    table.boolean('kitchenCancelled').defaultTo(false);
    table.boolean('kitchenAccepted').defaultTo(false);
    table.boolean('kitchenDispatched').defaultTo(false);
    table.timestamp('kitchenDispatchedTime').nullable();
    table.timestamp('completedTime').nullable();
    table.boolean('kitchenPrepared').defaultTo(false);
    table.boolean('kitchenVerified').defaultTo(false);
    table.boolean('kitchenCompleted').defaultTo(false);

    // Rider/delivery fields
    table.string('riderId').nullable();
    table.boolean('riderAssigned').defaultTo(false);
    table.timestamp('riderStartedTime').nullable();
    table.boolean('riderStarted').defaultTo(false);
    table.timestamp('riderArrivedTime').nullable();
    table.boolean('riderArrived').defaultTo(false);

    // Shop management
    table.boolean('shopAccepted').defaultTo(false);
    table.boolean('shopPrepared').defaultTo(false);

    // Order details
    table.boolean('paid').defaultTo(false);
    table.jsonb('orderChange').nullable();
    table.integer('noOfMealbagsDelivered').defaultTo(0);
    table.integer('noOfDrinksDelivered').defaultTo(0);

    // Failed trip handling
    table.boolean('isFailedTrip').defaultTo(false);
    table.jsonb('failedTripDetails').defaultTo('{}');

    // Location & storage
    table.string('boxNumber').nullable();
    table.string('shelfId').nullable();

    // History & tracking
    table.jsonb('orderTotalAmountHistory').defaultTo('[]');

    // Scheduling
    table.boolean('scheduled').defaultTo(false);
    table.string('confirmedById').nullable();
    table.string('completedById').nullable();
    table.date('scheduledDeliveryDate').nullable();
    table.time('scheduledDeliveryTime').nullable();

    // Visibility
    table.boolean('isHidden').defaultTo(false);

    // Indexes for performance
    table.index(['kitchenAccepted']);
    table.index(['kitchenDispatched']);
    table.index(['riderId']);
    table.index(['paid']);
    table.index(['scheduled']);
    table.index(['isHidden']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('orders', (table) => {
    // Drop all the columns we added
    table.dropColumn('kitchenCancelled');
    table.dropColumn('kitchenAccepted');
    table.dropColumn('kitchenDispatched');
    table.dropColumn('kitchenDispatchedTime');
    table.dropColumn('completedTime');
    table.dropColumn('kitchenPrepared');
    table.dropColumn('kitchenVerified');
    table.dropColumn('kitchenCompleted');
    table.dropColumn('riderId');
    table.dropColumn('riderAssigned');
    table.dropColumn('riderStartedTime');
    table.dropColumn('riderStarted');
    table.dropColumn('riderArrivedTime');
    table.dropColumn('riderArrived');
    table.dropColumn('shopAccepted');
    table.dropColumn('shopPrepared');
    table.dropColumn('paid');
    table.dropColumn('orderChange');
    table.dropColumn('noOfMealbagsDelivered');
    table.dropColumn('noOfDrinksDelivered');
    table.dropColumn('isFailedTrip');
    table.dropColumn('failedTripDetails');
    table.dropColumn('boxNumber');
    table.dropColumn('shelfId');
    table.dropColumn('orderTotalAmountHistory');
    table.dropColumn('scheduled');
    table.dropColumn('confirmedById');
    table.dropColumn('completedById');
    table.dropColumn('scheduledDeliveryDate');
    table.dropColumn('scheduledDeliveryTime');
    table.dropColumn('isHidden');
  });
}
