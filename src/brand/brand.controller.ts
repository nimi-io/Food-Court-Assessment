import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { IDefaultOptions } from '@src/shared/common/paginate-result.interface';

@ApiTags('Brand')
@Controller('brand')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new brand' })
  @ApiResponse({ status: 201, description: 'Brand successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all brands' })
  @ApiResponse({ status: 200, description: 'Brands successfully retrieved' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page',
  })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    const paginate: IDefaultOptions = {
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
    };
    return this.brandService.findAll(paginate);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a brand by ID' })
  @ApiResponse({ status: 200, description: 'Brand successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.brandService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a brand' })
  @ApiResponse({ status: 200, description: 'Brand successfully updated' })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandService.update(id, updateBrandDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a brand' })
  @ApiResponse({ status: 200, description: 'Brand successfully deleted' })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.brandService.remove(id);
  }
}
