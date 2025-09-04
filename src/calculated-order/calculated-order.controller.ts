import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CalculatedOrderService } from './calculated-order.service';
import { CreateCalculatedOrderDto } from './dto/create-calculated-order.dto';
import { UpdateCalculatedOrderDto } from './dto/update-calculated-order.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('calculated-order')
export class CalculatedOrderController {
  constructor(
    private readonly calculatedOrderService: CalculatedOrderService,
  ) {}

  @Post()
  create(@Body() createCalculatedOrderDto: CreateCalculatedOrderDto) {
    return this.calculatedOrderService.create(createCalculatedOrderDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'userId', required: true })
  @ApiQuery({ name: 'cokitchenId', required: false })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('userId') userId: string,
    @Query('cokitchenId') cokitchenId: string,
  ) {
    if (!userId) {
      throw new BadRequestException('userId is required');
    }
    return this.calculatedOrderService.findAll(
      { page, limit },
      userId,
      cokitchenId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calculatedOrderService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCalculatedOrderDto: UpdateCalculatedOrderDto,
  ) {
    return this.calculatedOrderService.update(id, updateCalculatedOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calculatedOrderService.remove(id);
  }
}
