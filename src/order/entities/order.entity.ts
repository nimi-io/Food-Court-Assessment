import CalculatedOrder from '@src/calculated-order/entities/calculated-order.entity';
import OrderLog from '@src/order-log/entities/order-log.entity';
import OrderType from '@src/order-type/entities/order-type.entity';
import { Model } from 'objection';

class Order extends Model {
  static tableName = 'orders';

  // Define JSON schema for proper JSON field handling
  static jsonSchema = {
    type: 'object',
    properties: {
      orderChange: { type: ['object', 'null'] },
      failedTripDetails: { type: ['object', 'null'] },
      orderTotalAmountHistory: { type: ['array', 'null'] },
    },
  };

  // Handle JSON serialization before insert/update
  $beforeInsert() {
    this.orderChange = this.orderChange || null;
    this.failedTripDetails = this.failedTripDetails || {};
    this.orderTotalAmountHistory = this.orderTotalAmountHistory || [];
  }

  $beforeUpdate() {
    this.orderChange = this.orderChange || null;
    this.failedTripDetails = this.failedTripDetails || {};
    this.orderTotalAmountHistory = this.orderTotalAmountHistory || [];
  }

  id: string;
  userId: string;
  completed: boolean;
  cancelled: boolean;
  kitchenCancelled: boolean;
  kitchenAccepted: boolean;
  kitchenDispatched: boolean;
  kitchenDispatchedTime?: string;
  completedTime?: string;
  riderId?: string;
  kitchenPrepared: boolean;
  riderAssigned: boolean;
  paid: boolean;
  orderCode: string;
  orderChange?: any;
  calculatedOrderId?: string;
  orderTypeId?: string;
  createdAt: string;
  updatedAt: string;
  kitchenVerified: boolean;
  kitchenCompleted: boolean;
  shopAccepted: boolean;
  shopPrepared: boolean;
  noOfMealbagsDelivered: number;
  noOfDrinksDelivered: number;
  riderStartedTime?: string;
  riderStarted: boolean;
  riderArrivedTime?: string;
  riderArrived: boolean;
  isFailedTrip: boolean;
  failedTripDetails: any;
  boxNumber?: string;
  shelfId?: string;
  orderTotalAmountHistory: any;
  scheduled: boolean;
  confirmedById?: string;
  completedById?: string;
  scheduledDeliveryDate?: string;
  scheduledDeliveryTime?: string;
  isHidden: boolean;
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
