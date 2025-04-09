import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { VeiculosService } from '../services/vehicles.service';
import { veiculos } from '../entities/vehicles.entity';
import { CreateVehicleDto } from '../dto/CreateVehicleDto';

@Controller('api/vehicles')
export class VeiculosController {
    constructor(private readonly veiculosService: VeiculosService){}

  


    @Get()
    async findAll(): Promise<veiculos[]> {
        return this.veiculosService.findAll();
    }

    @Get('count')
    async count(): Promise<number> {
        return this.veiculosService.count();
    }

    @Get('recent')
    async findRecent(@Query('limit') limit = 5): Promise<veiculos[]> {
        return this.veiculosService.findRecent(limit);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<veiculos | null> {
        return this.veiculosService.findOne(id);
    }

    @Post()
    async create(@Body() createVehicleDto: CreateVehicleDto) {
        return this.veiculosService.create(createVehicleDto);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() veiculoAtualizado: Partial<veiculos>): Promise<veiculos | null> {
        return this.veiculosService.update(id, veiculoAtualizado);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<boolean> {
        return this.veiculosService.delete(id);
    }
}