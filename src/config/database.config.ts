import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getEnv, getEnvNumber, getEnvBoolean } from '../utils/env.utils';
import { AuthModule } from 'src/auth/auth.module';

import { join } from 'path';
import { Brand } from '../brand/entity/brand.entity';
import { Category } from '../category/entities/category.entity';
import { veiculos } from '../vehicles/entities/vehicles.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: getEnv('DB_HOST', 'localhost'),
  port: getEnvNumber('DB_PORT', 5433),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'felippe161121',
  database: process.env.DB_NAME || 'postgres',

  // Configuração de entidades (caminhos corrigidos)
  entities: [
    Brand,
    Category,
    veiculos,
    
    // Adicione outras entidades conforme necessário
  ],

  // Configuração alternativa para carregar automaticamente
  autoLoadEntities: true,

  // Configuração de migrações (caminho corrigido)
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  migrationsRun: process.env.NODE_ENV === 'production',
  migrationsTableName: 'typeorm_migrations',

  // Sincronização automática apenas em desenvolvimento
  synchronize: process.env.NODE_ENV !== 'production',

  // Logging
  logging: process.env.NODE_ENV === 'development',
  logger: 'advanced-console',

  // Configurações extras
  
  
  // SSL para produção
  ssl: process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: false
  } : false,
};