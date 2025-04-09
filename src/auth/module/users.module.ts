import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from './UserService.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Isso permite injeção do repositório User
  ],
  providers: [UsersService],
  exports: [UsersService], // Exporta para que outros módulos possam usar
})
export class UsersModule {}