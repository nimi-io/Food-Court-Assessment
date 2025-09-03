import { IsString, IsBoolean, IsNumber, IsOptional, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsString()
    @IsNotEmpty()
    orderCode: string;

    @IsBoolean()
    completed: boolean;

    @IsBoolean()
    cancelled: boolean;

    @IsOptional()
    @IsBoolean()
    kitchenAccepted: boolean;
}
