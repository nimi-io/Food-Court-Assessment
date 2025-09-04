import CalculatedOrder from '@src/calculated-order/entities/calculated-order.entity';
import OrderLog from '@src/order-log/entities/order-log.entity';
import OrderType from '@src/order-type/entities/order-type.entity';
import { Model } from 'objection';

class Order extends Model {
  static tableName = 'orders';

  id: string;
  userId: string;
  completed: boolean;
  cancelled: boolean;
  orderCode: string;
  calculatedOrderId?: string;
  orderTypeId?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  logs: OrderLog[];
  calculatedOrder: CalculatedOrder;
  orderType: OrderType;

  static relationMappings = {
    logs: {
      relation: Model.HasManyRelation,
      modelClass: OrderLog,
      join: {
        from: 'orders.id',
        to: 'order_logs.orderId',
      },
    },
    calculatedOrder: {
      relation: Model.BelongsToOneRelation,
      modelClass: CalculatedOrder,
      join: {
        from: 'orders.calculatedOrderId',
        to: 'calculated_orders.id',
      },
    },
    orderType: {
      relation: Model.BelongsToOneRelation,
      modelClass: OrderType,
      join: {
        from: 'orders.orderTypeId',
        to: 'order_types.id',
      },
    },
  };
}

export default Order;
