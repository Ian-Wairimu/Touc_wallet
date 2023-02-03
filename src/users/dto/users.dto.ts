import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;
  @IsNotEmpty()
  lastname: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
}
