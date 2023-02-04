import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Wallet } from '../../wallet/wallet.entity';

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
  wallets: Wallet[];
}
