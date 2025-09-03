import { Module } from '@nestjs/common';
import { OrderLogService } from './order-log.service';
import { OrderLogController } from './order-log.controller';
import OrderLog from './entities/order-log.entity';
import { OrderLogRepository } from './order-log.repository';

@Module({
  controllers: [OrderLogController],
  providers: [OrderLogService, OrderLogRepository],
})
export class OrderLogModule {}
