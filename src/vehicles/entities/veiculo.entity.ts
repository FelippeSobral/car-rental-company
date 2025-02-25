import {Column, Entity , PrimaryGeneratedColumn} from 'typeorm';

@Entity('veiculos')
export class Veiculo {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    marca: string;
    @Column()
    modelo: string;
    @Column()
    ano: number;
    @Column()
    categoria: string;
  }