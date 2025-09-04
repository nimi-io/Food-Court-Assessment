import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { MealRepository } from './meal.repository';
import { BrandRepository } from '@src/brand/brand.repository';
import { CalculatedOrderRepository } from '@src/calculated-order/calculated-order.repository';

@Module({
  controllers: [MealController],
  providers: [MealService, MealRepository, BrandRepository, CalculatedOrderRepository],
  exports: [MealRepository],
})
export class MealModule {}
