import { Model } from 'objection';

class Brand extends Model {
  static tableName = 'brands';

  id: string;
  name: string;
  logoUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default Brand;
