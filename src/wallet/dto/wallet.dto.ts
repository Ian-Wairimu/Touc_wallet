import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsDecimal()
  balance: number;
  @IsNotEmpty()
  @IsString()
  businessName = '';
  @IsString()
  businessDescription: string;
  @IsNotEmpty()
  @IsString()
  businessEmail: string;
}
