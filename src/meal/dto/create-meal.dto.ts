import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateMealDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsUUID()
  calculatedOrderId: string;
}
