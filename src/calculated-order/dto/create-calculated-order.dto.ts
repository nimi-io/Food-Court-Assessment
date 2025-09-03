import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateCalculatedOrderDto {
  @IsNumber()
  totalAmount: number;

  @IsBoolean()
  freeDelivery: boolean;

  @IsNumber()
  deliveryFee: number;

  @IsNumber()
  serviceCharge: number;

  @IsOptional()
  addressDetails: string;
}
