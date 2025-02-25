import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veiculo } from '../entities/veiculo.entity';
import { VeiculosService } from '../services/veiculos.service';
import { VeiculosController } from '../controller/veiculos.controller';


@Module({

  imports: [TypeOrmModule.forFeature([Veiculo])], // Importa a entidade para o TypeORM
  controllers: [VeiculosController], // Adiciona o controller das rotas
  providers: [VeiculosService], // Adiciona o service para a lógica do CRUD
  exports: [VeiculosService] // Permite que outros módulos usem o serviço, se necessário
  
})
export class VeiculosModule {}
