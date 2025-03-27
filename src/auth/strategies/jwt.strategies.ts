import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // Extrai o JWT de várias fontes possíveis
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // 1. Verifica os cookies (útil para aplicações web)
          if (request?.cookies?.Authentication) {
            return request.cookies.Authentication;
          }
          
          // 2. Verifica o header Authorization (Bearer token)
          const authHeader = request?.headers?.authorization;
          if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
            return authHeader.split(' ')[1];
          }
          
          return null;
        }
      ]),
      
      // Não ignora a expiração do token
      ignoreExpiration: false,
      
      // Chave secreta vinda das variáveis de ambiente
      secretOrKey: configService.get<string>('JWT_SECRET') || 'fallbackSecret123!',
      
      
    });
  }

  /**
   * Método chamado quando o token é validado com sucesso
   * @param payload Conteúdo decodificado do JWT
   * @returns Dados do usuário que serão injetados em @Request() req.user
   */
  async validate(payload: any) {
    return { 
      userId: payload.sub,       // ID do usuário
      email: payload.email,      // Email do usuário
      roles: payload.roles || [] // Roles/permissões (opcional)
    };
  }
}