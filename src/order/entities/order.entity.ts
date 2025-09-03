import OrderLog from '@src/order-log/entities/order-log.entity';
import { Model } from 'objection';

class Order extends Model {
  static tableName = 'orders';

  id: string;
  userId: string;
  completed: boolean;
  cancelled: boolean;
  orderCode: string;
  logs: OrderLog[];
  //   calculatedOrder: CalculatedOrder;
  //   orderType: OrderType;

  static relationMappings = {
    logs: {
      relation: Model.HasManyRelation,
      modelClass: OrderLog,
      join: {
        from: 'orders.id',
        to: 'order_logs.orderId',
      },
    },
    //     calculatedOrder: {
    //       relation: Model.BelongsToOneRelation,
    //       modelClass: CalculatedOrder,
    //       join: {
    //         from: 'orders.calculated_order_id',
    //         to: 'calculated_orders.id',
    //       },
    //     },
    //     orderType: {
    //       relation: Model.BelongsToOneRelation,
    //       modelClass: OrderType,
    //       join: {
    //         from: 'orders.order_type_id',
    //         to: 'order_types.id',
    //       },
    //     },
  };
}

export default Order;
