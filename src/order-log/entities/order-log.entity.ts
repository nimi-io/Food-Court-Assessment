import Order from '@src/order/entities/order.entity';
import { Model } from 'objection';

class OrderLog extends Model {
  static tableName = 'order_logs';

  id: string;
  orderId: string;
  description: string;
  time: string;
  createdAt: string;
  updatedAt: string;

  static relationMappings = {
    order: {
      relation: Model.BelongsToOneRelation,
      modelClass: Order,
      join: {
        from: 'order_logs.orderId',
        to: 'orders.id',
      },
    },
  };

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

export default OrderLog;
