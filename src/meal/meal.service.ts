import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { MealRepository } from './meal.repository';
import { BrandRepository } from '@src/brand/brand.repository';
import { CalculatedOrderRepository } from '@src/calculated-order/calculated-order.repository';
import { IDefaultOptions } from '@src/shared/common/paginate-result.interface';

@Injectable()
export class MealService {
  constructor(
    private readonly mealRepository: MealRepository,
    private readonly brandRepository: BrandRepository,
    private readonly calculatedOrderRepository: CalculatedOrderRepository,
  ) {}
  async create(createMealDto: CreateMealDto) {
    try {
      // Check if the brand exists
      const brandExists = await this.brandRepository.findOne((query) =>
        query.where('id', createMealDto.brandId).whereNull('deletedAt'),
      );

      if (!brandExists) {
        throw new NotFoundException(
          `Brand with ID ${createMealDto.brandId} does not exist`,
        );
      }

      // Check if calculatedOrderId exists (if provided)
      if (createMealDto.calculatedOrderId) {
        const calculatedOrderExists = await this.calculatedOrderRepository.findOne((query) =>
          query.where('id', createMealDto.calculatedOrderId).whereNull('deletedAt'),
        );

        if (!calculatedOrderExists) {
          throw new NotFoundException(
            `Calculated order with ID ${createMealDto.calculatedOrderId} does not exist`,
          );
        }
      }

      // TODO: Add validation for mealCategoryId when category entity is implemented
      // if (createMealDto.mealCategoryId) {
      //   const categoryExists = await this.categoryRepository.findOne((query) =>
      //     query.where('id', createMealDto.mealCategoryId).whereNull('deletedAt'),
      //   );
      //
      //   if (!categoryExists) {
      //     throw new NotFoundException(
      //       `Meal category with ID ${createMealDto.mealCategoryId} does not exist`,
      //     );
      //   }
      // }

      return await this.mealRepository.create(createMealDto);
    } catch (error) {
      console.error('Error creating meal:', error);
      
      // Handle known errors
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      
      if (error.message.toString().startsWith('insert')) {
        throw new UnprocessableEntityException(
          'Could not process the meal creation request',
          error.message.toString().split('-')[
            error.message.toString().split('-').length - 1
          ],
        );
      }
      throw new UnprocessableEntityException(
        'Could not process the meal creation request',
        error.message,
      );
    }
  }

  async findAll(paginate: IDefaultOptions) {
    return await this.mealRepository.find(
      (query) => query.whereNull('deletedAt'),
      paginate,
    );
  }

  async findAllByBrandId(id: string, paginate: IDefaultOptions) {
    // Check if brand exists first
    const brandExists = await this.brandRepository.findOne((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );

    if (!brandExists) {
      throw new NotFoundException(`Brand with ID ${id} does not exist`);
    }

    return await this.mealRepository.find(
      (query) => query.where('brandId', id).whereNull('deletedAt'),
      paginate,
    );
  }

  async findOne(id: string) {
    const meal = await this.mealRepository.findOne((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );

    if (!meal) {
      throw new NotFoundException(`Meal with ID ${id} does not exist`);
    }

    return meal;
  }

  async update(id: string, updateMealDto: UpdateMealDto) {
    const existingMeal = await this.mealRepository.findOne((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );

    if (!existingMeal) {
      throw new NotFoundException(`Meal with ID ${id} does not exist`);
    }

    // Check if brandId exists (if being updated)
    if (updateMealDto.brandId) {
      const brandExists = await this.brandRepository.findOne((query) =>
        query.where('id', updateMealDto.brandId).whereNull('deletedAt'),
      );

      if (!brandExists) {
        throw new NotFoundException(
          `Brand with ID ${updateMealDto.brandId} does not exist`,
        );
      }
    }

    // Check if calculatedOrderId exists (if being updated)
    if (updateMealDto.calculatedOrderId) {
      const calculatedOrderExists = await this.calculatedOrderRepository.findOne((query) =>
        query.where('id', updateMealDto.calculatedOrderId).whereNull('deletedAt'),
      );

      if (!calculatedOrderExists) {
        throw new NotFoundException(
          `Calculated order with ID ${updateMealDto.calculatedOrderId} does not exist`,
        );
      }
    }

    // TODO: Add validation for mealCategoryId when category entity is implemented
    // if (updateMealDto.mealCategoryId) {
    //   const categoryExists = await this.categoryRepository.findOne((query) =>
    //     query.where('id', updateMealDto.mealCategoryId).whereNull('deletedAt'),
    //   );
    //
    //   if (!categoryExists) {
    //     throw new NotFoundException(
    //       `Meal category with ID ${updateMealDto.mealCategoryId} does not exist`,
    //     );
    //   }
    // }

    return await this.mealRepository.update(id, updateMealDto);
  }

  async remove(id: string) {
    const existingMeal = await this.mealRepository.findOne((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );

    if (!existingMeal) {
      throw new NotFoundException(`Meal with ID ${id} does not exist`);
    }

    return await this.mealRepository.softRemove((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );
  }
}
