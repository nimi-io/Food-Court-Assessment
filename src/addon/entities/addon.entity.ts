// addon.model.ts
import Meal from '@src/meal/entities/meal.entity';
import { Model } from 'objection';

class Addon extends Model {
  static tableName = 'addons';

  id: string;
  name: string;
  price: number;
  mealId: string;

  static relationMappings = {
    meal: {
      relation: Model.BelongsToOneRelation,
      modelClass: Meal, // Reference to the Meal model
      join: {
        from: 'addons.mealId',
        to: 'meals.id',
      },
    },
  };
}

export default Addon;
