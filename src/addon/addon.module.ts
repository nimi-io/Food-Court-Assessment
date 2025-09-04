import { Module } from '@nestjs/common';
import { AddonService } from './addon.service';
import { AddonController } from './addon.controller';
import { AddonRepository } from './addon.repository';
import { MealRepository } from '@src/meal/meal.repository';

@Module({
  controllers: [AddonController],
  providers: [AddonService, AddonRepository, MealRepository],
})
export class AddonModule {}
