import { Model } from 'objection';

class OrderType extends Model {
  static tableName = 'order_types';

  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default OrderType;
