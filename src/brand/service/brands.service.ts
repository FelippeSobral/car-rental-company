import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../entity/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async count(): Promise<number> {
    return this.brandRepository.count();
}

  async findAll(): Promise<Brand[]> {
    return this.brandRepository.find();
  }

  async findOne(id: number): Promise<Brand> {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return brand;
  }

  async create(name: string): Promise<Brand> {
    const newBrand = this.brandRepository.create({ name });
    return this.brandRepository.save(newBrand);
  }

  async update(id: number, name: string): Promise<Brand> {
    console.log(await this.findOne(id));
    await this.findOne(id);
    await this.brandRepository.update( {id} , { name });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.brandRepository.delete(id);
  }
}
