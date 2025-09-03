import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateCalculatedOrderDto {
  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  @IsOptional()
  @IsBoolean()
  freeDelivery?: boolean;

  @IsOptional()
  @IsNumber()
  deliveryFee?: number;

  @IsOptional()
  @IsNumber()
  serviceCharge?: number;

  @IsOptional()
  @IsString()
  addressDetails?: string;
}
