import {
  IsNumber,
  IsUUID,
  IsOptional,
  IsBoolean,
  IsInt,
  IsObject,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAddonDto {
  @ApiProperty({ description: 'Addon amount' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Addon images' })
  @IsObject()
  images: object;

  @ApiProperty({ description: 'Meal ID' })
  @IsUUID()
  mealId: string;

  @ApiProperty({ description: 'Is combo addon' })
  @IsBoolean()
  isCombo: boolean;

  @ApiProperty({ description: 'Display position', minimum: 0 })
  @IsInt()
  @Min(0)
  position: number;

  @ApiProperty({ description: 'Addon quantity', minimum: 1 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ description: 'Meal data object' })
  @IsObject()
  mealData: object;

  @ApiProperty({ description: 'POS system data' })
  @IsObject()
  posistData: object;

  @ApiPropertyOptional({ description: 'Meal addon ID' })
  @IsOptional()
  @IsUUID()
  mealAddonId?: string;

  @ApiProperty({ description: 'Internal profit', minimum: 0 })
  @IsNumber()
  @Min(0)
  internalProfit: number;

  @ApiPropertyOptional({ description: 'Minimum selection number' })
  @IsOptional()
  @IsString()
  minSelectionNo?: string;

  @ApiPropertyOptional({ description: 'Meal addon category ID' })
  @IsOptional()
  @IsUUID()
  mealAddonCategoryId?: string;
}
