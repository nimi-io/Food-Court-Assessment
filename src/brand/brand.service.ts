import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandRepository } from './brand.repository';
import { IDefaultOptions } from '@src/shared/common/paginate-result.interface';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async create(createBrandDto: CreateBrandDto) {
    try {
      // Check for duplicate name (optional business rule)
      const existingBrand = await this.brandRepository.findOne((query) =>
        query.where('name', createBrandDto.name).whereNull('deletedAt'),
      );

      if (existingBrand) {
        throw new BadRequestException(
          `Brand with name '${createBrandDto.name}' already exists`,
        );
      }

      return await this.brandRepository.create(createBrandDto as any);
    } catch (error) {
      console.error('Error creating brand:', error);

      // Handle known errors
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      // Handle database unique constraint errors
      if (
        error.message.toString().includes('duplicate key') ||
        error.message.toString().includes('unique constraint')
      ) {
        throw new BadRequestException(
          `Brand with name '${createBrandDto.name}' already exists`,
        );
      }

      if (error.message.toString().startsWith('insert')) {
        throw new UnprocessableEntityException(
          'Could not process the brand creation request',
          error.message.toString().split('-')[
            error.message.toString().split('-').length - 1
          ],
        );
      }

      throw new UnprocessableEntityException(
        'Could not process the brand creation request',
        error.message,
      );
    }
  }

  async findAll(paginate: IDefaultOptions) {
    return await this.brandRepository.find(
      (query) => query.whereNull('deletedAt'),
      paginate,
    );
  }

  async findOne(id: string) {
    const brand = await this.brandRepository.findOne((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} does not exist`);
    }

    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    const existingBrand = await this.brandRepository.findOne((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );

    if (!existingBrand) {
      throw new NotFoundException(`Brand with ID ${id} does not exist`);
    }

    // Check for duplicate name if updating name
    if (updateBrandDto.name && updateBrandDto.name !== existingBrand.name) {
      const duplicateBrand = await this.brandRepository.findOne((query) =>
        query
          .where('name', updateBrandDto.name)
          .whereNot('id', id)
          .whereNull('deletedAt'),
      );

      if (duplicateBrand) {
        throw new BadRequestException(
          `Brand with name '${updateBrandDto.name}' already exists`,
        );
      }
    }

    return await this.brandRepository.update(id, updateBrandDto as any);
  }

  async remove(id: string) {
    const existingBrand = await this.brandRepository.findOne((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );

    if (!existingBrand) {
      throw new NotFoundException(`Brand with ID ${id} does not exist`);
    }

    return await this.brandRepository.softRemove((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );
  }
}
