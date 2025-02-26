import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost', 
  port: 5433,
  username: 'postgres',
  password: 'felippe161121',
  database: 'postgres',
  autoLoadEntities: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,  
  migrations: [__dirname + '/../migrations/*.ts'],
};
