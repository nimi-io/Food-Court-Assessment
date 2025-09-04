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
import { AddonService } from './addon.service';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('addon')
export class AddonController {
  constructor(private readonly addonService: AddonService) {}

  @Post()
  create(@Body() createAddonDto: CreateAddonDto) {
    return this.addonService.create(createAddonDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 20) {
    return this.addonService.findAll({ page, limit });
  }

  @Get('meal/:mealId')
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAllByMealId(
    @Param('mealId') mealId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.addonService.findAllByMealId(mealId, { page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addonService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddonDto: UpdateAddonDto) {
    return this.addonService.update(id, updateAddonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addonService.remove(id);
  }
}
