import { Model } from 'objection';

class Brand extends Model {
  static tableName = 'brands';

  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

export default Brand;
