// addon.entity.ts
import Meal from '@src/meal/entities/meal.entity';
import { Model } from 'objection';

interface MealData {
  id: string;
  new: boolean;
  name: string;
  active: boolean;
}

class Addon extends Model {
  static tableName = 'addons';

  id: string;
  amount: number;
  images: object;
  mealId: string;
  isCombo: boolean;
  position: number;
  quantity: number;
  mealData: MealData;
  createdAt: string;
  updatedAt: string;
  posistData: object;
  mealAddonId: string;
  internalProfit: number;
  minSelectionNo: string;
  mealAddonCategoryId: string;

  static jsonSchema = {
    type: 'object',
    required: ['amount', 'mealId'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      amount: { type: 'number', minimum: 0 },
      images: { type: 'object' },
      mealId: { type: 'string', format: 'uuid' },
      isCombo: { type: 'boolean' },
      position: { type: 'integer', minimum: 0 },
      quantity: { type: 'integer', minimum: 1 },
      mealData: { type: 'object' },
      posistData: { type: 'object' },
      mealAddonId: { type: ['string', 'null'], format: 'uuid' },
      internalProfit: { type: 'number', minimum: 0 },
      minSelectionNo: { type: ['string', 'null'] },
      mealAddonCategoryId: { type: ['string', 'null'], format: 'uuid' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  };

  static relationMappings = {
    meal: {
      relation: Model.BelongsToOneRelation,
      modelClass: Meal,
      join: {
        from: 'addons.mealId',
        to: 'meals.id',
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

  $formatJson(json: any) {
    json = super.$formatJson(json);

    // Ensure objects are properly serialized for JSONB columns
    if (json.images && typeof json.images === 'object') {
      json.images = JSON.stringify(json.images);
    }
    if (json.mealData && typeof json.mealData === 'object') {
      json.mealData = JSON.stringify(json.mealData);
    }
    if (json.posistData && typeof json.posistData === 'object') {
      json.posistData = JSON.stringify(json.posistData);
    }

    return json;
  }

  $parseJson(json: any, opt?: any) {
    json = super.$parseJson(json, opt);

    // Parse JSONB columns back to objects
    if (typeof json.images === 'string') {
      try {
        json.images = JSON.parse(json.images);
      } catch (e) {
        json.images = {};
      }
    }
    if (typeof json.mealData === 'string') {
      try {
        json.mealData = JSON.parse(json.mealData);
      } catch (e) {
        json.mealData = {};
      }
    }
    if (typeof json.posistData === 'string') {
      try {
        json.posistData = JSON.parse(json.posistData);
      } catch (e) {
        json.posistData = {};
      }
    }

    return json;
  }
}

export default Addon;
