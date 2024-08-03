import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  /**
   * @example 'jon'
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * @example 'jon@email.com'
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * @example 'secretpass'
   */
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
