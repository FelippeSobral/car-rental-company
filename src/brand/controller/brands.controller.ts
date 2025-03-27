import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BrandsService } from '../service/brands.service';

@Controller('api/brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.brandsService.findOne(id);
  }

  @Post()
  create(@Body('name') name: string) {
    return this.brandsService.create(name);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body('name') name: string) {
    return this.brandsService.update(id, name);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.brandsService.remove(id);
  }
}
