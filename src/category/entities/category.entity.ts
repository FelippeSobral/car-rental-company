import { veiculos } from 'src/vehicles/entities/vehicles.entity';
import { Entity, Column, PrimaryGeneratedColumn , OneToMany} from 'typeorm';

@Entity('categorias')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, length: 50, nullable: false })
  descricao: string;

  @Column({ default: true }) // Ativo por padrão
  ativo: boolean;

  @OneToMany(() => veiculos, (veiculo) => veiculo.categoria)
  veiculos: veiculos[];


}