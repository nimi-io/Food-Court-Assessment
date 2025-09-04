import {
  IsString,
  IsNumber,
  IsOptional,
  IsUUID,
  IsBoolean,
  IsArray,
  IsInt,
  IsObject,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMealDto {
  @ApiProperty({ description: 'Meal name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Meal amount' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Is new meal' })
  @IsBoolean()
  new: boolean;

  @ApiProperty({ description: 'Is meal active' })
  @IsBoolean()
  active: boolean;

  @ApiProperty({ description: 'Meal images', type: [String] })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({ description: 'Contains alcohol' })
  @IsBoolean()
  alcohol: boolean;

  @ApiPropertyOptional({ description: 'Item number' })
  @IsOptional()
  @IsString()
  itemNo?: string;

  @ApiPropertyOptional({ description: 'Meal summary' })
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiProperty({ description: 'Brand ID' })
  @IsUUID()
  brandId: string;

  @ApiPropertyOptional({ description: 'Calories information' })
  @IsOptional()
  @IsString()
  calories?: string;

  @ApiProperty({ description: 'Is addon item' })
  @IsBoolean()
  isAddon: boolean;

  @ApiProperty({ description: 'Is combo meal' })
  @IsBoolean()
  isCombo: boolean;

  @ApiProperty({ description: 'Display position', minimum: 0 })
  @IsInt()
  @Min(0)
  position: number;

  @ApiProperty({ description: 'Available quantity', minimum: 1 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ description: 'Show on home page' })
  @IsBoolean()
  homePage: boolean;

  @ApiPropertyOptional({ description: 'Item type' })
  @IsOptional()
  @IsString()
  itemType?: string;

  @ApiProperty({ description: 'Meal tags', type: [String] })
  @IsArray()
  @IsString({ each: true })
  mealTags: string[];

  @ApiProperty({ description: 'Is deleted' })
  @IsBoolean()
  isDeleted: boolean;

  @ApiPropertyOptional({ description: 'Order note' })
  @IsOptional()
  @IsString()
  orderNote?: string;

  @ApiPropertyOptional({ description: 'Meal description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Minimum age requirement' })
  @IsOptional()
  @IsString()
  minimumAge?: string;

  @ApiProperty({ description: 'POS system data' })
  @IsObject()
  posistData: Record<string, any>;

  @ApiPropertyOptional({ description: 'Available number' })
  @IsOptional()
  @IsString()
  availableNo?: string;

  @ApiProperty({ description: 'Meal keywords', type: [String] })
  @IsArray()
  @IsString({ each: true })
  mealKeywords: string[];

  @ApiProperty({ description: 'Internal profit', minimum: 0 })
  @IsNumber()
  @Min(0)
  internalProfit: number;

  @ApiPropertyOptional({ description: 'Meal category ID' })
  @IsOptional()
  @IsUUID()
  mealCategoryId?: string;

  @ApiPropertyOptional({ description: 'Calculated order ID' })
  @IsOptional()
  @IsUUID()
  calculatedOrderId?: string;
}
