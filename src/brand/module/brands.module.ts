import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsService } from '../service/brands.service';
import { BrandsController } from '../controller/brands.controller';
import { Brand } from '../entity/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  providers: [BrandsService],
  controllers: [BrandsController],
})
export class BrandsModule {}
