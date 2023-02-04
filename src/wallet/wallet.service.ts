import { Injectable } from '@nestjs/common';
import { Wallet } from './wallet.entity';
import { CreateWalletDto } from './dto/wallet.dto';
import { validate } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class WalletService {
  wallet: Wallet;
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    private readonly userService: UsersService,
  ) {}
  async createWallet(
    createWalletDto: CreateWalletDto,
  ): Promise<CreateWalletDto> {
    this.wallet = this.walletRepository.create(createWalletDto);
    const errors = await validate(this.wallet);
    if (errors.length > 0) {
      throw new Error('validation failed..');
    } else {
      this.wallet['user'] = this.userService.user;
      await this.walletRepository.save(this.wallet);
    }

    return this.wallet;
  }
  findById(walletsId: number): Promise<Wallet> {
    return this.walletRepository.findOne({
      where: {
        walletId: walletsId,
      },
    });
  }
  async deposit(
    id: number,
    walletDto: CreateWalletDto,
  ): Promise<CreateWalletDto> {
    if (!id) {
      throw new Error('update error id is empty');
    }
    try {
      return await this.walletRepository.save(walletDto);
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async remove(id: number): Promise<void> {
    await this.walletRepository.delete(id);
  }
}
