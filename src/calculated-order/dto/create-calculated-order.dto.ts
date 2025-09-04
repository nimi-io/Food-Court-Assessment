import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsUUID,
  IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCalculatedOrderDto {
  @ApiProperty({ description: 'Total amount of the order' })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({ description: 'Whether delivery is free' })
  @IsBoolean()
  freeDelivery: boolean;

  @ApiProperty({ description: 'Delivery fee amount' })
  @IsNumber()
  deliveryFee: number;

  @ApiProperty({ description: 'Service charge amount' })
  @IsNumber()
  serviceCharge: number;

  @ApiPropertyOptional({
    description: 'Address details object',
    example: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    },
  })
  @IsOptional()
  @IsObject()
  addressDetails?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Latitude coordinate',
    example: '12.345678',
  })
  @IsOptional()
  @IsString()
  lat?: string;

  @ApiPropertyOptional({
    description: 'Longitude coordinate',
    example: '12.345678',
  })
  @IsOptional()
  @IsString()
  lng?: string;

  @ApiPropertyOptional({ description: 'Co-kitchen polygon ID' })
  @IsOptional()
  @IsString()
  cokitchenPolygonId?: string;

  @ApiPropertyOptional({ description: 'User ID' })
  @IsOptional()
  @IsString()
  @IsUUID()
  userId?: string; // If this should be a UUID use @IsUUID()

  @ApiPropertyOptional({ description: 'Co-kitchen ID' })
  @IsOptional()
  @IsString()
  @IsUUID()
  cokitchenId?: string;

  @ApiPropertyOptional({ description: 'Whether this is a pickup order' })
  @IsOptional()
  @IsBoolean()
  pickup?: boolean;

  @ApiPropertyOptional({ description: 'Previous price amount' })
  @IsOptional()
  @IsNumber()
  prevPrice?: number;
}
