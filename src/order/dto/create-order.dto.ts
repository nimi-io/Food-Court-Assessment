import {
  IsString,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsDateString,
  IsObject,
  IsArray,
  IsInt,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'User ID who is placing the order',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Unique order code',
    example: 'ORD-2024-001',
  })
  @IsString()
  @IsNotEmpty()
  orderCode: string;

  @ApiPropertyOptional({
    description: 'Whether the order is completed',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @ApiPropertyOptional({
    description: 'Whether the order is cancelled',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  cancelled?: boolean;

  // Kitchen Management Fields
  @ApiPropertyOptional({
    description: 'Whether the kitchen has cancelled the order',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  kitchenCancelled?: boolean;

  @ApiPropertyOptional({
    description: 'Whether the kitchen has accepted the order',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  kitchenAccepted?: boolean;

  @ApiPropertyOptional({
    description: 'Whether the kitchen has dispatched the order',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  kitchenDispatched?: boolean;

  @ApiPropertyOptional({
    description: 'Time when kitchen dispatched the order',
    example: '2023-05-17T10:38:26.190Z',
  })
  @IsOptional()
  @IsDateString()
  kitchenDispatchedTime?: string;

  @ApiPropertyOptional({
    description: 'Time when order was completed',
    example: '2023-05-17T11:04:38.450Z',
  })
  @IsOptional()
  @IsDateString()
  completedTime?: string;

  @ApiPropertyOptional({
    description: 'Whether kitchen has prepared the order',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  kitchenPrepared?: boolean;

  @ApiPropertyOptional({
    description: 'Whether kitchen has verified the order',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  kitchenVerified?: boolean;

  @ApiPropertyOptional({
    description: 'Whether kitchen has completed the order',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  kitchenCompleted?: boolean;

  // Rider/Delivery Fields
  @ApiPropertyOptional({
    description: 'ID of the assigned rider',
    example: '2',
  })
  @IsOptional()
  @IsString()
  riderId?: string;

  @ApiPropertyOptional({
    description: 'Whether a rider is assigned',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  riderAssigned?: boolean;

  @ApiPropertyOptional({
    description: 'Whether rider has started delivery',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  riderStarted?: boolean;

  @ApiPropertyOptional({
    description: 'Time when rider started delivery',
    example: '2023-05-17T10:45:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  riderStartedTime?: string;

  @ApiPropertyOptional({
    description: 'Whether rider has arrived',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  riderArrived?: boolean;

  @ApiPropertyOptional({
    description: 'Time when rider arrived',
    example: '2023-05-17T11:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  riderArrivedTime?: string;

  // Shop Management
  @ApiPropertyOptional({
    description: 'Whether shop has accepted the order',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  shopAccepted?: boolean;

  @ApiPropertyOptional({
    description: 'Whether shop has prepared the order',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  shopPrepared?: boolean;

  // Payment and Order Details
  @ApiPropertyOptional({
    description: 'Whether the order is paid',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  paid?: boolean;

  @ApiPropertyOptional({
    description: 'Any changes made to the order',
    example: { items_removed: ['item1'], items_added: ['item2'] },
  })
  @IsOptional()
  @IsObject()
  orderChange?: any;

  @ApiPropertyOptional({
    description: 'Number of meal bags delivered',
    example: 0,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  noOfMealbagsDelivered?: number;

  @ApiPropertyOptional({
    description: 'Number of drinks delivered',
    example: 0,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  noOfDrinksDelivered?: number;

  // Failed Trip Handling
  @ApiPropertyOptional({
    description: 'Whether this is a failed trip',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isFailedTrip?: boolean;

  @ApiPropertyOptional({
    description: 'Details about failed trip',
    example: {},
    default: {},
  })
  @IsOptional()
  @IsObject()
  failedTripDetails?: any;

  // Location & Storage
  @ApiPropertyOptional({
    description: 'Box number for the order',
    example: 'TABLE',
  })
  @IsOptional()
  @IsString()
  boxNumber?: string;

  @ApiPropertyOptional({
    description: 'Shelf ID where order is placed',
    example: 'SHELF_A1',
  })
  @IsOptional()
  @IsString()
  shelfId?: string;

  // History & Tracking
  @ApiPropertyOptional({
    description: 'History of order total amount changes',
    example: [{ time: '2023-05-17T09:47:30.302Z', total_amount: 26785 }],
    default: [],
  })
  @IsOptional()
  @IsArray()
  orderTotalAmountHistory?: any[];

  // Scheduling
  @ApiPropertyOptional({
    description: 'Whether the order is scheduled',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  scheduled?: boolean;

  @ApiPropertyOptional({
    description: 'ID of person who confirmed the order',
    example: 'user123',
  })
  @IsOptional()
  @IsString()
  confirmedById?: string;

  @ApiPropertyOptional({
    description: 'ID of person who completed the order',
    example: 'user456',
  })
  @IsOptional()
  @IsString()
  completedById?: string;

  @ApiPropertyOptional({
    description: 'Scheduled delivery date',
    example: '2023-05-18',
  })
  @IsOptional()
  @IsDateString()
  scheduledDeliveryDate?: string;

  @ApiPropertyOptional({
    description: 'Scheduled delivery time',
    example: '14:30:00',
  })
  @IsOptional()
  @IsString()
  scheduledDeliveryTime?: string;

  @ApiPropertyOptional({
    description: 'Whether the order is hidden',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isHidden?: boolean;

  // Foreign Keys
  @ApiPropertyOptional({
    description: 'ID of the calculated order',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  calculatedOrderId?: string;
}
