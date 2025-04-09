import { NestFactory } from '@nestjs/core';
import { AppModule } from './vehicles/module/app.module';
import * as cors from 'cors';
import * as dotenv from 'dotenv';


async function bootstrap() {
  dotenv.config(); // Carregar variáveis do .env

  const app = await NestFactory.create(AppModule);



  
  app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
    
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']

  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
