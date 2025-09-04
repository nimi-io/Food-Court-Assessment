import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsUUID,
  IsObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCalculatedOrderDto {
  @ApiProperty({ description: 'Total amount of the order', required: false })
  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  @ApiProperty({ description: 'Whether delivery is free', required: false })
  @IsOptional()
  @IsBoolean()
  freeDelivery?: boolean;

  @ApiProperty({ description: 'Delivery fee amount', required: false })
  @IsOptional()
  @IsNumber()
  deliveryFee?: number;

  @ApiProperty({ description: 'Service charge amount', required: false })
  @IsOptional()
  @IsNumber()
  serviceCharge?: number;

  @ApiProperty({ description: 'Address details object', required: false })
  @IsOptional()
  @IsObject()
  addressDetails?: Record<string, any>;

  @ApiProperty({ description: 'Latitude coordinate', required: false })
  @IsOptional()
  @IsString()
  lat?: string;

  @ApiProperty({ description: 'Longitude coordinate', required: false })
  @IsOptional()
  @IsString()
  lng?: string;

  @ApiProperty({ description: 'Co-kitchen polygon ID', required: false })
  @IsOptional()
  @IsString()
  cokitchenPolygonId?: string;

  @ApiProperty({ description: 'User ID', required: false })
  @IsOptional()
  @IsString()
  @IsUUID()
  userId?: string; // If UUID constraint needed add @IsUUID()

  @ApiProperty({ description: 'Co-kitchen ID', required: false })
  @IsOptional()
  @IsString()
  @IsUUID()
  cokitchenId?: string;

  @ApiProperty({ description: 'Whether order is for pickup', required: false })
  @IsOptional()
  @IsBoolean()
  pickup?: boolean;

  @ApiProperty({ description: 'Previous price amount', required: false })
  @IsOptional()
  @IsNumber()
  prevPrice?: number;
}
