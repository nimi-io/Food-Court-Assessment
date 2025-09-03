import Order from '@src/order/entities/order.entity';
import { Model } from 'objection';

class OrderLog extends Model {
  static tableName = 'order_logs';

  id: string;
  orderId: string;
  description: string;
  time: string;

  // Define relationships if necessary
  static relationMappings = {
    order: {
      relation: Model.BelongsToOneRelation,
      modelClass: Order, // Reference to the `Order` model
      join: {
        from: 'order_logs.orderId',
        to: 'orders.id',
      },
    },
  };
}

export default OrderLog;
