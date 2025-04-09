import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from './module/users.module';
import { JwtStrategy } from './strategies/jwt.strategies';
JwtStrategy

console.log('JWT_SECRET carregado:', process.env.JWT_SECRET);

@Module({
    imports: [
      TypeOrmModule.forFeature([User]),
      PassportModule,
      UsersModule,
      // Remova o JwtModule
    ],
    providers: [
      AuthService,
      LocalStrategy,
      // Remova o JwtStrategy
    ],
    controllers: [AuthController],
    exports: [AuthService],
  })
export class AuthModule {}
