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
    addons: Addon[];

    static relationMappings = {
      addons: {
        relation: Model.HasManyRelation,
        modelClass: Addon,
        join: {
          from: 'meals.id',
          to: 'addons.meal_id',
        },
      },
    };
}

export default Meal;
