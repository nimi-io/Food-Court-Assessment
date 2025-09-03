import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateOrderLogDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  description: string;

  @IsDate()
  time: string;
}
