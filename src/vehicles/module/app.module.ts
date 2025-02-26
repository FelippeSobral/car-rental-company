import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculosModule } from './veiculos.module';
import { BrandsModule } from 'src/brand/module/brands.module';
import { CategoriesModule } from 'src/category/module/categories.module';
import { databaseConfig } from 'src/config/database.config';
import { Brand } from 'src/brand/entity/brand.entity';
import { Category } from 'src/category/entities/category.entity';
import { veiculos } from '../entities/veiculo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseConfig,
      entities: [Brand, Category, veiculos],  
    }),
    VeiculosModule,
    BrandsModule,
    CategoriesModule,
  ],
})
export class AppModule {}
