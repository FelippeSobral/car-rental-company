import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterDto } from '../dto/register.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  // users.service.ts
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // Remove qualquer hash automático aqui
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      throw new Error('Falha ao salvar usuário no banco de dados');
    }
  }
  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }
}