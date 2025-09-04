import { Model } from 'objection';

class OrderType extends Model {
  static tableName = 'order_types';

  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export default OrderType;
