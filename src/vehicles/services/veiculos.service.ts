import { Injectable } from '@nestjs/common';
import { Veiculo } from '../entities/veiculo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class VeiculosService {
   constructor(

    @InjectRepository(Veiculo)
    private readonly veiculoRepository: Repository<Veiculo>
   ){}

    async findAll(): Promise<Veiculo[]>{
        return this.veiculoRepository.find();
    }

    async findOne(id: number): Promise<Veiculo | null> {
        return this.veiculoRepository.findOne({ where: { id } });
      }

    async create(veiculo: Veiculo): Promise<Veiculo>  {
         return this.veiculoRepository.save(veiculo)
    }

    async update(id: number , veiculoAtualizado: Partial<Veiculo>): Promise<Veiculo | null> {
        await this.veiculoRepository.update(id, veiculoAtualizado)
        return this.veiculoRepository.findOne({where: {id}})
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.veiculoRepository.delete(id);
        return result.affected !== 0;
    }
}
