import { Injectable } from '@nestjs/common';
import { AbstractService } from '../shared/common/abstract/abstract.service';
import OrderLog from './entities/order-log.entity';

@Injectable()
export class OrderLogRepository extends AbstractService<OrderLog> {
  constructor() {
    super(OrderLog, 'OrderLog');
  }
}
