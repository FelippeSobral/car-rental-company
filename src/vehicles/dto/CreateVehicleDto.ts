import { IsString, IsInt, IsNumber, Min, Max } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  modelo: string;

  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear()) // Ano não pode ser maior que o atual
  ano: number;

  @IsNumber()
  @Min(0)
  preco_diaria: number;

  @IsInt()
  marcaId: number;

  @IsInt()
  categoriaId: number;
}
