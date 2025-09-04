import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import { AddonRepository } from './addon.repository';
import { IDefaultOptions } from '@src/shared/common/paginate-result.interface';
import { MealRepository } from '@src/meal/meal.repository';

@Injectable()
export class AddonService {
  constructor(
    private readonly addonRepository: AddonRepository,
    private readonly mealRepository: MealRepository,
  ) {}

  async create(createAddonDto: CreateAddonDto) {
    try {
      // Check if the meal exists
      const mealExists = await this.mealRepository.findOne((query) =>
        query.where('id', createAddonDto.mealId).whereNull('deletedAt'),
      );

      if (!mealExists) {
        throw new NotFoundException(
          `Meal with ID ${createAddonDto.mealId} does not exist`,
        );
      }

      // Check if mealAddonId exists (if provided)
      if (createAddonDto.mealAddonId) {
        const mealAddonExists = await this.mealRepository.findOne((query) =>
          query.where('id', createAddonDto.mealAddonId).whereNull('deletedAt'),
        );

        if (!mealAddonExists) {
          throw new NotFoundException(
            `Meal addon with ID ${createAddonDto.mealAddonId} does not exist`,
          );
        }
      }

      // TODO: Add validation for mealAddonCategoryId when category entity is implemented
      // if (createAddonDto.mealAddonCategoryId) {
      //   const categoryExists = await this.categoryRepository.findOne((query) =>
      //     query.where('id', createAddonDto.mealAddonCategoryId).whereNull('deletedAt'),
      //   );
      //
      //   if (!categoryExists) {
      //     throw new NotFoundException(
      //       `Meal addon category with ID ${createAddonDto.mealAddonCategoryId} does not exist`,
      //     );
      //   }
      // }

      return await this.addonRepository.create(createAddonDto as any);
    } catch (error) {
      console.error('Error creating addon:', error);

      // Handle known errors
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      if (error.message.toString().startsWith('insert')) {
        throw new UnprocessableEntityException(
          'Could not process the addon creation request',
          error.message.toString().split('-')[
            error.message.toString().split('-').length - 1
          ],
        );
      }
      throw new UnprocessableEntityException(
        'Could not process the addon creation request',
        error.message,
      );
    }
  }

  async findAll(paginate: IDefaultOptions) {
    return await this.addonRepository.find(
      (query) => query.whereNull('deletedAt'),
      paginate,
    );
  }

  async findAllByMealId(id: string, paginate: IDefaultOptions) {
    // Check if meal exists first
    const mealExists = await this.mealRepository.findOne((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );

    if (!mealExists) {
      throw new NotFoundException(`Meal with ID ${id} does not exist`);
    }

    return await this.addonRepository.find(
      (query) => query.where('mealId', id).whereNull('deletedAt'),
      paginate,
    );
  }

  async findOne(id: string) {
    const addon = await this.addonRepository.findOne((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );

    if (!addon) {
      throw new NotFoundException(`Addon with ID ${id} does not exist`);
    }

    return addon;
  }

  async update(id: string, updateAddonDto: UpdateAddonDto) {
    const existingAddon = await this.addonRepository.findOne((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );

    if (!existingAddon) {
      throw new NotFoundException(`Addon with ID ${id} does not exist`);
    }

    // Check if mealId exists (if being updated)
    if (updateAddonDto.mealId) {
      const mealExists = await this.mealRepository.findOne((query) =>
        query.where('id', updateAddonDto.mealId).whereNull('deletedAt'),
      );

      if (!mealExists) {
        throw new NotFoundException(
          `Meal with ID ${updateAddonDto.mealId} does not exist`,
        );
      }
    }

    // Check if mealAddonId exists (if being updated)
    if (updateAddonDto.mealAddonId) {
      const mealAddonExists = await this.mealRepository.findOne((query) =>
        query.where('id', updateAddonDto.mealAddonId).whereNull('deletedAt'),
      );

      if (!mealAddonExists) {
        throw new NotFoundException(
          `Meal addon with ID ${updateAddonDto.mealAddonId} does not exist`,
        );
      }
    }

    // TODO: Add validation for mealAddonCategoryId when category entity is implemented
    // if (updateAddonDto.mealAddonCategoryId) {
    //   const categoryExists = await this.categoryRepository.findOne((query) =>
    //     query.where('id', updateAddonDto.mealAddonCategoryId).whereNull('deletedAt'),
    //   );
    //
    //   if (!categoryExists) {
    //     throw new NotFoundException(
    //       `Meal addon category with ID ${updateAddonDto.mealAddonCategoryId} does not exist`,
    //     );
    //   }
    // }

    return await this.addonRepository.update(id, updateAddonDto as any);
  }

  async remove(id: string) {
    const existingAddon = await this.addonRepository.findOne((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );

    if (!existingAddon) {
      throw new NotFoundException(`Addon with ID ${id} does not exist`);
    }

    return await this.addonRepository.softRemove((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );
  }
}
