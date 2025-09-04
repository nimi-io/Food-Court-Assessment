import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './order.repository';
import { IDefaultOptions } from '../shared/common/paginate-result.interface';
import { ORDER_NEXT_STEPS } from '@src/shared/emun/index.enum';
import { OrderLogRepository } from '@src/order-log/order-log.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderLogRepository: OrderLogRepository,
  ) {}

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
      query.where('id', id).whereNull('deletedAt').withGraphFetched(`[
          calculatedOrder.[meals.[addons]],
          logs,
          orderType
        ]`),
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

  async processOrder(orderId: string) {
    /**
     * ●
Validates the order status.
●
Checks kitchen processes (accepted, prepared, dispatched).
●
Calculates the total order amount, including addons.
●
Updates and logs the order status.
     */
    const existingOrder = await this.orderRepository.findOne((query) =>
      query.where('id', orderId).whereNull('deletedAt'),
    );

    if (!existingOrder) {
      throw new BadRequestException('Order does not exist');
    }

    if (existingOrder.completed) {
      throw new BadRequestException('Order is already completed');
    }

    if (existingOrder.cancelled) {
      throw new BadRequestException(
        'Order is cancelled and cannot be processed',
      );
    }

    const kitchenChecks = {
      accept: !existingOrder.kitchenCancelled && !existingOrder.kitchenAccepted,
      prepare: existingOrder.kitchenAccepted && !existingOrder.kitchenPrepared,
      complete:
        existingOrder.kitchenPrepared && !existingOrder.kitchenCompleted,
      dispatch:
        existingOrder.kitchenCompleted && !existingOrder.kitchenDispatched,
    };
    let nextStep: ORDER_NEXT_STEPS | null = null;
    let statusUpdate: Record<string, any> = {};
    let logDescription = '';

    if (kitchenChecks.accept) {
      nextStep = ORDER_NEXT_STEPS.ACCEPT;
      statusUpdate = { kitchenAccepted: true };
      logDescription = 'Order accepted by kitchen';
    } else if (kitchenChecks.prepare) {
      nextStep = ORDER_NEXT_STEPS.PREPARE;
      statusUpdate = { kitchenPrepared: true };
      logDescription = 'Order prepared by kitchen';
    } else if (kitchenChecks.complete) {
      nextStep = ORDER_NEXT_STEPS.COMPLETE;
      statusUpdate = { kitchenCompleted: true };
      logDescription = 'Order completed by kitchen';
    } else if (kitchenChecks.dispatch) {
      nextStep = ORDER_NEXT_STEPS.DISPATCH;
      statusUpdate = { kitchenDispatched: true };
      logDescription = 'Order dispatched by kitchen';
    }

    ///calculate total cost including addons
    let totalAmount = 0;
    if (existingOrder.calculatedOrder?.meals) {
      for (const meal of existingOrder.calculatedOrder.meals) {
        totalAmount += parseFloat(meal.amount.toString()) || 0;
        if (meal.addons) {
          for (const addon of meal.addons) {
            totalAmount += addon.amount || 0;
          }
        }
      }
    }

    if (existingOrder.calculatedOrder) {
      totalAmount +=
        parseFloat(existingOrder.calculatedOrder.deliveryFee.toString()) || 0;
      totalAmount +=
        parseFloat(existingOrder.calculatedOrder.serviceCharge.toString()) || 0;
    }

    const amountHistory = existingOrder.orderTotalAmountHistory || [];
    amountHistory.push({
      time: new Date().toISOString(),
      total_amount: totalAmount,
    });

    statusUpdate.orderTotalAmountHistory = amountHistory;

    //UPDATE

    if (nextStep === ORDER_NEXT_STEPS.DISPATCH) {
      statusUpdate.completed = true;
      statusUpdate.completedTime = new Date().toISOString();
    }

    const updateResult = await this.orderRepository.update(
      orderId,
      statusUpdate,
    );
    const orderLog = await this.orderLogRepository.create({
      orderId: orderId,
      description: logDescription,
      time: new Date().toISOString(),
    });

    return {
      order: updateResult,
      log: orderLog,
      processedStep: nextStep,
      totalAmount: totalAmount,
      message: `Order successfully processed: ${logDescription}`,
    };
  }
}
