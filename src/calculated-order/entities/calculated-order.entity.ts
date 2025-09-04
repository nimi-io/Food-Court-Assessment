// calculated-order.model.ts
import Meal from '@src/meal/entities/meal.entity';
import { Model } from 'objection';
// import { Meal } from './meal.model'; // Import Meal model

class CalculatedOrder extends Model {
  static tableName = 'calculated_orders';

  id: string;
  totalAmount: number;
  freeDelivery: boolean;
  deliveryFee: number;
  serviceCharge: number;
  addressDetails: object;

  static relationMappings = {
    meals: {
      relation: Model.HasManyRelation,
      modelClass: Meal,
      join: {
        from: 'calculated_orders.id',
        to: 'meals.calculatedOrderId',
      },
    },
  };
}

export default CalculatedOrder;
