import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { veiculos } from '../entities/vehicles.entity';
import { Category } from 'src/category/entities/category.entity';
import { Brand } from 'src/brand/entity/brand.entity';
import { CreateVehicleDto } from '../dto/CreateVehicleDto';

@Injectable()
export class VeiculosService {
    constructor(
        @InjectRepository(veiculos)
        private readonly veiculosRepository: Repository<veiculos>,
        @InjectRepository(Brand)
        private readonly brandRepository: Repository<Brand>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
      ) {}

     



    async findAll(): Promise<veiculos[]> {
        return this.veiculosRepository.find({
            relations: ['marca', 'categoria'] 
        });
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

    async create(createVehicleDto: CreateVehicleDto): Promise<veiculos> {
        // Buscando a marca e categoria utilizando os IDs passados no DTO
        const marca = await this.brandRepository.findOne({ where: { id: createVehicleDto.marcaId } });
        const categoria = await this.categoryRepository.findOne({ where: { id: createVehicleDto.categoriaId } });
    
        // Caso a marca ou a categoria não sejam encontradas, lança um erro
        if (!marca || !categoria) {
          throw new Error('Marca ou Categoria não encontrada');
        }
    
        // Criando o novo veículo com as entidades associadas
        const novoVeiculo = this.veiculosRepository.create({
          modelo: createVehicleDto.modelo,
          ano: createVehicleDto.ano,
          preco_diaria: createVehicleDto.preco_diaria,
          marca,        // A referência para a marca (associada via ManyToOne)
          categoria,    // A referência para a categoria (associada via ManyToOne)
        });
    
        // Salvando o novo veículo no banco de dados
        return this.veiculosRepository.save(novoVeiculo);
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