import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

    async count(): Promise<number> {
      return this.categoryRepository.count();
  }


  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async create(descricao: string): Promise<Category> {

  const exists = await this.categoryRepository.findOne({ where: { descricao } });

  if (exists) {
    throw new Error('Categoria com essa descrição já existe.');
  }

    const newCategory = this.categoryRepository.create({ descricao });
    return this.categoryRepository.save(newCategory);
  }
  

  async update(id: number, descricao: string): Promise<Category> {
    await this.findOne(id);
    await this.categoryRepository.update(id, { descricao: descricao }); 
    return this.findOne(id);
  }
  

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.categoryRepository.delete(id);
  }
}