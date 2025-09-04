import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCalculatedOrderDto } from './dto/create-calculated-order.dto';
import { UpdateCalculatedOrderDto } from './dto/update-calculated-order.dto';
import { CalculatedOrderRepository } from './calculated-order.repository';
import { number } from 'joi';
import { async } from 'rxjs';
import { IDefaultOptions } from '@src/shared/common/paginate-result.interface';

@Injectable()
export class CalculatedOrderService {
  constructor(
    private readonly calculatedOrderRepository: CalculatedOrderRepository,
  ) {}
  async create(createCalculatedOrderDto: CreateCalculatedOrderDto) {
    const getLastRecord = await this.calculatedOrderRepository.findAll(
      (query) => {
        let queryBuilder = query;
        if (createCalculatedOrderDto.userId !== undefined) {
          queryBuilder = queryBuilder.where(
            'userId',
            createCalculatedOrderDto.userId,
          );
        }
        if (createCalculatedOrderDto.cokitchenId !== undefined) {
          queryBuilder = queryBuilder.where(
            'cokitchenId',
            createCalculatedOrderDto.cokitchenId,
          );
        }
        return queryBuilder;
      },
    );

    const lastPrice = getLastRecord[getLastRecord.length - 1]?.totalAmount || 0;

    try {
      return await this.calculatedOrderRepository.create({
        ...createCalculatedOrderDto,
        prevPrice: lastPrice,
      });
    } catch (error) {
      if (error.message.toString().startsWith('insert')) {
        throw new UnprocessableEntityException(
          'Could not process the order creation request',
          error.message.toString().split('-')[
            error.message.toString().split('-').length - 1
          ],
        );
      }
      throw new UnprocessableEntityException(
        'Could not process the order creation request',
        error.message,
      );
    }
  }

  async findAll(
    paginate: IDefaultOptions,
    userId?: string,
    cokitchenId?: string,
  ) {
    return this.calculatedOrderRepository.find((query) => {
      if (userId) {
        query = query.where('userId', userId);
      }
      if (cokitchenId) {
        query = query.where('cokitchenId', cokitchenId);
      }
      return query.whereNull('deletedAt');
    }, paginate);
  }

  async findOne(id: string) {
    return this.calculatedOrderRepository.findOne((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );
  }

  async update(id: string, updateCalculatedOrderDto: UpdateCalculatedOrderDto) {
    const existingCalculatedOrder =
      await this.calculatedOrderRepository.findOne((query) =>
        query.where('id', id).whereNull('deletedAt'),
      );

    if (!existingCalculatedOrder) {
      throw new BadRequestException('Order not found');
    }
    return this.calculatedOrderRepository.update(id, updateCalculatedOrderDto);
  }

  async remove(id: string) {
    const existingCalculatedOrder =
      await this.calculatedOrderRepository.findOne((query) =>
        query.where('id', id).whereNull('deletedAt'),
      );

    if (!existingCalculatedOrder) {
      throw new BadRequestException('Order does not exist');
    }

    return await this.calculatedOrderRepository.softRemove((query) =>
      query.where('id', id),
    );
  }
}
