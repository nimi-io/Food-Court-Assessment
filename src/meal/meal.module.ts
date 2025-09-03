import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { MealRepository } from './meal.repository';

@Module({
  controllers: [MealController],
  providers: [MealService, MealRepository],
})
export class MealModule {}
