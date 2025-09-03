import { Injectable } from '@nestjs/common';
import { AbstractService } from '../shared/common/abstract/abstract.service';
import Order from './entities/order.entity';

@Injectable()
export class OrderRepository extends AbstractService<Order> {
  constructor() {
    super(Order, 'Order');
  }
}
