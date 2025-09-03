import { IsString, IsNumber, IsUUID, IsOptional } from 'class-validator';

export class CreateAddonDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsUUID()
  mealId: string;

  @IsOptional()
  @IsString()
  description?: string;
}
