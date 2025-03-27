import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { veiculos } from '../entities/vehicles.entity';

@Injectable()
export class VeiculosService {
    constructor(
        @InjectRepository(veiculos)
        private readonly veiculosRepository: Repository<veiculos>,
    ) {}

    async findAll(): Promise<veiculos[]> {
        return this.veiculosRepository.find();
    }

    async count(): Promise<number> {
        return this.veiculosRepository.count();
    }

    async findRecent(limit: number = 5): Promise<veiculos[]> {
        return this.veiculosRepository.find({
            order: {
                createdAt: 'DESC'
            },
            take: limit,
            relations: ['marca', 'categoria']
        });
    }

    async findOne(id: number): Promise<veiculos | null> {
        return this.veiculosRepository.findOne({
            where: { id },
            relations: ['marca', 'categoria']
        });
    }

    async create(veiculo: veiculos): Promise<veiculos> {
        return this.veiculosRepository.save(veiculo);
    }

    async update(id: number, veiculoAtualizado: Partial<veiculos>): Promise<veiculos | null> {
        await this.veiculosRepository.update(id, veiculoAtualizado);
        return this.veiculosRepository.findOneBy({ id });
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.veiculosRepository.delete(id);
        return result?.affected ? result.affected > 0 : false;
    }
}