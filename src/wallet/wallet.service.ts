import { Injectable } from '@nestjs/common';
import { Wallet } from './wallet.entity';
import { CreateWalletDto } from './dto/wallet.dto';
import { validate } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
  ) {}
  async createWallet(createWalletDto: CreateWalletDto) {
    const wallet = this.walletRepository.create(createWalletDto);
    const errors = await validate(wallet);
    if (errors.length > 0) {
      throw new Error('validation failed..');
    } else {
      await this.walletRepository.save(wallet);
    }
    return wallet;
  }
  findAll(): Promise<Wallet[]> {
    return this.walletRepository.find();
  }
  findOne(id: number): Promise<Wallet> {
    return this.walletRepository.findOneBy({ walletId: id });
  }
  async remove(id: number): Promise<void> {
    await this.walletRepository.delete(id);
  }
}
