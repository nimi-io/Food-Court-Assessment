import { Injectable } from '@nestjs/common';
import { AbstractService } from '../shared/common/abstract/abstract.service';
import Brand from './entities/brand.entity';

@Injectable()
export class BrandRepository extends AbstractService<Brand> {
  constructor() {
    super(Brand, 'Brand');
  }
}
