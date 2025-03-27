import { Entity, Column, PrimaryGeneratedColumn , OneToMany} from 'typeorm';
import { veiculos } from 'src/vehicles/entities/vehicles.entity';
@Entity('marcas')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @OneToMany(() => veiculos, (veiculo) => veiculo.marca)
  veiculos: veiculos[];
}

