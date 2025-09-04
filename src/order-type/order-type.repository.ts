import { Injectable } from '@nestjs/common';
import { AbstractService } from '../shared/common/abstract/abstract.service';
import OrderType from './entities/order-type.entity';

@Injectable()
export class OrderTypeRepository extends AbstractService<OrderType> {
  constructor() {
    super(OrderType, 'OrderType');
  }
}
