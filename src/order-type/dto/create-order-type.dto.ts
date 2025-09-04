import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrderTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
