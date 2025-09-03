import { IsString, IsDate, IsOptional } from 'class-validator';

export class UpdateOrderLogDto {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDate()
  time: string;
}
