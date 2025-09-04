import { Module } from '@nestjs/common';
import { OrderTypeService } from './order-type.service';
import { OrderTypeController } from './order-type.controller';
import { OrderTypeRepository } from './order-type.repository';

@Module({
  controllers: [OrderTypeController],
  providers: [OrderTypeService, OrderTypeRepository],
  exports: [OrderTypeRepository],
})
export class OrderTypeModule {}
