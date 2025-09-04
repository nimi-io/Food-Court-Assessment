import { IsBoolean, IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiPropertyOptional({
    description: 'Order code',
    example: 'ORD-12345'
  })
  @IsOptional()
  @IsString()
  orderCode: string;

  @ApiPropertyOptional({
    description: 'Whether the order is completed',
    example: false
  })
  @IsOptional()
  @IsBoolean()
  completed: boolean;

  @ApiPropertyOptional({
    description: 'Whether the order is cancelled',
    example: false
  })
  @IsOptional()
  @IsBoolean()
  cancelled: boolean;

  @ApiPropertyOptional({
    description: 'Whether the order is accepted by kitchen',
    example: true
  })
  @IsOptional()
  @IsBoolean()
  kitchenAccepted: boolean;
}
