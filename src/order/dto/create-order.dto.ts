import {
  IsString,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'User ID who is placing the order',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Unique order code',
    example: 'ORD-2024-001',
  })
  @IsString()
  @IsNotEmpty()
  orderCode: string;

  @ApiProperty({
    description: 'Whether the order is completed',
    example: false,
  })
  @IsBoolean()
  completed: boolean;

  @ApiProperty({
    description: 'Whether the order is cancelled',
    example: false,
  })
  @IsBoolean()
  cancelled: boolean;

  @ApiPropertyOptional({
    description: 'Whether the kitchen has accepted the order',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  kitchenAccepted: boolean;
}
