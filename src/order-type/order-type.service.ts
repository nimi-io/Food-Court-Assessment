import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrderTypeDto } from './dto/create-order-type.dto';
import { UpdateOrderTypeDto } from './dto/update-order-type.dto';
import { OrderTypeRepository } from './order-type.repository';
import { IDefaultOptions } from '@src/shared/common/paginate-result.interface';

@Injectable()
export class OrderTypeService {
  constructor(private readonly orderTypeRepository: OrderTypeRepository) {}

  async create(createOrderTypeDto: CreateOrderTypeDto) {
    try {
      // Check for duplicate name (since it's unique in the database)
      const existingOrderType = await this.orderTypeRepository.findOne(
        (query) =>
          query.where('name', createOrderTypeDto.name).whereNull('deletedAt'),
      );

      if (existingOrderType) {
        throw new BadRequestException(
          `Order type with name '${createOrderTypeDto.name}' already exists`,
        );
      }

      return await this.orderTypeRepository.create(createOrderTypeDto as any);
    } catch (error) {
      console.error('Error creating order type:', error);

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
          `Order type with name '${createOrderTypeDto.name}' already exists`,
        );
      }

      if (error.message.toString().startsWith('insert')) {
        throw new UnprocessableEntityException(
          'Could not process the order type creation request',
          error.message.toString().split('-')[
            error.message.toString().split('-').length - 1
          ],
        );
      }

      throw new UnprocessableEntityException(
        'Could not process the order type creation request',
        error.message,
      );
    }
  }

  async findAll(paginate: IDefaultOptions) {
    return await this.orderTypeRepository.find(
      (query) => query.whereNull('deletedAt'),
      paginate,
    );
  }

  async findAllActive(paginate: IDefaultOptions) {
    return await this.orderTypeRepository.find(
      (query) => query.where('isActive', true).whereNull('deletedAt'),
      paginate,
    );
  }

  async findOne(id: string) {
    const orderType = await this.orderTypeRepository.findOne((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );

    if (!orderType) {
      throw new NotFoundException(`Order type with ID ${id} does not exist`);
    }

    return orderType;
  }

  async update(id: string, updateOrderTypeDto: UpdateOrderTypeDto) {
    const existingOrderType = await this.orderTypeRepository.findOne((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );

    if (!existingOrderType) {
      throw new NotFoundException(`Order type with ID ${id} does not exist`);
    }

    // Check for duplicate name if updating name
    if (
      updateOrderTypeDto.name &&
      updateOrderTypeDto.name !== existingOrderType.name
    ) {
      const duplicateOrderType = await this.orderTypeRepository.findOne(
        (query) =>
          query
            .where('name', updateOrderTypeDto.name)
            .whereNot('id', id)
            .whereNull('deletedAt'),
      );

      if (duplicateOrderType) {
        throw new BadRequestException(
          `Order type with name '${updateOrderTypeDto.name}' already exists`,
        );
      }
    }

    return await this.orderTypeRepository.update(id, updateOrderTypeDto as any);
  }

  async remove(id: string) {
    const existingOrderType = await this.orderTypeRepository.findOne((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );

    if (!existingOrderType) {
      throw new NotFoundException(`Order type with ID ${id} does not exist`);
    }

    return await this.orderTypeRepository.softRemove((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );
  }
}
