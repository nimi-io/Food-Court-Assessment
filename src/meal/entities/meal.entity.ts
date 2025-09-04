// meal.entity.ts
import Addon from '@src/addon/entities/addon.entity';
import { Model } from 'objection';

interface Brand {
  id: string;
  name: string;
}

class Meal extends Model {
  static tableName = 'meals';

  id: string;
  name: string;
  new: boolean;
  brand: Brand;
  active: boolean;
  addons: Addon[];
  amount: number;
  images: string[];
  alcohol: boolean;
  itemNo: string | null;
  summary: string | null;
  brandId: string;
  calories: string;
  isAddon: boolean;
  isCombo: boolean;
  position: number;
  quantity: number;
  homePage: boolean;
  itemType: string;
  mealTags: string[];
  createdAt: string;
  isDeleted: boolean;
  orderNote: string;
  updatedAt: string;
  description: string;
  minimumAge: string;
  posistData: Record<string, any>;
  availableNo: string;
  mealKeywords: string[];
  internalProfit: number;
  mealCategoryId: string;
  calculatedOrderId?: string;

  static jsonSchema = {
    type: 'object',
    required: ['name', 'amount', 'brandId'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string', minLength: 1, maxLength: 255 },
      new: { type: 'boolean' },
      active: { type: 'boolean' },
      amount: { type: 'number', minimum: 0 },
      images: { type: 'array', items: { type: 'string' } },
      alcohol: { type: 'boolean' },
      itemNo: { type: ['string', 'null'] },
      summary: { type: ['string', 'null'] },
      brandId: { type: 'string', format: 'uuid' },
      calories: { type: ['string', 'null'] },
      isAddon: { type: 'boolean' },
      isCombo: { type: 'boolean' },
      position: { type: 'integer', minimum: 0 },
      quantity: { type: 'integer', minimum: 1 },
      homePage: { type: 'boolean' },
      itemType: { type: ['string', 'null'] },
      mealTags: { type: 'array', items: { type: 'string' } },
      isDeleted: { type: 'boolean' },
      orderNote: { type: ['string', 'null'] },
      description: { type: ['string', 'null'] },
      minimumAge: { type: ['string', 'null'] },
      posistData: { type: 'object' },
      availableNo: { type: ['string', 'null'] },
      mealKeywords: { type: 'array', items: { type: 'string' } },
      internalProfit: { type: 'number', minimum: 0 },
      mealCategoryId: { type: ['string', 'null'], format: 'uuid' },
      calculatedOrderId: { type: ['string', 'null'], format: 'uuid' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  };

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

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  $formatJson(json: any) {
    json = super.$formatJson(json);

    // Ensure arrays are properly serialized for JSONB columns
    if (json.images && Array.isArray(json.images)) {
      json.images = JSON.stringify(json.images);
    }
    if (json.mealTags && Array.isArray(json.mealTags)) {
      json.mealTags = JSON.stringify(json.mealTags);
    }
    if (json.mealKeywords && Array.isArray(json.mealKeywords)) {
      json.mealKeywords = JSON.stringify(json.mealKeywords);
    }
    if (json.posistData && typeof json.posistData === 'object') {
      json.posistData = JSON.stringify(json.posistData);
    }

    return json;
  }

  $parseJson(json: any, opt?: any) {
    json = super.$parseJson(json, opt);

    // Parse JSONB columns back to arrays/objects
    if (typeof json.images === 'string') {
      try {
        json.images = JSON.parse(json.images);
      } catch (e) {
        json.images = [];
      }
    }
    if (typeof json.mealTags === 'string') {
      try {
        json.mealTags = JSON.parse(json.mealTags);
      } catch (e) {
        json.mealTags = [];
      }
    }
    if (typeof json.mealKeywords === 'string') {
      try {
        json.mealKeywords = JSON.parse(json.mealKeywords);
      } catch (e) {
        json.mealKeywords = [];
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

export default Meal;
