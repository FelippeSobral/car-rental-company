import { IsEmail, IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';
import { PasswordMatch } from '../decoretor/password-match.decorator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Validate(PasswordMatch, ['password'])
  confirmPassword: string;
}