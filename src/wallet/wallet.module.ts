import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { CreateWalletDto } from './dto/wallet.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  controllers: [WalletController],
  providers: [WalletService, CreateWalletDto],
  exports: [TypeOrmModule, WalletService],
})
export class WalletModule {}
