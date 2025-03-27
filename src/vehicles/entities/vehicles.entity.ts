import {Column, Entity , PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn} from 'typeorm';
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

  @ManyToOne(() => Brand, (brand) => brand.veiculos, { 
    nullable: false,
    onDelete: 'CASCADE',
    eager: true // Carrega automaticamente a marca ao buscar o veículo
  })
  @JoinColumn({ name: 'marcaId' })
  marca: Brand;


  @ManyToOne(() => Category, (category) => category.veiculos, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true // Carrega automaticamente a categoria ao buscar o veículo
  })
  @JoinColumn({ name: 'categoriaId' })
  categoria: Category;

  @CreateDateColumn()
  createdAt?: Date;
  
 
}