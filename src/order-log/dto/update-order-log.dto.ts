import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateOrderLogDto } from './create-order-log.dto';

export class UpdateOrderLogDto extends PartialType(
  OmitType(CreateOrderLogDto, ['orderId'] as const),
) {}
