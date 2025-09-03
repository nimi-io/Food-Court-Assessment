import { Injectable } from '@nestjs/common';
import { AbstractService } from '../shared/common/abstract/abstract.service';
import CalculatedOrder from './entities/calculated-order.entity';

@Injectable()
export class CalculatedOrderRepository extends AbstractService<CalculatedOrder> {
  constructor() {
    super(CalculatedOrder, 'Order');
  }
}
