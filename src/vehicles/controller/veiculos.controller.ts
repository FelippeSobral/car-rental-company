import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { VeiculosService } from '../services/veiculos.service';
import { Veiculo } from '../entities/veiculo.entity';

@Controller('veiculos')
export class VeiculosController {
    constructor(private readonly veiculosService: VeiculosService){}

    @Get()
    async findAll():Promise<Veiculo[]> {
        return this.veiculosService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Veiculo | null> {
      return this.veiculosService.findOne(id);
    }

    @Post()
    async create(@Body() veiculo: Veiculo): Promise<Veiculo> {
        return this.veiculosService.create(veiculo);
    }


    @Put(':id')
    update(@Param('id') id:number, @Body() veiculoAtualizado: Partial<Veiculo>): Promise<Veiculo | null> {
        return this.veiculosService.update(id, veiculoAtualizado);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<boolean> {
        return this.veiculosService.delete(id);
  }
}
