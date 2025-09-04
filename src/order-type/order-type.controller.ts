import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrderTypeService } from './order-type.service';
import { CreateOrderTypeDto } from './dto/create-order-type.dto';
import { UpdateOrderTypeDto } from './dto/update-order-type.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('order-types')
@Controller('order-type')
export class OrderTypeController {
  constructor(private readonly orderTypeService: OrderTypeService) {}

  @Post()
  create(@Body() createOrderTypeDto: CreateOrderTypeDto) {
    return this.orderTypeService.create(createOrderTypeDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 20) {
    return this.orderTypeService.findAll({ page, limit });
  }

  @Get('active')
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAllActive(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.orderTypeService.findAllActive({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderTypeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderTypeDto: UpdateOrderTypeDto,
  ) {
    return this.orderTypeService.update(id, updateOrderTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderTypeService.remove(id);
  }
}
