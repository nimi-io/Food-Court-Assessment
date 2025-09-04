import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderTypeDto {
  @ApiProperty({
    description: 'Order type name (e.g., delivery, pickup, dine-in)',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Order type description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Is order type active', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
