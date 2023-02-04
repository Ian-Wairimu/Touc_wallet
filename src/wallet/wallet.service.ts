import { Injectable } from '@nestjs/common';
import { Wallet } from './wallet.entity';
import { CreateWalletDto } from './dto/wallet.dto';
import { validate } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {
  wallet: Wallet;
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
  ) {}
  async createWallet(
    createWalletDto: CreateWalletDto,
  ): Promise<CreateWalletDto> {
    this.wallet = this.walletRepository.create(createWalletDto);
    const errors = await validate(this.wallet);
    if (errors.length > 0) {
      throw new Error('validation failed..');
    } else {
      await this.walletRepository.save(this.wallet);
    }

    return this.wallet;
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
