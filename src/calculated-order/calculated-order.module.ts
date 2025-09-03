import { Module } from '@nestjs/common';
import { CalculatedOrderService } from './calculated-order.service';
import { CalculatedOrderController } from './calculated-order.controller';
import { CalculatedOrderRepository } from './calculated-order.repository';

@Module({
  controllers: [CalculatedOrderController],
  providers: [CalculatedOrderService, CalculatedOrderRepository],
})
export class CalculatedOrderModule {}
