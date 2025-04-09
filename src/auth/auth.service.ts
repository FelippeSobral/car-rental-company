import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './module/UserService.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
  ) {}

  /**
   * Valida as credenciais do usuário
   * @param email Email do usuário
   * @param pass Senha fornecida (não hasheada)
   * @returns Usuário sem a senha ou null se inválido
   */
  async validateUser(email: string, plainTextPassword: string): Promise<any> {

    const user = await this.usersService.findOneByEmail(email);
    if (!user) return null;

    console.log('Senha fornecida (texto puro):', plainTextPassword);
    console.log('Hash armazenado no banco:', user.password);
    
  
    const isPasswordValid = await bcrypt.compare(plainTextPassword, user.password);
    
    // 4. DEBUG Adicional
    if (!isPasswordValid) {
        console.log('Hash que seria gerado agora:', await bcrypt.hash(plainTextPassword, 10));
    }

    return isPasswordValid ? user : null;
}

  /**
   * Realiza o login do usuário
   * @param loginDto DTO com email e senha
   * @returns Token JWT e informações do usuário
   */
  async login(loginDto: LoginDto) {
    console.log(`[AuthService] Tentativa de login: ${loginDto.email}`);
    
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      console.log('[AuthService] Credenciais inválidas');
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { 
      email: user.email, 
      sub: user.id,
      name: user.name 
    };

    console.log(`[AuthService] Gerando token para usuário ID: ${user.id}`);
    
    return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
    };
  }

  /**
   * Registra um novo usuário
   * @param registerDto DTO com dados de registro
   * @returns Usuário criado (sem a senha)
   */
  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findOneByEmail(registerDto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email já está em uso');
    }
  
    // DEBUG: Mostre a senha original
    console.log('Senha original:', registerDto.password);
    
    // Gere o hash UMA ÚNICA VEZ
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    console.log('Hash gerado:', hashedPassword);
  
    // DEBUG: Verifique o hash antes de salvar
    const hashMatch = await bcrypt.compare(registerDto.password, hashedPassword);
    console.log('Teste de comparação pré-salvamento:', hashMatch);
  
    const newUser = await this.usersService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword
    });
  
    // Verifique o que foi realmente salvo no banco
    console.log('Hash armazenado no banco:', newUser.password);
    
    return newUser;
  }

  /**
   * Valida um token JWT
   * @param token Token JWT
   * @returns Payload do token ou null se inválido
   */
  //async validateToken(token: string): Promise<any> {
  //  try {
   //   return this.jwtService.verify(token);
   // } catch (e) {
   //   console.error('[AuthService] Token inválido:', e.message);
   //   return null;
   // }
  }
