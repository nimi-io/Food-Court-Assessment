import { Model } from 'objection';

class Brand extends Model {
  static tableName = 'brands';

  id: string;
  name: string;
  logoUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export default Brand;
