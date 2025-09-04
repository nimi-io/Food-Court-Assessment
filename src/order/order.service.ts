import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './order.repository';
import { IDefaultOptions } from '../shared/common/paginate-result.interface';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async create(createOrderDto: CreateOrderDto) {
    const existingOrder = await this.orderRepository.findOne((query) =>
      query.where('orderCode', createOrderDto.orderCode).whereNull('deletedAt'),
    );

    if (existingOrder) {
      throw new BadRequestException('Order with this code already exists');
    }
    try {
      return await this.orderRepository.create(createOrderDto);
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

  async findAll(paginate: IDefaultOptions) {
    return await this.orderRepository.find(
      (query) => query.whereNull('deletedAt'),
      paginate,
    );
  }

  async findOne(id: string) {
    return await this.orderRepository.findOne((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const existingOrder = await this.orderRepository.findOne((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );

    if (!existingOrder) {
      throw new BadRequestException('Order does not exist');
    }

    return await this.orderRepository.update(id, updateOrderDto);
  }

  async remove(id: string) {
    const existingOrder = await this.orderRepository.findOne((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );

    if (!existingOrder) {
      throw new BadRequestException('Order does not exist');
    }

    return await this.orderRepository.softRemove((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );
  }
}
