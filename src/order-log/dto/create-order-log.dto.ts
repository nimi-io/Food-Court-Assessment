import { IsString, IsNotEmpty, IsDate, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderLogDto {
  @ApiProperty({
    description: 'The ID of the order',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({
    description: 'Description of the order log entry',
    example: 'Order status updated to processing',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Timestamp of the log entry',
    example: '2023-12-01T10:30:00Z',
  })
  // @IsDate()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/, {
    message: 'time must be a valid ISO 8601 date string',
  })
  time: string;
}
