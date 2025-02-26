import {Column, Entity , PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { Brand } from 'src/brand/entity/brand.entity';
import { Category } from 'src/category/entities/category.entity';

@Entity('veiculos')
export class veiculos{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  modelo: string;

  @Column({ type: 'int', nullable: false })
  ano: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  preco_diaria: number;

  @ManyToOne(() => Brand, (brand) => brand.veiculos, { nullable: false, onDelete: 'CASCADE' })
  marca: Brand;

  @ManyToOne(() => Category, (category) => category.veiculos, { nullable: false, onDelete: 'CASCADE' })
  categoria: Category;
}