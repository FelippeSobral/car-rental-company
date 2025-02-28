import { Injectable, NotFoundException } from '@nestjs/common';
import { veiculos } from '../entities/veiculo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class VeiculosService {
   constructor(

    @InjectRepository(veiculos)
    private readonly veiculoRepository: Repository<veiculos>
   ){}

    async findAll(): Promise<veiculos[]>{
        return this.veiculoRepository.find();
    }

    async findOne(id: number): Promise<veiculos | null> {
        return this.veiculoRepository.findOne({ where: { id } }) || Promise.reject(new NotFoundException('veiculo não encontrado'));
      }

    async create(veiculo: veiculos): Promise<veiculos>  {
         return this.veiculoRepository.save(veiculo)
    }

    async update(id: number , veiculoAtualizado: Partial<veiculos>): Promise<veiculos | null> {
        await this.veiculoRepository.update(id, veiculoAtualizado)
        return this.veiculoRepository.findOne({where: {id}})
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.veiculoRepository.delete(id);
        return result.affected !== 0;
    }
    
}

