import { IsBoolean, IsString, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  orderCode: string;

  @IsOptional()
  @IsBoolean()
  completed: boolean;

  @IsOptional()
  @IsBoolean()
  cancelled: boolean;

  @IsOptional()
  @IsBoolean()
  kitchenAccepted: boolean;
}
