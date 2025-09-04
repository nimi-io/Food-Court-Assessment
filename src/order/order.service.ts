import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './order.repository';
import { IDefaultOptions } from '../shared/common/paginate-result.interface';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async create(createOrderDto: CreateOrderDto) {
    const existingOrder = await this.orderRepository.findOne((query) =>
      query.where('orderCode', createOrderDto.orderCode),
    );

    if (existingOrder) {
      throw new BadRequestException('Order with this code already exists');
    }

    return await this.orderRepository.create(createOrderDto);
  }

  async findAll(paginate: IDefaultOptions) {
    return await this.orderRepository.find(undefined, paginate);
  }

  async findOne(id: string) {
    return await this.orderRepository.findOne((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return await this.orderRepository.update(id, updateOrderDto);
  }

  async remove(id: string) {
    return await this.orderRepository.softRemove((query) =>
      query.where('id', id).whereNull('deletedAt'),
    );
  }
}
