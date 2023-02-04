import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { WalletController } from './wallet.controller';
import { UsersModule } from '../users/users.module';
@Module({
  imports: [TypeOrmModule.forFeature([Wallet]), UsersModule],
  providers: [WalletService],
  exports: [TypeOrmModule, WalletService],
  controllers: [WalletController],
})
export class WalletModule {}
