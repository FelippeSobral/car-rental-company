import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { veiculos } from '../entities/vehicles.entity';
import { VeiculosService } from '../services/vehicles.service';
import { VeiculosController } from '../controller/vehicles.controller';


@Module({

  imports: [TypeOrmModule.forFeature([veiculos])], // Importa a entidade para o TypeORM
  controllers: [VeiculosController], // Adiciona o controller das rotas
  providers: [VeiculosService], // Adiciona o service para a lógica do CRUD
  exports: [VeiculosService] // Permite que outros módulos usem o serviço, se necessário
  
})
export class VeiculosModule {}
