// meal.model.ts
import Addon from '@src/addon/entities/addon.entity';
import { Model } from 'objection';

class Meal extends Model {
  static tableName = 'meals';

  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  calculatedOrderId?: string;
  addons: Addon[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;

  static relationMappings = {
    addons: {
      relation: Model.HasManyRelation,
      modelClass: Addon,
      join: {
        from: 'meals.id',
        to: 'addons.mealId',
      },
    },
  };
}

export default Meal;
