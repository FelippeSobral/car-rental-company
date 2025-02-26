import { Entity, Column, PrimaryGeneratedColumn , OneToMany} from 'typeorm';
import { veiculos } from 'src/vehicles/entities/veiculo.entity';
@Entity('marcas')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  nome: string;

  @OneToMany(() => veiculos, (veiculo) => veiculo.marca)
  veiculos: veiculos[];


}

