import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrderLogDto } from './dto/create-order-log.dto';
import { UpdateOrderLogDto } from './dto/update-order-log.dto';
import { OrderLogRepository } from './order-log.repository';
import { IDefaultOptions } from '@src/shared/common/paginate-result.interface';
import { number, string } from 'joi';
import { async } from 'rxjs';

@Injectable()
export class OrderLogService {
  constructor(private readonly orderlogRepository: OrderLogRepository) {}
  async create(createOrderLogDto: CreateOrderLogDto) {
    const existingOrderLog = await this.orderlogRepository.findOne((query) =>
      query.where('time', createOrderLogDto.time).whereNull('deletedAt'),
    );

    if (existingOrderLog) {
      throw new BadRequestException('Order Log with this time already exists');
    }
    try {
      return this.orderlogRepository.create(createOrderLogDto);
    } catch (error) {
      if (error.message.toString().startsWith('insert')) {
        throw new UnprocessableEntityException(
          'Could not process the order creation request',
          error.message.toString().split('-')[
            error.message.toString().split('-').length - 1
          ],
        );
      }
    }
  }
  async findAll(paginate: IDefaultOptions, orderId?: string) {
    return this.orderlogRepository.find(
      (query) => {
        const baseQuery = query.whereNull('deletedAt');
        return orderId ? baseQuery.where('orderId', orderId) : baseQuery;
      },
      paginate,
    );
  }

  async findOne(id: string) {
    return this.orderlogRepository.findOne((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );
  }

  async findByOrderId(orderId: string) {
    return this.orderlogRepository.findOne((query) =>
      query.where('orderId', orderId).whereNull('deletedAt'),
    );
  }

  async update(id: string, updateOrderLogDto: UpdateOrderLogDto) {
    const existingOrderLog = await this.orderlogRepository.findOne((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );

    if (!existingOrderLog) {
      throw new BadRequestException('Order Log does not exist');
    }

    return this.orderlogRepository.update(id, updateOrderLogDto);
  }

  async remove(id: string) {
    const existingOrder = await this.orderlogRepository.findOne((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );

    if (!existingOrder) {
      throw new BadRequestException('Order Log does not exist');
    }

    return this.orderlogRepository.softRemove((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );
  }
}
