import { Injectable } from '@nestjs/common';
import { AbstractService } from '../shared/common/abstract/abstract.service';
import Meal from './entities/meal.entity';

@Injectable()
export class MealRepository extends AbstractService<Meal> {
  constructor() {
    super(Meal, 'Meal');
  }
}
