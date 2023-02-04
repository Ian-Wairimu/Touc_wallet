import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { CreateUserDto } from './dto/users.dto';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class UsersService {
  user: User;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // private readonly walletService: WalletService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    this.user = await this.userRepository.create(createUserDto);
    const errors = await validate(this.user);
    if (errors.length > 0) {
      throw new Error('failed while validating users..');
    } else {
      // this.user['wallets'] = [this.walletService.wallet];
      await this.userRepository.save(this.user);
      delete this.user.password;
    }
    return this.user;
  }
  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: {
        wallets: true,
      },
    });
  }
  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        userId: id,
      },
      relations: {
        wallets: true,
      },
    });
  }
}
