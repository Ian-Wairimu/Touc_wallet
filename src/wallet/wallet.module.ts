import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/wallet.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  providers: [WalletService, CreateWalletDto],
  exports: [TypeOrmModule, WalletService],
})
export class WalletModule {}
