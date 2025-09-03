import { IsString, IsNumber, IsUUID, IsOptional } from 'class-validator';

export class UpdateAddonDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsUUID()
  mealId?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
